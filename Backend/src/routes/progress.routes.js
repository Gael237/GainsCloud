const express = require('express')
const router = express.Router()
const {
  createProgress,
  getMyProgress,
  getClientProgress,
  deleteProgress,
} = require('../controllers/progress.controller')
const { verifyToken } = require('../middleware/auth.middleware')
const { isCoach, isClient } = require('../middleware/role.middleware')

// POST /api/progress  → cliente registra progreso
router.post('/', verifyToken, isClient, createProgress)

// GET /api/progress/me  → cliente ve su historial
router.get('/me', verifyToken, isClient, getMyProgress)

// GET /api/progress/client/:clientId  → coach ve progreso de cliente
router.get('/client/:clientId', verifyToken, isCoach, getClientProgress)

// DELETE /api/progress/:id  → cliente elimina registro
router.delete('/:id', verifyToken, isClient, deleteProgress)

module.exports = router