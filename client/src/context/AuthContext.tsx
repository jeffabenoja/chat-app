import {
  createContext,
  ReactNode,
  SetStateAction,
  useEffect,
  Dispatch,
  useState,
  useContext,
} from "react"


const AuthContext = createContext<{
  authUser: AuthUserType | null
  setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>
  isLoading: boolean
}>({
  authUser: null,
  setAuthUser: () => {},
  isLoading: true,
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUserType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/auth/me`)

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error)
        }

        setAuthUser(data)
      } catch (error: any) {
        console.error("Something went wrong!", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
