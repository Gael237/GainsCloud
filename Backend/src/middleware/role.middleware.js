const isCoach = (req, res, next) => {
    if (req.user?.rol !== 'coach') {
        return res.status(403).json({ message: 'Acceso solo para coaches' })
    }
    next()
}

const isClient = (req, res, next) => {
    if (req.user?.rol !== 'client') {
        return res.status(403).json({ message: 'Acceso solo para clientes' })
    }
    next()
}

module.exports = { isClient, isCoach }