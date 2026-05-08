const Routine = require('../models/Routine')
const Coach = require('../models/Coach')
const Client = require('../models/Client')
const Subscription = require('../models/Subscription')

// ─── ASIGNAR / CREAR RUTINA ──────────────────────────────
const createRoutine = async (req, res) => {
  try {
    const { clientId, subscriptionId, semana, dias } = req.body

    if (!clientId || !subscriptionId || !semana || !dias) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' })
    }

    const coach = await Coach.findOne({ user: req.user.id })
    if (!coach) {
      return res.status(404).json({ message: 'Coach no encontrado' })
    }

    // Verificar que la suscripción pertenece a este coach
    const subscription = await Subscription.findOne({
      _id: subscriptionId,
      coach: coach._id,
    })
    if (!subscription) {
      return res.status(403).json({ message: 'No tienes permiso sobre esta suscripción' })
    }

    // Si ya existe rutina para esa semana, actualizarla
    const existing = await Routine.findOne({
      client: clientId,
      subscription: subscriptionId,
      semana,
    })

    if (existing) {
      existing.dias = dias
      await existing.save()
      return res.status(200).json({ message: 'Rutina actualizada', routine: existing })
    }

    const routine = await Routine.create({
      client: clientId,
      coach: coach._id,
      subscription: subscriptionId,
      semana,
      dias,
    })

    res.status(201).json({ message: 'Rutina creada exitosamente', routine })
  } catch (error) {
    console.error('Error en createRoutine:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// ─── OBTENER RUTINAS DE UN CLIENTE (coach) ───────────────
const getClientRoutines = async (req, res) => {
  try {
    const routines = await Routine.find({
      client: req.params.clientId,
    }).sort({ semana: 1 })

    res.status(200).json(routines)
  } catch (error) {
    console.error('Error en getClientRoutines:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// ─── OBTENER MI RUTINA POR SEMANA (cliente) ──────────────
const getMyRoutine = async (req, res) => {
  try {
    const client = await Client.findOne({ user: req.user.id })
    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' })
    }

    const semana = req.query.semana || 1

    const routine = await Routine.findOne({
      client: client._id,
      semana: Number(semana),
    })

    if (!routine) {
      return res.status(404).json({ message: 'Rutina no encontrada para esta semana' })
    }

    res.status(200).json(routine)
  } catch (error) {
    console.error('Error en getMyRoutine:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// ─── ELIMINAR RUTINA ─────────────────────────────────────
const deleteRoutine = async (req, res) => {
  try {
    const coach = await Coach.findOne({ user: req.user.id })
    if (!coach) {
      return res.status(404).json({ message: 'Coach no encontrado' })
    }

    const routine = await Routine.findOneAndDelete({
      _id: req.params.id,
      coach: coach._id,
    })

    if (!routine) {
      return res.status(404).json({ message: 'Rutina no encontrada' })
    }

    res.status(200).json({ message: 'Rutina eliminada correctamente' })
  } catch (error) {
    console.error('Error en deleteRoutine:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

module.exports = { createRoutine, getClientRoutines, getMyRoutine, deleteRoutine }