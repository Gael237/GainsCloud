const Plan = require('../models/Plan')
const Coach = require('../models/Coach')

// ─── CREAR PLAN ──────────────────────────────────────────
const createPlan = async (req, res) => {
  try {
    const { nombre, descripcion, precio, duracionMeses, diasPorSemana, caracteristicas } = req.body

    if (!nombre || !precio || !duracionMeses) {
      return res.status(400).json({ message: 'Nombre, precio y duración son obligatorios' })
    }

    const coach = await Coach.findOne({ user: req.user.id })
    if (!coach) {
      return res.status(404).json({ message: 'Coach no encontrado' })
    }

    const plan = await Plan.create({
      coach: coach._id,
      nombre,
      descripcion,
      precio,
      duracionMeses,
      diasPorSemana,
      caracteristicas,
    })

    res.status(201).json({ message: 'Plan creado exitosamente', plan })
  } catch (error) {
    console.error('Error en createPlan:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// ─── OBTENER MIS PLANES (coach) ──────────────────────────
const getMyPlans = async (req, res) => {
  try {
    const coach = await Coach.findOne({ user: req.user.id })
    if (!coach) {
      return res.status(404).json({ message: 'Coach no encontrado' })
    }

    const plans = await Plan.find({ coach: coach._id, activo: true })

    res.status(200).json(plans)
  } catch (error) {
    console.error('Error en getMyPlans:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// ─── OBTENER PLANES DE UN COACH (para clientes) ──────────
const getPlansByCoach = async (req, res) => {
  try {
    const plans = await Plan.find({ coach: req.params.coachId, activo: true })

    res.status(200).json(plans)
  } catch (error) {
    console.error('Error en getPlansByCoach:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// ─── ACTUALIZAR PLAN ─────────────────────────────────────
const updatePlan = async (req, res) => {
  try {
    const { nombre, descripcion, precio, duracionMeses, diasPorSemana, caracteristicas } = req.body

    const coach = await Coach.findOne({ user: req.user.id })
    if (!coach) {
      return res.status(404).json({ message: 'Coach no encontrado' })
    }

    const plan = await Plan.findOneAndUpdate(
      { _id: req.params.id, coach: coach._id },
      { nombre, descripcion, precio, duracionMeses, diasPorSemana, caracteristicas },
      { new: true, runValidators: true }
    )

    if (!plan) {
      return res.status(404).json({ message: 'Plan no encontrado o no tienes permiso' })
    }

    res.status(200).json({ message: 'Plan actualizado', plan })
  } catch (error) {
    console.error('Error en updatePlan:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// ─── ELIMINAR PLAN (desactivar) ──────────────────────────
const deletePlan = async (req, res) => {
  try {
    const coach = await Coach.findOne({ user: req.user.id })
    if (!coach) {
      return res.status(404).json({ message: 'Coach no encontrado' })
    }

    const plan = await Plan.findOneAndUpdate(
      { _id: req.params.id, coach: coach._id },
      { activo: false },
      { new: true }
    )

    if (!plan) {
      return res.status(404).json({ message: 'Plan no encontrado o no tienes permiso' })
    }

    res.status(200).json({ message: 'Plan eliminado correctamente' })
  } catch (error) {
    console.error('Error en deletePlan:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

module.exports = { createPlan, getMyPlans, getPlansByCoach, updatePlan, deletePlan }