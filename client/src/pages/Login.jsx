import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from 'react-router'

const Login = () => {

  const [currentState, setCurrentState] = useState('Login')
  const {token, setToken, url} = useContext(ShopContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()


  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if(currentState === 'Sign Up') {
        const res = await axios.post(url + '/register', {name, email, password})
        if (res.data.success) {
          toast.success('Sign In Successfull.')
          setToken(res.data.token)
          localStorage.setItem('token', res.data.token)
        } else {
          toast.error(res.data.message)
        }

      } else {
        const res = await axios.post(url + '/login', {email, password})
        if (res.data.success) {
          toast.success('Login Successfull.')
          setToken(res.data.token)
          localStorage.setItem( 'token', res.data.token)
        } else {
          toast.error(res.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(token) {
      navigate('/')
    }
  }, [token])
  

  return (
    <>
      <form onSubmit={onSubmitHandler} className="flex flex-col items-center gap-4 w-[90%] sm:max-w-96 m-auto mt-14 text-gray-800">
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>
        {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="w-full px-3 py-2 border border-gray-800 outline-none" placeholder="Name" required /> }
        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="w-full px-3 py-2 border border-gray-800 outline-none" placeholder="Email" required />
        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="w-full px-3 py-2 border border-gray-800 outline-none" placeholder="Password" required />
        <div className="flex justify-between w-full text-sm mt-[-8px]">
          <p className="cursor-pointer">Forgot Password?</p>
          {
            currentState === 'Login' ?
            <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">Create Account</p>
            :
            <p onClick={() => setCurrentState('Login')} className="cursor-pointer">Login Here</p>
          }
        </div>
        <button className="px-8 py-2 mt-4 bg-black text-white font-light cursor-pointer" type="submit">{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
      </form>
    </>
  )
}

export default Login