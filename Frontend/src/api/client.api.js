import api from "./axios"

export const getMyClientProfile = () => api.get('/client/me')
export const updateClientProfile = (data) => api.put(`/client/me`)
export const getClientById = (id) => api.get(`/client/${id}`)
export const updateClientNotes = (id, data) => api.put(`/client/${id}/notes`, data)