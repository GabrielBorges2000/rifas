import jwt from 'jsonwebtoken'

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded
  } catch (error) {
    return null
  }
}

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')

  if (!token) {
    return res.status(401).send('Token is missing')
  }

  const decodedToken = verifyToken(token)

  if (!decodedToken) {
    return res.status(401).send('Invalid or expired token')
  }

  req.user = decodedToken
  next()
}

export default authMiddleware
