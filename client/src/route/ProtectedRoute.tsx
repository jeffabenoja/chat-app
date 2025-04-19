import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = () => {
  const { authUser, isLoading } = useAuth()

  if (isLoading) return null

  return authUser ? <Outlet /> : <Navigate to='/login' replace />
}

export default ProtectedRoute
