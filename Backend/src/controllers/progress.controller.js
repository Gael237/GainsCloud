const Progress = require('../models/Progress')
const Client = require('../models/Client')

// ─── REGISTRAR PROGRESO (cliente) ───────────────────────
const createProgress = async (req, res) => {
  try {
    const { peso, notas, foto, semana } = req.body

    const client = await Client.findOne({ user: req.user.id })
    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' })
    }

    if (!req.body.subscriptionId) {
      return res.status(400).json({ message: 'La suscripción es obligatoria' })
    }

    const progress = await Progress.create({
      client: client._id,
      subscription: req.body.subscriptionId,
      peso,
      notas,
      foto,
      semana,
    })

    // Actualizar peso actual en perfil del cliente
    if (peso) {
      await Client.findByIdAndUpdate(client._id, { peso })
    }

    res.status(201).json({ message: 'Progreso registrado', progress })
  } catch (error) {
    console.error('Error en createProgress:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// ─── OBTENER MI HISTORIAL DE PROGRESO (cliente) ──────────
const getMyProgress = async (req, res) => {
  try {
    const client = await Client.findOne({ user: req.user.id })
    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' })
    }

    const progress = await Progress.find({ client: client._id })
      .sort({ fecha: 1 })

    res.status(200).json(progress)
  } catch (error) {
    console.error('Error en getMyProgress:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// ─── OBTENER PROGRESO DE UN CLIENTE (coach) ──────────────
const getClientProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ client: req.params.clientId })
      .sort({ fecha: 1 })

    res.status(200).json(progress)
  } catch (error) {
    console.error('Error en getClientProgress:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// ─── ELIMINAR REGISTRO DE PROGRESO ──────────────────────
const deleteProgress = async (req, res) => {
  try {
    const client = await Client.findOne({ user: req.user.id })
    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' })
    }

    const progress = await Progress.findOneAndDelete({
      _id: req.params.id,
      client: client._id,
    })

    if (!progress) {
      return res.status(404).json({ message: 'Registro no encontrado' })
    }

    res.status(200).json({ message: 'Registro eliminado' })
  } catch (error) {
    console.error('Error en deleteProgress:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

module.exports = { createProgress, getMyProgress, getClientProgress, deleteProgress }