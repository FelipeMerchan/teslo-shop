import { FC, useEffect, useReducer, useState } from 'react';
import Cookies from 'js-cookie';

import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';

interface Props {
    children: React.ReactNode;
}

export interface CartState {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    shippingAddress?: ShippingAddress;
}

export interface ShippingAddress {
    firstName: string;
    lastName : string;
    address  : string;
    address2?: string;
    zip      : string;
    city     : string;
    country  : string;
    phone    : string;
}

const CART_INITIAL_STATE = {
    isLoaded: false,
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,

    shippingAddress: undefined,
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
        if (!isMounted && Cookies.get('firstName')) {
            const shippingAddress: ShippingAddress = {
                firstName: Cookies.get('firstName') || '',
                lastName: Cookies.get('lastName') || '',
                address: Cookies.get('address') || '',
                address2: Cookies.get('address2') || '',
                zip: Cookies.get('zip') || '',
                city: Cookies.get('city') || '',
                country: Cookies.get('country') || '',
                phone: Cookies.get('phone') || '',  
            }
            dispatch({ type: '[Cart] - LoadAddress from cookies', payload: shippingAddress });
            setIsMounted(true);
        }
    }, [])
    

    useEffect(() => {
        if (isMounted) Cookies.set('cart', JSON.stringify(state.cart));
    }, [state.cart, isMounted])

    useEffect(() => {
        if (isMounted) {
            const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0);
            const subTotal = state.cart.reduce((prev, current) => (current.price * current.quantity) + prev, 0);
            const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

            const orderSummary = {
                numberOfItems,
                subTotal,
                tax: subTotal * taxRate,
                total: subTotal * (taxRate + 1),
            };

            dispatch({ type: '[Cart] - Update order summary', payload: orderSummary });
        };
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
    };

    const updateCartQuantity = (product: ICartProduct) => {
        dispatch({ type: '[Cart] - Change cart quantity', payload: product });
    };

    const removeCartProduct = (product: ICartProduct) => {
        dispatch({ type: '[Cart] - Remove product in cart', payload: product });
    };

    const updateAddress = (address: ShippingAddress) => {
        Cookies.set('firstName', address.firstName);
        Cookies.set('lastName', address.lastName);
        Cookies.set('address', address.address);
        Cookies.set('address2', address.address2 || '');
        Cookies.set('zip', address.zip);
        Cookies.set('city', address.city);
        Cookies.set('country', address.country);
        Cookies.set('phone', address.phone);

        dispatch({ type: '[Cart] - Update address', payload: address });
    }

    return (
        <CartContext.Provider value={{
            ...state,

            //Methods
            addProductToCart,
            removeCartProduct,
            updateAddress,
            updateCartQuantity,
        }}>
            {children}
        </CartContext.Provider>
    )
}
