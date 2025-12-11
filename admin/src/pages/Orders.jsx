import axios from "axios"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { useState } from "react"
import { assets } from "../assets/assets"
import { backendUrl } from "../App"
// const url = 'http://localhost:3000/api/v1'


const Orders = ({token}) => {

  const [orders, setOrders] = useState([])
  const currency = '$'

  // Fetch Order Data
  const fetchAllOrders = async () => {
      if(!token) {
        return null
      }
      try {
        const res = await axios.post(backendUrl + '/orders-list', {}, {headers: {token}})
        if (res.data.success) {
          setOrders(res.data.orders)
        } else {
          toast.error(res.data.message)
        }
        
      } catch (error) {
        toast.error(error.message)
      }
  }

    // Status Update Method

    const statusHandler = async (e, orderId) => {
      try {
        const res = await axios.post(backendUrl + '/update-status',{orderId, status: e.target.value}, {headers: {token}})
        if(res.data.success) {
          await fetchAllOrders()
          toast.success(res.data.message)
        } else {
          toast.error(res.data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }

  useEffect(() => {
    fetchAllOrders()
  }, [token])
  

  return (
    <>
      <h3> Order Page</h3>
      <div>
        {
          orders.map((order, i) => (
            <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 " key={i}>
              <img className="w-12" src={assets.parcel_icon} alt="" />
              <div>
                <div>
                {
                  order.items.map((item, i) => {
                    if (i === order.items.length - 1) {
                      return <p className="py-0.5" key={i}>{item['name']} x {item['quantity']} <span>{item['size']}</span> </p>
                    } else {
                      return <p className="py-0.5" key={i}>{item['name']} x {item['quantity']} <span>{item['size']}</span>, </p>
                    }
                  })
                }
                </div>
                  <p className="mt-3 mb-2 font-medium">{order.address.firstName + ' ' + order.address.lastName}</p>
                  <div>
                    <p>{order.address.street + ','}</p>
                    <p>{order.address.state + ',' + order.address.city + ',' + order.address.country + ',' + order.address.zip}</p>
                  </div>
                  <p>{order.address.phone}</p>
                </div>

                <div>
                  <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
                  <p className="mt-3">Method : {order.paymentMethod}</p>
                  <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                  <p>Date : {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <p className="text-sm sm:text-[15px]">{currency}{order.amount}</p>
                <select onChange={(e) => statusHandler(e, order._id)} className="p-2 font-semibold" value={order.status}>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
          ))
        }
      </div>
    </>
  )
}

export default Orders