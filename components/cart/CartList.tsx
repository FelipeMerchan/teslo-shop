import { FC, useContext } from 'react';
import { CartContext } from '../../context';
import { ICartProduct, IOrderItem } from '../../interfaces';
import { CartCard } from './CartCard';

interface Props {
    editable?: boolean;
    products?: IOrderItem[];
}

export const CartList: FC<Props> = ({ editable = false, products }) => {
    const { cart: productsInCart } = useContext(CartContext);

    const productsToShow = products ? products : productsInCart;

    return (
        <>
            {
                productsToShow.map(product => (
                    <CartCard
                        key={product.slug + product.size}
                        product={product as ICartProduct}
                        editable={editable}
                    />
                ))
            }
        </>
    )
};
