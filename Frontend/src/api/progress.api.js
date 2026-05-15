import api from "./axios"

 export const createProgress = (data) => api.post('/progress', data)
 export const getMyProgress = () => api.get('/progress/me')
 export const getClientProgress = (clientId) => api.get(`/progress/client/${clientId}`)
 export const deleteProgress = (id) => api.delete(`/progress/${id}`
 )