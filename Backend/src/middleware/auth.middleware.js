const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']

    if (!authHeader) {
      return res.status(401).json({ message: 'No autorizado - Token no proporcionado' })
    }

    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : authHeader

    if (!token) {
      return res.status(401).json({ message: 'No autorizado - Token vacío' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    console.error('Error en verifyToken:', error.message)
    return res.status(401).json({ message: 'Token inválido o expirado' })
  }
}

module.exports = { verifyToken }