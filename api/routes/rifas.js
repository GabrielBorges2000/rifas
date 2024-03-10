import { Router } from 'express'
import Rifas from '../Models/rifas.js'

const router = Router()

// pegar todas as rifas
router.get('/', async (req, res) => {
  try {
    const rifasData = await Rifas.find({}).sort({ _id: -1 }).exec()

    const modifiedRifas = rifasData.map((val) => {
      return val
    })

    res.send(modifiedRifas)
  } catch (err) {
    console.error('Erro ao buscar Rifas:', err)
    res.status(500).json({ error: 'Erro ao buscar Rifas' })
  }
})

// pega a rifa pelo slug
router.get('/:slug', async (req, res) => {
  try {
    // Procurar um arquivo específico pelo slug e incrementar as visualizações
    const resposta = await Rifas.findOneAndUpdate(
      { slug: req.params.slug },
      { new: true },
    )

    if (resposta) {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
      }

      const dataCriacao = new Date(resposta.dataCriacao)
      const dataFormatada = dataCriacao.toLocaleDateString('pt-BR', options)

      const dataEncerramento = new Date(resposta.dataEncerramento)
      const dataFormatadaEncerramento = dataEncerramento.toLocaleDateString(
        'pt-BR',
        options,
      )

      res.send({
        Rifas: resposta,
        dataCriacao: dataFormatada,
        dataEncerramento: dataFormatadaEncerramento,
      })
    } else {
      res.redirect('/')
    }
  } catch (error) {
    console.error('Erro na consulta:', error)
    res.status(500).send('Erro na consulta')
  }
})

// criar uma nova rifa
router.post('/create', async (req, res) => {
  try {
    const novaRifa = req.body

    const rifa = await Rifas.create(novaRifa)

    return res.status(201).json(rifa)
  } catch (error) {
    console.error('Erro ao criar uma nova Rifa', error)
    res.status(500).json({ error: 'Erro ao criar uma nova Rifa' })
  }
})

// deletar uma rifa
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    // Utilize o método findByIdAndDelete para encontrar e excluir a rifa pelo ID
    const rifa = await Rifas.findByIdAndDelete(id)

    if (!rifa) {
      return res.status(404).json({ error: 'Rifa não encontrada' })
    }

    return res.status(200).json({ message: 'Rifa excluída com sucesso' })
  } catch (error) {
    console.error('Erro ao excluir a rifa:', error)
    res.status(500).json({ error: 'Erro ao excluir a rifa' })
  }
})

// atualizar uma rifa existente
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body // Assume-se que os dados a serem atualizados estão no corpo da solicitação

    // Utilize o método findByIdAndUpdate para encontrar e atualizar a rifa pelo ID
    const rifa = await Rifas.findByIdAndUpdate(id, updateData, { new: true })

    if (!rifa) {
      return res.status(404).json({ error: 'Rifa não encontrada' })
    }

    return res.status(200).json(rifa)
  } catch (error) {
    console.error('Erro ao atualizar a rifa:', error)
    res.status(500).json({ error: 'Erro ao atualizar a rifa' })
  }
})

export default router
