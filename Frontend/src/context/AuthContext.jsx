import { createContext, useState, useEffect, Children } from "react"
import { getMe } from '../api/auth.api'

export const AuthContext = createContext()

export const AuthProvider = ({ Children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token') || null )
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const initAuth = async () => {
            if (token) {
                try {
                    const res = await getMe()
                    setUser(res.data.user)
                } catch {
                    logout()
                }
            }
            setLoading(false)
        }
        initAuth()
    }, [token])

    
}