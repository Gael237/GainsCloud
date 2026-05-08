const Client = require('../models/Client')
const User = require('../models/User')

// ─── OBTENER MI PERFIL CLIENT ────────────────────────────
const getMyClientProfile = async (req, res) => {
  try {
    const client = await Client.findOne({ user: req.user.id })
      .populate('user', 'nombre apellido email foto')

    if (!client) {
      return res.status(404).json({ message: 'Perfil de cliente no encontrado' })
    }

    res.status(200).json(client)
  } catch (error) {
    console.error('Error en getMyClientProfile:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// ─── OBTENER CLIENTE POR ID (para el coach) ──────────────
const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id)
      .populate('user', 'nombre apellido email foto')

    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' })
    }

    res.status(200).json(client)
  } catch (error) {
    console.error('Error en getClientById:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// ─── ACTUALIZAR PERFIL CLIENT ────────────────────────────
const updateClientProfile = async (req, res) => {
  try {
    const { edad, sexo, peso, altura, objetivo } = req.body

    const client = await Client.findOneAndUpdate(
      { user: req.user.id },
      { edad, sexo, peso, altura, objetivo },
      { new: true, runValidators: true }
    ).populate('user', 'nombre apellido email foto')

    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' })
    }

    // Actualizar nombre/apellido/foto en User si vienen
    if (req.body.nombre || req.body.apellido || req.body.foto) {
      await User.findByIdAndUpdate(req.user.id, {
        ...(req.body.nombre && { nombre: req.body.nombre }),
        ...(req.body.apellido && { apellido: req.body.apellido }),
        ...(req.body.foto && { foto: req.body.foto }),
      })
    }

    res.status(200).json({ message: 'Perfil actualizado', client })
  } catch (error) {
    console.error('Error en updateClientProfile:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// ─── ACTUALIZAR NOTAS DEL COACH SOBRE EL CLIENTE ────────
const updateClientNotes = async (req, res) => {
  try {
    const { puntosAMejorar, notasCoach } = req.body

    const client = await Client.findByIdAndUpdate(
      req.params.id,
      { puntosAMejorar, notasCoach },
      { new: true }
    )

    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' })
    }

    res.status(200).json({ message: 'Notas actualizadas', client })
  } catch (error) {
    console.error('Error en updateClientNotes:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

module.exports = {
  getMyClientProfile,
  getClientById,
  updateClientProfile,
  updateClientNotes,
}