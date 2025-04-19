import { Link } from "react-router-dom"
import GenderCheckbox from "../components/GenderCheckbox"
import { MessageCircleMore } from "lucide-react"
import React, { useState } from "react"
import useSignup from "../hooks/useSignup"

const SignUp = () => {
  const { loading, signup } = useSignup()
  const [inputForm, setInputForm] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  })

  const handleCheckBoxChange = (gender: "male" | "female") => {
    setInputForm({ ...inputForm, gender })
  }

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault()

    const success = await signup(inputForm)

    if (success) {
      setInputForm({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
      })
    }
  }

  return (
    <div className='flex flex-col items-center justify-center w-[480px] mx-auto'>
      <div className='w-full px-12 py-14 rounded-lg shadow-md bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70'>
        <div className='flex items-center justify-center mb-10'>
          <MessageCircleMore className='w-14 h-14 text-indigo-300 mr-2.5' />
          <h1 className='text-3xl font-semibold text-center text-white '>
            <span className='text-indigo-300'>Whispra Chat</span> App
          </h1>
        </div>

        <form
          className='flex flex-col gap-2.5 mt-2 '
          onSubmit={handleSubmitForm}
        >
          <div className='flex flex-col gap-5'>
            <div>
              <input
                type='text'
                placeholder='Enter Full Name'
                className='w-full py-2 px-2.5 outline-none border-b text-white bg-transparent placeholder-gray-300'
                value={inputForm.fullName}
                onChange={(e) =>
                  setInputForm({ ...inputForm, fullName: e.target.value })
                }
              />
            </div>

            <div>
              <input
                type='text'
                placeholder='Enter Username'
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
                placeholder='Enter Password'
                className='w-full py-2 px-2.5 outline-none border-b text-white bg-transparent placeholder-gray-300'
                value={inputForm.password}
                onChange={(e) =>
                  setInputForm({ ...inputForm, password: e.target.value })
                }
              />
            </div>

            <div>
              <input
                type='password'
                placeholder='Confirm Password'
                className='w-full py-2 px-2.5 outline-none border-b text-white bg-transparent placeholder-gray-300 mb-2.5'
                value={inputForm.confirmPassword}
                onChange={(e) =>
                  setInputForm({
                    ...inputForm,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>

            <GenderCheckbox
              selectedGender={inputForm.gender}
              onCheckedChange={handleCheckBoxChange}
            />
          </div>

          <Link
            to={"/login"}
            className='text-sm hover:underline text-white hover:text-gray-300 mt-2 inline-block mt-5 mb-5'
          >
            Already have an account?{" "}
            <span className='text-indigo-300 font-bold uppercase'>login!</span>
          </Link>

          <div>
            <button className='w-full py-2 mt-1 text-center flex items-center justify-center rounded-md bg-white hover:bg-gray-300'>
              {loading ? (
                <div className='w-5 h-5 border-2 border-t-transparent border-gray-700 rounded-full animate-spin'></div>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
