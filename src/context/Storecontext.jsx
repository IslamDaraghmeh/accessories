import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';  // Ensure correct import
import { useNavigate } from "react-router-dom";

export const Storecontext = createContext({
    cartItem: {},
    product_list: [],
    removeCart: () => { },
    addToCart: () => { },
    getItemQuantity: () => { },
    getTotalCartAmount: () => { },
    setToken: () => { },
});

const StorecontextProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [cartItem, setCartItem] = useState(JSON.parse(localStorage.getItem("cartData")) || {});
    const [product_list, setProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loginData, setLoginData] = useState(token ? jwtDecode(localStorage.getItem('token')) : null);
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setLoginData(); /// استدعي الفنكشن لفك تشفير التوكن
        }

    }, [])
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setLoginData(null);
        navigate('/login');
    };
    useEffect(() => {
        if (localStorage.getItem('token')) {
            let decoded = jwtDecode(localStorage.getItem('token'));
            setLoginData(decoded);
            console.log(loginData)
        }

    }, [])
    const setLoginDataFromToken = (token) => {
        try {
            const decoded = jwtDecode(token);
            setLoginData(decoded);
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    };

    useEffect(() => {
        if (token) {
            setLoginDataFromToken(token);
        }
    }, [token]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await getProductList();
            if (token) {
                await getCartData(token);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [token]);

    const handleLoginSuccess = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
        setLoginDataFromToken(token);
    };

    useEffect(() => {
        localStorage.setItem("cartData", JSON.stringify(cartItem));
    }, [cartItem]);

    const addToCart = async (itemId) => {
        setCartItem((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
        if (token) {
            await axios.post('http://localhost:3002/api/v1/cart/add', { itemId }, { headers: { token } });
        }
    };


    const removeCart = async (itemId) => {
        if (cartItem[itemId] > 0) {
            setCartItem((prev) => ({
                ...prev,
                [itemId]: prev[itemId] - 1,
            }));

            if (token) {
                const config = {
                    headers: { token },
                    data: { itemId }
                };
                await axios.delete("http://localhost:3002/api/v1/cart/delete", config);
            }
        }

    };

    const getItemQuantity = () => {
        return Object.values(cartItem).reduce((total, quantity) => total + quantity, 0);
    };

    const getTotalCartAmount = () => {
        if (product_list.length === 0) {
            console.log('Product list is empty or still loading. Cannot calculate total amount.');
            return 0;
        }

        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                const itemInfo = product_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItem[item];
                }
            }
        }
        return totalAmount;
    };

    const getProductList = async () => {
        try {
            const response = await axios.get('http://localhost:3002/api/v1/basic/all');
            if (response.data) {
                setProductList(response.data.findAll);
                console.log('product', product_list)
            } else {
                console.log('Failed to fetch product list');
            }
        } catch (error) {
            console.error('Error fetching product list:', error);
        }
    };

    const DeleteCartData = async (itemId) => {
        setCartItem((prev) => ({
            ...prev,
            [itemId]: 0,
        }));
        try {
            if (token) {
                await axios.delete('http://localhost:3002/api/v1/cart/deleteItem', { data: { itemId }, headers: { token } });
            }
        } catch (error) {
            console.error('Error deleting cart item:', error);
        }
    };

    const getCartData = async () => {
        try {
            const response = await axios.get('http://localhost:3002/api/v1/cart/get', { headers: { token } });
            setCartItem(response.data.cartData);
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };

    const contextValue = {
        product_list,
        removeCart,
        addToCart,
        setCartItem,
        cartItem,
        getItemQuantity,
        getTotalCartAmount,
        setToken,
        token,
        isLoading,
        DeleteCartData,
        loginData,
        logout,
        setLoginData,
        handleLoginSuccess
    };

    return (
        <Storecontext.Provider value={contextValue}>
            {props.children}
        </Storecontext.Provider>
    );
};

export default StorecontextProvider;
