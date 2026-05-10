import api from "./axios"

export const createRutine = (data) => api.post('/routines', data)
export const getMyRoutine = (semana) => api.get(`/routines/me?semana=${semana}`)
export const getClientRoutines = (clientId) = api.get(`/routines/client/${clientId}`)
export const deleteRoutine = (id) => api.delete(`/routines/${id}`)