import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { useProducts } from '../../hooks';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';

const SearchPage: NextPage = () => {
  const { productList, isLoading } = useProducts('/search/cybertruck');

  return (
    <ShopLayout title='Teslo-Shop - Search' pageDescription='Encuentra los mejores productos de Teslo'>
      <Typography variant='h1' component='h1'>
        Buscar producto
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        ABC - 123
      </Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList productList={productList} />
      }
    </ShopLayout>
  )
}

export default SearchPage
