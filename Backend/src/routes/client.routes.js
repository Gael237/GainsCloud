const express = require('express')
const router = express.Router()
const {
    getMyClientProfile,
    getClientById,
    updateClientProfile,
    updateClientNotes,
} = require('../controllers/client.controller')
const { verifyToken } = require('../middleware/auth.middleware')
const { isCoach, isClient } = require('../middleware/role.middleware')

// GET /api/client/me -> mi perfil
router.get('/me', verifyToken, isClient, getMyClientProfile)

//GET /api/client/ :id -> perfil de cliente ( vista del coach)
router.get('/:id', verifyToken, isCoach, getMyClientProfile)

// PUT /api/client/me -> actualizar mi perfil
router.put('/me', verifyToken, isClient, updateClientProfile)

// PUT /api/client/:id/notes -> coach actualiza notas del cliente
router.put('/:id/notes', verifyToken, isCoach, updateClientNotes)

module.exports = router