const express = require('express')
const router = express.Router()
const {
    getAllCoaches,
    getCoachById,
    getMyCoachProfile,
    updateCoachProfile,
} = require('../controllers/coach.controller')
const { verifyToken } = require('../middleware/auth.middleware')
const { isCoach } = require('../middleware/role.middleware')

// GET /api/coach → todos los coaches (clientes los exploran)
router.get('/', verifyToken, getAllCoaches)

// GET /api/coach/me  → mi perfil coach
router.get('/me', verifyToken, isCoach, getMyCoachProfile)

// GET /api/coach/:id  → perfil de un coach específico
router.get('/:id', verifyToken, getCoachById)

// PUT /api/coach/me  → actualizar mi perfil
router.put('/me', verifyToken, isCoach, updateCoachProfile)

module.exports = router