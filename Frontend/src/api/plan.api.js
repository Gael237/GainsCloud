import api from "./axios"

export const createPlan = (data) => api.post('/plans', data)
export const getMyPlans = () => api.get('/plans/me')
export const getPlansByCoach = (coachId) => api.get(`/plans/coach/${coachId}`)
export const updatePlan = (id, data) => api.put(`/plans/${id}`, data)
export const deletePlan = (id) => api.delete(`/plans/${id}`)