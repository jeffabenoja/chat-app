import { Link } from "react-router-dom"
import { MessageCircleMore } from "lucide-react"
import { useState } from "react"
import useLogin from "../hooks/useLogin"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const { loading, login } = useLogin()
  const navigate = useNavigate()
  const [inputForm, setInputForm] = useState({
    username: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(inputForm)
    navigate("/", { replace: true }) // force redirect
  }

  return (
    <div className='flex flex-col items-center justify-center w-[480px] mx-auto'>
      <div className='w-full px-12 py-16 rounded-xl shadow-md bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70'>
        <div className='flex items-center justify-center mb-10'>
          <MessageCircleMore className='w-14 h-14 text-indigo-300 mr-2.5' />
          <h1 className='text-3xl font-semibold text-center text-white '>
            <span className='text-indigo-300'>Whispra Chat</span> App
          </h1>
        </div>

        <form className='flex flex-col gap-2.5' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5'>
            <div>
              <input
                type='text'
                placeholder='Enter username'
                className='w-full py-2 px-2.5 outline-none border-b text-white bg-transparent placeholder-gray-300'
                value={inputForm.username}
                onChange={(e) =>
                  setInputForm({ ...inputForm, username: e.target.value })
                }
              />
            </div>

            <div>
              <input
                type='password'
                placeholder='Enter password'
                className='w-full py-2 px-2.5 outline-none border-b text-white bg-transparent placeholder-gray-300'
                value={inputForm.password}
                onChange={(e) =>
                  setInputForm({ ...inputForm, password: e.target.value })
                }
              />
            </div>
          </div>

          <Link
            to='/signup'
            className='text-sm hover:underline text-white hover:text-gray-300 mt-2 inline-block mt-5 mb-5'
          >
            {"Don't"} have an account?{" "}
            <span className='text-indigo-300 font-bold uppercase'>
              Sign up!
            </span>
          </Link>

          <div>
            <button className='w-full py-2 mt-1 text-center flex items-center justify-center rounded-md bg-white  hover:bg-gray-400'>
              {loading ? (
                <div className='w-5 h-5 border-2 border-t-transparent border-gray-700 rounded-full animate-spin'></div>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
