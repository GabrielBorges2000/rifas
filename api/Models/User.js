import { Schema, model } from 'mongoose'
import { hash } from 'bcryptjs'

const userSchema = new Schema({
  cpf: { type: String, sparse: true, unique: true },
  email: { type: String, sparse: true, unique: true },
  password: { type: String, sparse: true },
})

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = hash(this.password, 10)
  }
  next()
})

const User = model('users', userSchema)

export default User
