import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast"

const useLogout = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuth()

  const logout = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error)
      }

      setAuthUser(null)
      toast.success(data.message, {
        style: {
          color: "#5cb85c",
        },
    })
    } catch (error: any) {
      toast.error(error.message, {
        style: {
          color: "#FF0000",
        },
    })
    } finally {
      setLoading(false)
    }
  }

  return { loading, logout }
}

export default useLogout
