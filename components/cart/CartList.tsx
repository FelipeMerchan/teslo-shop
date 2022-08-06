import { FC } from 'react';
import { initialData } from '../../database/products';
import { CartCard } from './CartCard';

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

interface Props {
    editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  return (
    <>
        {
            productsInCart.map(product => (
                /* TODO: eliminar any */
                <CartCard
                    key={product.slug}
                    product={product as any}
                    editable={editable}
                />
            ))
        }
    </>
  )
};
