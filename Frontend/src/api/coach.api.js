import api from './axios'

export const getAllCoaches = () => api.get('/coach')
export const getCoachById = (id) => api.get(`/coach/${id}`)
export const getMyCoachProfile = () => api.get('/coach/me')
export const updateCoachProfile = (data) => api.put('/coach/me', data)