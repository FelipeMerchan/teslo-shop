import type { NextPage, GetServerSideProps } from 'next';
import { Box, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

interface Props {
  productList: IProduct[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ productList, foundProducts, query }) => {
  return (
    <ShopLayout title='Teslo-Shop - Search' pageDescription='Encuentra los mejores productos de Teslo'>
      <Typography variant='h1' component='h1'>
        Buscar productos
      </Typography>
      {
        foundProducts
          ? <Typography variant='h2' sx={{ mb: 1 }}>Término: {query}</Typography>
          : (
            <Box display='flex'>
              <Typography variant='h2' sx={{ mb: 1 }}>No encontramos ningún producto</Typography>
              <Typography variant='h2' sx={{ ml: 1 }} color='secondary'>{query}</Typography>
            </Box>
          )
      }
  
      <ProductList productList={productList} />
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query } = params as { query: string };

  if(query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      }
    }
  }

  let productList = await dbProducts.getProductsByTerm(query);
  const foundProducts = productList.length > 0;
  // Todo: retornar otros productos cuando no hay productos con esa query

  return {
    props: {
      productList,
      foundProducts,
      query,
    }
  }
};

export default SearchPage
