import api from "./axios"

export const createSubscription = (data) => api.post('/subscription', data)
export const getMySubscription = () => api.get('/subscription/me')
export const getMyClients = () => api.get('/subscription/clients')
export const updateSubscriptionStatus = (id, data) => api.put(`/subscriptions/${id}/status`, data)
export const cancelMySubscription = (id) => api.put(`/subscription/${id}/cancel`)