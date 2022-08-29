import type { NextPage, GetServerSideProps } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

interface Props {
  productList: IProduct[];
}

const SearchPage: NextPage<Props> = ({ productList }) => {
  return (
    <ShopLayout title='Teslo-Shop - Search' pageDescription='Encuentra los mejores productos de Teslo'>
      <Typography variant='h1' component='h1'>
        Buscar producto
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        ABC - 123
      </Typography>
  
      <ProductList productList={productList} />
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query } = params as { query: string };

  if(query.length ===0) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      }
    }
  }

  let productList = await dbProducts.getProductsByTerm(query);
  // Todo: retornar otros productos cuando no hay productos con esa query

  return {
    props: {
      productList,
    }
  }
};

export default SearchPage
