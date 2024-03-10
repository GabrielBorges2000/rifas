import { Schema, model } from 'mongoose'

const rifasSchema = new Schema(
  {
    titulo: String,
    imagem: String,
    descricao: String,
    slug: String,
    numerodeCotas: {
      type: Number,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} não é um número inteiro.',
      },
    },
    preco: Number,
    status: {
      type: String,
      enum: ['disponivel', 'encerrado'],
      default: 'disponivel',
    },
    dataCriacao: {
      type: Date,
    },
  },
  { collection: 'Rifas' },
)

export default model('Rifas', rifasSchema)
