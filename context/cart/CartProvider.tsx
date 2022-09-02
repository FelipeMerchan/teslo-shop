import { FC, useEffect, useReducer, useState } from 'react';
import Cookies from 'js-cookie';

import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';

interface Props {
    children: React.ReactNode;
}

export interface CartState {
    cart: ICartProduct[];
}

const CART_INITIAL_STATE = {
    cart: [],
}

export const CartProvider:FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (!isMounted) {
            try {
                const cookieProducts = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : [];
                dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
                setIsMounted(true);
            } catch (error) {
                dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
            }
        }
    }, [isMounted])

    useEffect(() => {
        if (isMounted) Cookies.set('cart', JSON.stringify(state.cart));
    }, [state.cart, isMounted])
    

    const addProductToCart = (product: ICartProduct) => {
        const productInCart = state.cart.some(p => p._id === product._id);
        if (!productInCart) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] });
        
        const productInCartButDifferentSize = state.cart.some(p => p._id === product._id && p.size === product.size);
        if (!productInCartButDifferentSize) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] });

        const updatedProducts = state.cart.map(p => {
            if (p._id !== product._id) return p;
            if (p.size !== product.size) return p;

            p.quantity += product.quantity;
            return p;
        });

        dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts })
    }

    return (
        <CartContext.Provider value={{
            ...state,

            //Methods
            addProductToCart,
        }}>
            {children}
        </CartContext.Provider>
    )
}
