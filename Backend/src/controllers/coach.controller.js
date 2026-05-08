const Coach = require('../models/Coach')
const User = require('../models/User')

// ─── OBTENER TODOS LOS COACHES (para clientes al explorar) ──
const getAllCoaches = async (req, res) => {
  try {
    const coaches = await Coach.find()
      .populate('user', 'nombre apellido email foto')

    res.status(200).json(coaches)
  } catch (error) {
    console.error('Error en getAllCoaches:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// ─── OBTENER PERFIL DE UN COACH ──────────────────────────
const getCoachById = async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id)
      .populate('user', 'nombre apellido email foto')

    if (!coach) {
      return res.status(404).json({ message: 'Coach no encontrado' })
    }

    res.status(200).json(coach)
  } catch (error) {
    console.error('Error en getCoachById:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// ─── OBTENER MI PERFIL COACH ─────────────────────────────
const getMyCoachProfile = async (req, res) => {
  try {
    const coach = await Coach.findOne({ user: req.user.id })
      .populate('user', 'nombre apellido email foto')

    if (!coach) {
      return res.status(404).json({ message: 'Perfil de coach no encontrado' })
    }

    res.status(200).json(coach)
  } catch (error) {
    console.error('Error en getMyCoachProfile:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// ─── ACTUALIZAR PERFIL COACH ─────────────────────────────
const updateCoachProfile = async (req, res) => {
  try {
    const {
      especialidad,
      bio,
      experiencia,
      certificaciones,
      instagram,
      whatsapp,
    } = req.body

    const coach = await Coach.findOneAndUpdate(
      { user: req.user.id },
      { especialidad, bio, experiencia, certificaciones, instagram, whatsapp },
      { new: true, runValidators: true }
    ).populate('user', 'nombre apellido email foto')

    if (!coach) {
      return res.status(404).json({ message: 'Coach no encontrado' })
    }

    // Actualizar nombre/apellido en User si vienen
    if (req.body.nombre || req.body.apellido || req.body.foto) {
      await User.findByIdAndUpdate(req.user.id, {
        ...(req.body.nombre && { nombre: req.body.nombre }),
        ...(req.body.apellido && { apellido: req.body.apellido }),
        ...(req.body.foto && { foto: req.body.foto }),
      })
    }

    res.status(200).json({ message: 'Perfil actualizado', coach })
  } catch (error) {
    console.error('Error en updateCoachProfile:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

module.exports = {
  getAllCoaches,
  getCoachById,
  getMyCoachProfile,
  updateCoachProfile,
}