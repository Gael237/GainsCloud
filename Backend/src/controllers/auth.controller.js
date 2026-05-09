const User = require('../models/User')
const Coach = require('../models/Coach')
const Client = require('../models/Client')
const { hashPassword, comparePassword } = require('../utils/hashPassword')
const generateToken = require('../utils/generateToken')

// ─── REGISTRO ───────────────────────────────────────────
const register = async (req, res) => {
  try {
    const { nombre, apellido, email, password, rol } = req.body

    // Validar campos obligatorios
    if (!nombre || !apellido || !email || !password || !rol) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' })
    }

    // Validar rol
    if (!['coach', 'client'].includes(rol)) {
      return res.status(400).json({ message: 'Rol inválido' })
    }

    // Verificar si el email ya existe
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado' })
    }

    // Hashear contraseña
    const hashedPassword = await hashPassword(password)

    // Crear usuario
    const user = await User.create({
      nombre,
      apellido,
      email,
      password: hashedPassword,
      rol,
    })

    // Crear perfil según rol
    if (rol === 'coach') {
      await Coach.create({ user: user._id })
    } else {
      await Client.create({ user: user._id })
    }

    // Generar token
    const token = generateToken({
      id: user._id,
      rol: user.rol,
    })

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        rol: user.rol,
      },
    })
  } catch (error) {
    console.error('Error en register:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// ─── LOGIN ───────────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validar campos
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son obligatorios' })
    }

    // Buscar usuario
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' })
    }

    // Verificar si está activo
    if (!user.activo) {
      return res.status(401).json({ message: 'Cuenta desactivada' })
    }

    // Comparar contraseña
    const isMatch = await comparePassword(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' })
    }

    // Buscar perfil según rol
    let perfil = null
    if (user.rol === 'coach') {
      perfil = await Coach.findOne({ user: user._id })
    } else {
      perfil = await Client.findOne({ user: user._id })
    }

    // Generar token
    const token = generateToken({
      id: user._id,
      rol: user.rol,
      perfilId: perfil?._id,
    })

    res.status(200).json({
      message: 'Login exitoso',
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        rol: user.rol,
        foto: user.foto,
        perfilId: perfil?._id,
      },
    })
  } catch (error) {
    console.error('Error en login:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// ─── GET PERFIL PROPIO ───────────────────────────────────
const getMe = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'No autorizado' })
    }

    const user = await User.findById(req.user.id).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    let perfil = null
    if (user.rol === 'coach') {
      perfil = await Coach.findOne({ user: user._id })
    } else {
      perfil = await Client.findOne({ user: user._id })
    }

    res.status(200).json({ user, perfil })
  } catch (error) {
    console.error('Error en getMe:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}
module.exports = { register, login, getMe }