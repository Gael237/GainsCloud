const Subscription = require('../models/Subscription')
const Client = require('../models/Client')
const Coach = require('../models/Coach')
const Plan = require('../models/Plan')

// ─── SUSCRIBIRSE A UN PLAN ───────────────────────────────
const createSubscription = async (req, res) => {
  try {
    const { planId } = req.body

    if (!planId) {
      return res.status(400).json({ message: 'El plan es obligatorio' })
    }

    const client = await Client.findOne({ user: req.user.id })
    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' })
    }

    // Verificar que el plan existe
    const plan = await Plan.findById(planId)
    if (!plan || !plan.activo) {
      return res.status(404).json({ message: 'Plan no encontrado' })
    }

    // Verificar que no tenga suscripción activa
    const existing = await Subscription.findOne({
      client: client._id,
      estado: 'active',
    })
    if (existing) {
      return res.status(400).json({ message: 'Ya tienes una suscripción activa' })
    }

    const subscription = await Subscription.create({
      client: client._id,
      coach: plan.coach,
      plan: plan._id,
    })

    // Incrementar totalClientes del coach
    await Coach.findByIdAndUpdate(plan.coach, { $inc: { totalClientes: 1 } })

    // Incrementar totalInscritos del plan
    await Plan.findByIdAndUpdate(plan._id, { $inc: { totalInscritos: 1 } })

    const populated = await Subscription.findById(subscription._id)
      .populate('plan', 'nombre precio duracionMeses')
      .populate({ path: 'coach', populate: { path: 'user', select: 'nombre apellido foto' } })

    res.status(201).json({ message: 'Suscripción creada exitosamente', subscription: populated })
  } catch (error) {
    console.error('Error en createSubscription:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// ─── MI SUSCRIPCIÓN ACTIVA (cliente) ────────────────────
const getMySubscription = async (req, res) => {
  try {
    const client = await Client.findOne({ user: req.user.id })
    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' })
    }

    const subscription = await Subscription.findOne({
      client: client._id,
      estado: 'active',
    })
      .populate('plan', 'nombre precio duracionMeses diasPorSemana')
      .populate({ path: 'coach', populate: { path: 'user', select: 'nombre apellido foto' } })

    if (!subscription) {
      return res.status(404).json({ message: 'No tienes suscripción activa' })
    }

    res.status(200).json(subscription)
  } catch (error) {
    console.error('Error en getMySubscription:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// ─── MIS CLIENTES SUSCRITOS (coach) ─────────────────────
const getMyClients = async (req, res) => {
  try {
    const coach = await Coach.findOne({ user: req.user.id })
    if (!coach) {
      return res.status(404).json({ message: 'Coach no encontrado' })
    }

    const subscriptions = await Subscription.find({ coach: coach._id })
      .populate('plan', 'nombre precio')
      .populate({
        path: 'client',
        populate: { path: 'user', select: 'nombre apellido email foto' },
      })

    res.status(200).json(subscriptions)
  } catch (error) {
    console.error('Error en getMyClients:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// ─── CAMBIAR ESTADO SUSCRIPCIÓN (coach) ─────────────────
const updateSubscriptionStatus = async (req, res) => {
  try {
    const { estado } = req.body

    if (!['active', 'paused', 'cancelled'].includes(estado)) {
      return res.status(400).json({ message: 'Estado inválido' })
    }

    const coach = await Coach.findOne({ user: req.user.id })
    if (!coach) {
      return res.status(404).json({ message: 'Coach no encontrado' })
    }

    const subscription = await Subscription.findOneAndUpdate(
      { _id: req.params.id, coach: coach._id },
      { estado, ...(estado === 'cancelled' && { fechaFin: new Date() }) },
      { new: true }
    )

    if (!subscription) {
      return res.status(404).json({ message: 'Suscripción no encontrada' })
    }

    res.status(200).json({ message: 'Estado actualizado', subscription })
  } catch (error) {
    console.error('Error en updateSubscriptionStatus:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// ─── CANCELAR MI SUSCRIPCIÓN (cliente) ──────────────────
const cancelMySubscription = async (req, res) => {
  try {
    const client = await Client.findOne({ user: req.user.id })
    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' })
    }

    const subscription = await Subscription.findOneAndUpdate(
      { _id: req.params.id, client: client._id },
      { estado: 'cancelled', fechaFin: new Date() },
      { new: true }
    )

    if (!subscription) {
      return res.status(404).json({ message: 'Suscripción no encontrada' })
    }

    res.status(200).json({ message: 'Suscripción cancelada', subscription })
  } catch (error) {
    console.error('Error en cancelMySubscription:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

module.exports = {
  createSubscription,
  getMySubscription,
  getMyClients,
  updateSubscriptionStatus,
  cancelMySubscription,
}