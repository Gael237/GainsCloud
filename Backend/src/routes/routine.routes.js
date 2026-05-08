const express = require('express')
const router = express.Router()
const {
  createRoutine,
  getClientRoutines,
  getMyRoutine,
  deleteRoutine,
} = require('../controllers/routine.controller')
const { verifyToken } = require('../middleware/auth.middleware')
const { isCoach, isClient } = require('../middleware/role.middleware')

// POST /api/routines  → coach crea/asigna rutina
router.post('/', verifyToken, isCoach, createRoutine)

// GET /api/routines/me  → cliente ve su rutina (?semana=1)
router.get('/me', verifyToken, isClient, getMyRoutine)

// GET /api/routines/client/:clientId  → coach ve rutinas de un cliente
router.get('/client/:clientId', verifyToken, isCoach, getClientRoutines)

// DELETE /api/routines/:id  → coach elimina rutina
router.delete('/:id', verifyToken, isCoach, deleteRoutine)

module.exports = router