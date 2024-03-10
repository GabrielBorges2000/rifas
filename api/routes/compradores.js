import { Router } from 'express'
import Compradores from '../Models/compradores.js'
import rifasParte from '../Models/rifasParte.js'
import { Payment, MercadoPagoConfig } from 'mercadopago'
const router = Router()

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN_MERCADOPAGO,
})

router.post('/prepix', async (req, res) => {
  try {
    const {
      nome,
      sorteio,
      sorteioId,
      imagem,
      telefone,
      email,
      cpf,
      quantidadesBilhetes,
      valorPago,
    } = req.body

    if (
      !nome ||
      !sorteio ||
      !sorteioId ||
      !imagem ||
      !telefone ||
      !email ||
      !cpf ||
      !quantidadesBilhetes ||
      !valorPago
    ) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
    }

    const novoComprador = new Compradores({
      nome,
      sorteioId,
      sorteio,
      imagem,
      telefone,
      email,
      cpf,
      quantidadesBilhetes,
      valorPago,
    })

    await novoComprador.save()

    res.status(201).json({ id: novoComprador._id })
  } catch (err) {
    console.error('Erro ao criar um novo comprador:', err)
    res.status(500).json({ error: 'Erro ao criar um novo comprador' })
  }
})

router.get('/get/:campo/:valor', async (req, res) => {
  try {
    const { campo, valor } = req.params

    if (!['id', 'email', 'telefone'].includes(campo)) {
      return res
        .status(400)
        .json({ error: 'Campo inválido. Use "id", "email" ou "telefone".' })
    }

    const query = campo === 'id' ? { _id: valor } : { [campo]: valor }
    const resposta = await Compradores.findOne(query)

    res.send(resposta)
  } catch (error) {
    console.error('Erro na consulta:', error)
    res.status(500).send('Erro na consulta')
  }
})

router.post('/pix/:id', async (req, res) => {
  try {
    const { id } = req.params
    const comprador = await Compradores.findById(id)

    if (!comprador) {
      return res.status(404).send('Comprador não encontrado.')
    }

    // Restante do código de processamento de pagamento PIX...
  } catch (err) {
    console.error('Erro:', err)
    res.status(500).send('Erro ao processar a requisição.')
  }
})

router.get('/pegando/:id', async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ error: 'ID do pagamento não fornecido.' })
    }

    const payment = new Payment(client)
    const paymentInfo = await payment.get({ id })

    return res.json({
      status: paymentInfo.status,
      qr_code: {
        qr_code_link: paymentInfo.point_of_interaction.transaction_data.qr_code,
        qr_code_img:
          paymentInfo.point_of_interaction.transaction_data.qr_code_base64,
      },
      Id_Transaction: paymentInfo.id,
    })
  } catch (error) {
    console.error('Erro ao obter status do pagamento:', error)
    return res.status(500).json({ error: 'Erro ao processar a requisição.' })
  }
})

router.get('/status/:id', async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ error: 'ID do pagamento não fornecido.' })
    }

    const payment = new Payment(client)
    const paymentInfo = await payment.get({ id })

    return res.json({
      status: paymentInfo.status,
    })
  } catch (error) {
    console.error('Erro ao obter status do pagamento:', error)
    return res.status(500).json({ error: 'Erro ao processar a requisição.' })
  }
})

router.get('/cancel/:id/:idComprador', async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ error: 'ID do pagamento não fornecido.' })
    }

    const payment = new Payment(client)
    const paymentInfo = await payment.cancel({ id })

    return res.json({
      status: paymentInfo.status,
    })
  } catch (error) {
    console.error('Erro ao cancelar pagamento:', error)
    return res.status(500).json({ error: 'Erro ao processar a requisição.' })
  }
})

router.post('/pix/:id/:status', async (req, res) => {
  const compradorID = req.params.id
  const status = req.params.status
  let numerosSelecionados = []
  let compradorExistente

  try {
    const comprador = await Compradores.findById(compradorID)

    if (!comprador) {
      console.error('Comprador não encontrado.')
      return res.status(404).send('Comprador não encontrado.')
    }

    if (status === 'approved') {
      const numeroAleatorio = Math.floor(Math.random() * 80)

      const result = await rifasParte
        .findOne({ rifaId: comprador.sorteioId, parteIndex: numeroAleatorio })
        .select('cotas')
        .exec()

      if (result) {
        const cotas = result.cotas
        const totalCotas = cotas.length

        if (comprador.quantidadesBilhetes <= totalCotas) {
          const cotasEmbaralhadas = cotas.sort(() => Math.random() - 0.5)

          numerosSelecionados = cotasEmbaralhadas.slice(
            0,
            comprador.quantidadesBilhetes,
          )
        }

        compradorExistente = await Compradores.findOne({
          sorteioId: comprador.sorteioId,
          _id: { $ne: compradorID },
          numerosComprados: { $in: numerosSelecionados },
        }).exec()
      } else {
        console.log('Nenhum documento encontrado com os critérios fornecidos.')
      }

      if (compradorExistente) {
        // Se já existir um comprador com esses números, gera novos números
        return res.status(409).json({
          error: 'Números de bilhete já escolhidos por outro comprador.',
        })
      }

      comprador.numerosComprados = numerosSelecionados
      comprador.pedidoStatus = 'aprovado'

      // Salvando as mudanças no comprador
      const compradorAtualizado = await comprador.save()

      // Retornando uma resposta de sucesso
      return res.status(200).json({
        message: 'Comprador atualizado com sucesso.',
        comprador: compradorAtualizado,
        rifaId: comprador.sorteioId,
      })
    }
  } catch (err) {
    console.error('Erro:', err)
    return res.status(500).send('Erro ao processar a requisição.')
  }
})

router.post('/pix', async (req, res) => {
  try {
    const {
      nome,
      sorteio,
      sorteioId,
      url,
      telefone,
      email,
      cpf,
      quantidadesBilhetes,
      valorPago,
    } = req.body

    if (
      !nome ||
      !sorteio ||
      !sorteioId ||
      !url ||
      !telefone ||
      !email ||
      !cpf ||
      !quantidadesBilhetes ||
      !valorPago
    ) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
    }

    const novoComprador = new Compradores({
      nome,
      sorteioId,
      sorteio,
      imagem: url,
      telefone,
      email,
      cpf,
      quantidadesBilhetes,
      valorPago,
    })

    await novoComprador.save()

    return res.status(201).json({ pix: true })
  } catch (err) {
    console.error('Erro:', err)
    return res.status(500).send('Erro ao processar a requisição.')
  }
})

export default router
