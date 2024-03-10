import { Schema as _Schema, model } from 'mongoose'
const Schema = _Schema
// pegando table especifica
const ganhadoresSchema = new Schema(
  {
    nome: String,
    sorteio: String,
    imagem: String,
    telefone: String,
    email: String,
    numerosSorteados: [Number],
  },
  { collection: 'Ganhadores' },
)

const Ganhadores = model('Ganhadores', ganhadoresSchema)

export default Ganhadores
