import NextLink from 'next/link';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';

const EmptyPage = () => {
  return (
    <ShopLayout title='Page not found' pageDescription='No hay nada que mostrar aquí'>
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='calc(100vh - 200px)'
            sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        >
            <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
            <Box sx={{ ml: 2 }} display='flex' flexDirection='column' alignItems='flex-start'>
                <Typography>Su carrito está vacío</Typography>
                <NextLink href='/' passHref>
                    <Link typography='h5' color='secondary'>
                        Regresar
                    </Link>
                </NextLink>
            </Box>
        </Box>
    </ShopLayout>
  )
}

export default EmptyPage