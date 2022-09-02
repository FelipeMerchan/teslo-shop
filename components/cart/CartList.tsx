import { FC, useContext } from 'react';
import { CartContext } from '../../context';
import { ICartProduct } from '../../interfaces';
import { CartCard } from './CartCard';

interface Props {
    editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
    const { cart: productsInCart } = useContext(CartContext);

    return (
        <>
            {
                productsInCart.map(product => (
                    <CartCard
                        key={product.slug}
                        product={product as ICartProduct}
                        editable={editable}
                    />
                ))
            }
        </>
    )
};
