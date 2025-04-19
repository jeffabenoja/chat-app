import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import AuthLayout from "./layout/AuthLayout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { Toaster } from "react-hot-toast"
import ProtectedRoute from "./route/ProtectedRoute"

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path='/' element={<Home />} />
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>
      </>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App
