import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { useProducts } from '../../hooks';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';

const MenPage: NextPage = () => {
    const { productList, isLoading } = useProducts('/products?gender=men');

    return (
        <ShopLayout title='Teslo-Shop - Men' pageDescription='Encuentra los mejores productos de Teslo para hombres'>
            <Typography variant='h1' component='h1'>
                Hombres
            </Typography>
            <Typography variant='h2' sx={{ mb: 1 }}>
                Todos los productos
            </Typography>

            {
                isLoading
                    ? <FullScreenLoading />
                    : <ProductList productList={productList} />
            }
        </ShopLayout>
    )
}

export default MenPage