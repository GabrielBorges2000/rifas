import { Router } from 'express'
import Ganhadores from '../Models/ganhadores.js'
const router = Router()

// pegando todos ganhadores de todos os sorteios
router.get('/', async (req, res) => {
  try {
    const ganhadores = await Ganhadores.find({})
    res.status(200).json(ganhadores)
  } catch (err) {
    console.error('Erro ao buscar ganhadores:', err)
    res.status(500).json({ error: 'Erro ao buscar os ganhadores' })
  }
})

// POST: Adicionar um novo ganhador
router.post('/', async (req, res) => {
  try {
    const novoGanhador = new Ganhadores(req.body)
    const ganhadorSalvo = await novoGanhador.save()
    res.status(201).json(ganhadorSalvo)
  } catch (err) {
    console.error('Erro ao criar um novo ganhador:', err)
    res.status(500).json({ error: 'Erro ao criar um novo ganhador' })
  }
})

// PUT: Atualizar um ganhador existente
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body
    const ganhadorAtualizado = await Ganhadores.findByIdAndUpdate(
      id,
      updateData,
      { new: true },
    )
    if (!ganhadorAtualizado) {
      return res.status(404).json({ error: 'Ganhador não encontrado' })
    }
    res.status(200).json(ganhadorAtualizado)
  } catch (err) {
    console.error('Erro ao atualizar o ganhador:', err)
    res.status(500).json({ error: 'Erro ao atualizar o ganhador' })
  }
})

// DELETE: Excluir um ganhador existente
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const ganhadorExcluido = await Ganhadores.findByIdAndDelete(id)
    if (!ganhadorExcluido) {
      return res.status(404).json({ error: 'Ganhador não encontrado' })
    }
    res.status(200).json({ message: 'Ganhador excluído com sucesso' })
  } catch (err) {
    console.error('Erro ao excluir o ganhador:', err)
    res.status(500).json({ error: 'Erro ao excluir o ganhador' })
  }
})

export default router
