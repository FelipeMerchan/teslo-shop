import { FC } from 'react';
import { Grid } from '@mui/material';

import { IProduct } from '../../interfaces';
import { ProductCard } from '.';

interface Props {
    productList: IProduct[];
}

export const ProductList: FC<Props> = ({ productList }) => {
  return (
    <Grid container spacing={4}>
        {
            productList.map(product => (
                <ProductCard
                    key={product.slug}
                    product={product}
                />
            ))   
        }
    </Grid>
  )
};
