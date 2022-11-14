import { createContext } from 'react';
import { ICartProduct, ShippingAddress } from '../../interfaces';

interface ContextProps {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    shippingAddress?: ShippingAddress;

    // Methods
    addProductToCart: (product: ICartProduct) => void;
    updateAddress: (address: ShippingAddress) => void;
    updateCartQuantity: (product: ICartProduct) => void;
    removeCartProduct: (product: ICartProduct) => void;

    // Orders
    createOrder: () => Promise<void>
}

export const CartContext = createContext({} as ContextProps);
