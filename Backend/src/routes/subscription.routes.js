const express = require('express')
const router = express.Router()
const {
  createSubscription,
  getMySubscription,
  getMyClients,
  updateSubscriptionStatus,
  cancelMySubscription,
} = require('../controllers/subscription.controller')
const { verifyToken } = require('../middleware/auth.middleware')
const { isCoach, isClient } = require('../middleware/role.middleware')

// POST /api/subscriptions  → cliente se suscribe
router.post('/', verifyToken, isClient, createSubscription)

// GET /api/subscriptions/me  → mi suscripción activa (cliente)
router.get('/me', verifyToken, isClient, getMySubscription)

// GET /api/subscriptions/clients  → mis clientes (coach)
router.get('/clients', verifyToken, isCoach, getMyClients)

// PUT /api/subscriptions/:id/status  → coach cambia estado
router.put('/:id/status', verifyToken, isCoach, updateSubscriptionStatus)

// PUT /api/subscriptions/:id/cancel  → cliente cancela
router.put('/:id/cancel', verifyToken, isClient, cancelMySubscription)

module.exports = router