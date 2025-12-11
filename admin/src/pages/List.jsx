import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'
// const Url = 'http://localhost:3000/api/v1'


const List = ({token}) => {

  const [list, setList] = useState([])
  const currency = '$'

  const fetchList = async () => {
    try {
      const res = await axios.get(backendUrl + '/list-products', {headers: {token}})
      if (res.data.success) {
        setList(res.data.products)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      // toast.error(res.data.message)
    }
  }

  // Remove Products
  const removeProduct = async (id) => {
    try {
      const res = await axios.delete(backendUrl + '/remove-products/' + id, {headers: {token}})
      if(res.data.success) {
        toast.success(res.data.message)
        await fetchList()
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      // toast.error(res.data.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])
  

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* List Table Title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-1 py-1 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Products List */}
        {
          list.map((item, i) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 px-1 py-1 border text-sm' key={i}>
              <img className='w-12' src={item['image'][0]} alt="" />
              <p>{item['name']}</p>
              <p>{item['category']}</p>
              <p>{currency}{item['price']}</p>
              <p onClick={() => removeProduct(item['_id'])} className='text-right md:text-center text-lg cursor-pointer'>X</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default List