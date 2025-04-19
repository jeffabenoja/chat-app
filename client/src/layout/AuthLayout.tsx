import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div className='p-4 h-screen flex items-center justify-center bg-gray-400'>
      <Outlet />
    </div>
  )
}

export default AuthLayout
