import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const PrivateRoute = ({ children, role}) => {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100hv',
                background: '#0d0d0d',
                color: '#e8ff00',
                fontFamily: 'monospace',
                fontSize: '18px',
            }}>
                💪 Cargando...
            </div>
        )
    }

    if (!user) return <Navigate to="/login" replace />

    if (role && user.rol !== role) {
        return <Navigate to={user.rol === 'coach' ? '/coach' : '/client'} replace />
    }

    return children
}

export default PrivateRoute