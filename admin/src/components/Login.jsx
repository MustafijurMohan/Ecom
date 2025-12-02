import { useState } from "react"
import axios from 'axios'
import { toast } from "react-toastify"
// import { backendUrl } from "../App"
const Url = 'http://localhost:3000/api/v1'


const Login = ({setToken}) => {

    const [user, setUser] = useState({email: '', password: ''})
    const {email, password} = user

    const onChangeHandler = (e) => {
        const {name, value} = e.target
        // setUser({...user, [name]: value})
        setUser((prev) => ({
            ...prev, [name] : value
        }))
    }

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault()
            // console.log(user)
            const res = await axios.post(Url + '/admin-login', {email, password})
            if (res.data.success) {
                setToken(res.data.token)
                toast.success(res.data.message)
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(res.data.message)
        }
    }
  return (
    <>
        <div className="flex items-center justify-center w-full min-h-screen">
            <div className='max-w-md bg-white shadow-md px-8 py-6 rounded-lg'>
                <h1 className='text-2xl font-bold mb-4'> Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                        <input onChange={onChangeHandler} value={user.email} name='email' className='w-full px-3 py-2 rounded-md border border-gray-300 outline-none' type="email" placeholder='your@gmail.com' required />
                    </div>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                        <input onChange={onChangeHandler} value={user.password} name='password' className='w-full px-3 py-2 rounded-md border border-gray-300 outline-none' type="password" placeholder='Enter your password' required />
                    </div>
                    <button className='w-full px-4 py-2 mt-2 rounded-md text-white bg-black cursor-pointer' type="submit">Login</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default Login