import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div className='lg:p-4 h-screen flex items-center justify-center bg-gray-400'>
      <Outlet />
    </div>
  )
}

export default MainLayout
