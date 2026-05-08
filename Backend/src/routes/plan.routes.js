const express = require('express')
const router = express.Router()
const {
    createPlan,
    getMyPlans,
    getPlansByCoach,
    updatePlan,
    deletePlan,
} = require('../controllers/plan.controller')
const { verifyToken } = require('../middleware/auth.middleware')
const { isCoach } = require('../middleware/role.middleware')

//POST /api/plans -> crea el plan
router.post('/', verifyToken, isCoach, createPlan)

// GET /api/plans/me -> mis planes como el coach
router.get('/me', verifyToken, isCoach, getMyPlans)

// GET /api/plans/coach/:coachId -> planes de un coach (vista cliente)
router.get('/coach/:coachId', verifyToken, getPlansByCoach)

// PUT /api/plans/:id -> actualizar plan
router.put('/:id', verifyToken, isCoach, updatePlan)

// DELETE /api/plans/:id -> desactivar plan
router.delete('/:id', verifyToken, isCoach, deletePlan)

module.exports = router