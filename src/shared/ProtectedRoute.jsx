import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const ProtectRoute = ({ children }) => {
    const token = localStorage.getItem('joi_web_token')
    const user = localStorage.getItem('user')
    const navigate = useNavigate()
    const retrun_url = window.location.pathname;

    useEffect(() => {
        if (!token || !user) {
            navigate(`/auth/login?retrun_url=${retrun_url}`)
        }
    }, [token, user])

    return (
        <div className="w-full">
            {children}
        </div>
    )
}

export default ProtectRoute;