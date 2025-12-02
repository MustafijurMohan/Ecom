import { useContext } from "react"
import { useNavigate, useSearchParams } from "react-router"
import { ShopContext } from "../context/ShopContext"
import axios from "axios"
import { toast } from "react-toastify"
import { useEffect } from "react"


const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const {url, token , setCartItems} = useContext(ShopContext)
    const navigate = useNavigate()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        try {
            if(!token) {
                return null
            }

            const res = await axios.post(url + '/verify', {success, orderId}, {headers: {token}})
            if(res.data.success) {
                setCartItems({})
                navigate('/orders')
            } else {
                navigate('/cart')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    useEffect(() => {
        verifyPayment()
    }, [token])
    

  return (
    <div>Verify</div>
  )
}

export default Verify