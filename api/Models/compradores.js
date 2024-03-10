import { ObjectId } from 'mongodb'
import { Schema as _Schema, model } from 'mongoose'
const Schema = _Schema
// pegando table especifica
const compradoresSchema = new Schema(
  {
    nome: String,
    sorteioId: ObjectId,
    sorteio: String,
    imagem: String,
    telefone: String,
    email: String,
    cpf: String,
    slug: String,
    pedidoStatus: {
      type: String,
      enum: ['aprovado', 'cancelado', 'pendente'],
      default: 'pendente',
    },

    numerosComprados: [Number],
    quantidadesBilhetes: Number,
    valorPago: Number,
    dataComprada: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'Compradores' },
)

const Compradores = model('Compradores', compradoresSchema)

export default Compradores
