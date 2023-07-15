const initialState = JSON.parse(localStorage.getItem('cart')) || [];

import React, { createContext, useContext, useState, useEffect } from "react";


const CartContext = createContext();

export const CartContextProvider = ({ children }) => {


    //Estado carrito
    const [cart, setCart] = useState(initialState);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])



    const addToCart = (bookProduct) => {
        const bookInCart = cart.find((book) => book.bookProduct.id === bookProduct.id);


        if (bookInCart) {
            const newCart = cart.map((item) => item.bookProduct.id === bookProduct.id ?
                { ...item, quantity: item.quantity + 1 } : item);
            setCart(newCart);
        } else {
            setCart([...cart, { bookProduct, quantity: 1 }]);
        }

    };


    const deleteFromCart = (idBookProduct) => {
        const newCart = cart.filter((item) => item.bookProduct.id !== idBookProduct);
        setCart(newCart);
    }

    return (
        // Se pasan las propiedades del contexto, se crea el contexto
        <CartContext.Provider
            // enviamos los valores que utilizamos en el contexto
            value={{
                cart,
                setCart,
                addToCart,
                deleteFromCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => useContext(CartContext);