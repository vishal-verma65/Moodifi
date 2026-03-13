import {login, register, getMe, logout} from "../services/auth.api"
import { useContext, useEffect } from "react"
import { AuthContext } from "../Auth.context"

export const useAuth =()=>{
    const context = useContext(AuthContext)

    const {user, setUser, loading, setLoading} = context

    const handleRegister = async({username, email, password})=>{
        setLoading(true)

        const data = await register({username, email, password})
        setUser(data.user)

        setLoading(false)
    }

    const handleLogin = async({username, email, password})=>{
        setLoading(true)

        const data = await login({username, email, password})
        setUser(data.user)

        setLoading(false)
    }

    const handleGetMe = async()=>{
        setLoading(true)
        try {
            const data = await getMe()
            setUser(data.user)
        } 
        catch(err) {
            setUser(null) // not logged in
        } 
        finally {
            setLoading(false) // ← always stop loading
        }
    }

    const handleLogout = async()=>{
        setLoading(true)

        await logout()
        setUser(null)

        setLoading(false)
    }

    useEffect(()=>{
        handleGetMe()
    }, [])

    return ({
        user, 
        loading, 
        handleRegister, 
        handleLogin, 
        handleGetMe, 
        handleLogout
    })
}