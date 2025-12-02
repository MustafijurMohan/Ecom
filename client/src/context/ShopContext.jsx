import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import axios from 'axios'

export const ShopContext = createContext()



export const ShopProvider = ({children}) => {

    const currency = '$'
    const delivery_fee = 10
    // const backendUrl = import.meta.env.BACKEND_URL
    const url = 'http://localhost:3000/api/v1'
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')
    

    const addToCart = async (itemId, size) => {
        if(!size) {
            toast.error('Product Size Required!')
            return null
        }

        let cartData = structuredClone(cartItems)
        
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItems(cartData)

        try {
            if(token){
            await axios.post(url + '/add-cart', {itemId, size}, {headers: {token}})
            toast.success('Cart Add Successfull.')
        }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    

    const getCartCount = () => {
        let totalCount = 0
        for(const items in cartItems) {
            for(const item in cartItems[items]) {
                try {
                    if(cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems)
        cartData[itemId][size] = quantity
        setCartItems(cartData)

        if(token) {
            try {
                await axios.post(url + '/update-cart', {itemId, size, quantity}, {headers: {token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }


    const getCartAmount =  () => {
        let totalAmount = 0
        for(const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items)
            for(const item in cartItems[items]) {
                try {
                    if(cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount
    }


    // Get Product Data
    const getProductsData = async () => {
        try {
            const res = await axios.get(url +'/list-products')
            if(res.data.success) {
                setProducts(res.data.products)
            } else {
                toast.error(res.data.message)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    // get user Cart Data
    const getCartData = async (token) => {
        try {
            const res = await axios.post(url + '/get-cart', {}, {headers: {token}})
            if(res.data.success) {
                setCartItems(res.data.cartData)
            }
        } catch (error) {
            console.log(error.message)
            toast.error(res.data.message)
        }
    }

    useEffect(() => {
        getProductsData()
    }, [token])

    useEffect(() => {
        if(!token && localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'))
        getCartData(localStorage.getItem('token'))
    }
    }, [])
    
    
    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, setCartItems, addToCart,
        getCartCount, updateQuantity, url,
        getCartAmount, token, setToken

    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )

}


