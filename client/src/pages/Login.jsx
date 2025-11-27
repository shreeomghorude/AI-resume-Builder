import { Lock, Mail, User2Icon } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice'
import toast from 'react-hot-toast'
import api from '../configs/api'

const Login = () => {

  const dispatch = useDispatch()   // must be top level

  const [state, setState] = React.useState("login")

  React.useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const urlState = query.get("state")
    if (urlState) setState(urlState)
  }, [])

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post(`/api/users/${state}`, formData)
      dispatch(login(data))
      localStorage.setItem('token', data.token)
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // common input classes
  const inputClasses =
    "w-full h-full outline-none border-none bg-transparent focus:outline-none focus:ring-0 focus:border-none"

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="sm:w-[350px] w-full text-center border border-gray-300 rounded-2xl px-8 py-10 bg-white"
      >

        <h1 className="text-gray-900 text-3xl font-medium">
          {state === "login" ? "Login" : "Sign up"}
        </h1>

        <p className="text-gray-500 text-sm mt-2">
          Please {state} to continue
        </p>

        {/* Name field for Sign Up */}
        {state !== "login" && (
          <div className="flex items-center mt-6 w-full border border-gray-300 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <User2Icon size={16} color="#6B7280" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>
        )}

        {/* Email */}
        <div className="flex items-center w-full mt-4 border border-gray-300 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail size={13} color="#6B7280" />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>

        {/* Password */}
        <div className="flex items-center mt-4 w-full border border-gray-300 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Lock size={13} color="#6B7280" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>

        <div className="mt-4 text-left">
          <button className="text-sm text-green-500 hover:underline" type="button">
            Forget password?
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-2 w-full h-11 rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity"
        >
          {state === "login" ? "Login" : "Sign up"}
        </button>

        {/* Switch login/register */}
        <p
          onClick={() =>
            setState(prev => (prev === "login" ? "register" : "login"))
          }
          className="text-gray-500 text-sm mt-3 mb-5 cursor-pointer"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span className="text-green-500 hover:underline"> click here</span>
        </p>

      </form>
    </div>
  )
}

export default Login
