require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./src/config/db')

// Rutas
const authRoutes = require('./src/routes/auth.routes')
const coachRoutes = require('./src/routes/coach.routes')
const clientRoutes = require('./src/routes/client.routes')
const planRoutes = require('./src/routes/plan.routes')
const susbcriptionRoutes = require('./src/routes/subscription.routes')
const routinesRoutes = require('./src/routes/routine.routes')
const progresRoutes = require('./src/routes/progress.routes')

const app = express()

// Middlewares globales
app.use(cors())
app.use(express.json())

// Conectar DB
connectDB()

// Rutas API
app.use('/api/auth', authRoutes)
app.use('/api/coach', coachRoutes)
app.use('/api/client', clientRoutes)
app.use('/api/plans', planRoutes)
app.use('/api/subscriptions', susbcriptionRoutes)
app.use('/api/routines', routinesRoutes)
app.use('/api/progress', progresRoutes)

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'CloudGains API corriendo '})
})

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})