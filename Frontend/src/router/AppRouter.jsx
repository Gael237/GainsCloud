import { BrowserRouter, Router, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import useAuth from "../hooks/useAuth";

// AUTH
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'

// Coach
import CoachDashboard from '../pages/coach/CoachDashboard'
import CoachClientes from '../pages/coach/CoachClientes'
import CoachClientePerfil from '../pages/coach/CoachClientePerfil'
import CoachRutinas from '../pages/coach/CoachRutinas'
import CoachPlanes from '../pages/coach/CoachPlanes'
import CoachPerfil from '../pages/coach/CoachPerfil'

// Client
import ClientDashboard from '../pages/client/ClientDashboard'
import ClientCoaches from '../pages/client/ClientCoaches'
import ClientCoachDetalle from '../pages/client/ClientCoachDetalle'
import ClientAgenda from '../pages/client/ClientAgenda'
import ClientEstadisticas from '../pages/client/ClientEstadisticas'
import ClientPerfil from '../pages/client/ClientPerfil'

const RootRedirect = () => {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  return <Navigate to={user.rol === 'coach' ? '/coach' : '/client'} replace />
}

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<RootRedirect />} />

        {/* Coach */}
        <Route path="/coach" element={<PrivateRoute role="coach"><CoachDashboard /></PrivateRoute>} />
        <Route path="/coach/clientes" element={<PrivateRoute role="coach"><CoachClientes /></PrivateRoute>} />
        <Route path="/coach/clientes/:id" element={<PrivateRoute role="coach"><CoachClientePerfil /></PrivateRoute>} />
        <Route path="/coach/rutinas" element={<PrivateRoute role="coach"><CoachRutinas /></PrivateRoute>} />
        <Route path="/coach/planes" element={<PrivateRoute role="coach"><CoachPlanes /></PrivateRoute>} />
        <Route path="/coach/perfil" element={<PrivateRoute role="coach"><CoachPerfil /></PrivateRoute>} />

        {/* Client */}
        <Route path="/client" element={<PrivateRoute role="client"><ClientDashboard /></PrivateRoute>} />
        <Route path="/client/coaches" element={<PrivateRoute role="client"><ClientCoaches /></PrivateRoute>} />
        <Route path="/client/coaches/:id" element={<PrivateRoute role="client"><ClientCoachDetalle /></PrivateRoute>} />
        <Route path="/client/agenda" element={<PrivateRoute role="client"><ClientAgenda /></PrivateRoute>} />
        <Route path="/client/estadisticas" element={<PrivateRoute role="client"><ClientEstadisticas /></PrivateRoute>} />
        <Route path="/client/perfil" element={<PrivateRoute role="client"><ClientPerfil /></PrivateRoute>} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter