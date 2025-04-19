import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast"


const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuth()

  const login = async (loginInputs: LoginInputsType): Promise<boolean> => {
    try {
      setLoading(true)
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInputs),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error)
      }

      setAuthUser(data)
      toast.success(data.message, {
        style: {
          color: "#5cb85c",
        },
      })
      return true
    } catch (error: any) {
      toast.error(error.message, {
        style: {
          color: "#FF0000",
        },
      })
      return false
    } finally {
      setLoading(false)
    }
  }
  return {
    loading,
    login,
  }
}

export default useLogin
