import { Schema as _Schema, model } from 'mongoose'
const Schema = _Schema

const rifasParteSchema = new Schema(
  {
    rifaId: { type: Schema.Types.ObjectId, ref: 'Rifas' },
    parteIndex: Number,
    cotas: [String],
  },
  { collection: 'rifaspartes' },
)

const rifasParte = model('RifasParte', rifasParteSchema)

export default rifasParte
