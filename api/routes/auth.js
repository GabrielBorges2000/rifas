import { Router } from 'express'
import { sign } from 'jsonwebtoken'
import { compare, hash } from 'bcryptjs'
import User from '../Models/User.js'

const router = Router()

router.post('/register', async (req, res) => {
  try {
    const { cpf, email, password } = req.body
    const userExists = await User.findOne({ email })

    if (userExists) return res.status(400).send('Email already exists')

    const hashedPassword = await hash(password, 10)

    const user = new User({ cpf, email, password: hashedPassword })

    await user.save()

    res.status(201).send('User registered successfully')
  } catch (error) {
    console.log(error)
    res.status(500).send('Error registering user')
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) return res.status(400).send('Invalid credentials')

    if (password.length <= 0) return res.status(401).json('Password is empty')

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) return res.status(400).send('Invalid credentials')

    if (isPasswordValid) {
      const token = sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
      )

      res.status(200).send({ token })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send('Error logging in')
  }
})

export default router
