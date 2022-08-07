import NextLink from 'next/link';
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

const OrderPage = () => {
  return (
    <ShopLayout title='Resumen de la orden 34123124' pageDescription='Resumen de la orden'>
        <Typography variant='h1' component='h1'>Orden: 34123124</Typography>

        {/* <Chip
            sx={{ mt: 2, mb: 4 }}
            label='Pendiente por pagar'
            variant='outlined'
            color='error'
            icon={<CreditCardOffOutlined />}
        /> */}
        <Chip
            sx={{ mt: 2, mb: 4 }}
            label='La orden ya fue pagada'
            variant='outlined'
            color='success'
            icon={<CreditScoreOutlined />}
        />

        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList />
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen (3 productos)</Typography>
                        <Divider sx={{ my: 1 }} />

                        <Box
                            display='flex'
                            justifyContent='space-between'
                            alignItems='center'
                        >
                            <Typography variant='subtitle1'>Dirección de entrega</Typography>
                            <NextLink href='/checkout/address' passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        <Typography>Felipe Merchan</Typography>
                        <Typography>Cl 34 No. 11-83</Typography>
                        <Typography>Bogotá, 101101</Typography>
                        <Typography>Colombia</Typography>
                        <Typography>+57 305 708 9099</Typography>
                        <Divider sx={{ my: 1 }} />

                        <Box
                            display='flex'
                            justifyContent='end'
                        >
                            <NextLink href='/cart' passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        <OrderSummary />

                        <Box sx={{ mt: 3 }}>
                            {/* TODO: pagar */}
                            <p>Pagar</p>
                            <Chip
                                sx={{ mt: 2, mb: 4 }}
                                label='La orden ya fue pagada'
                                variant='outlined'
                                color='success'
                                icon={<CreditScoreOutlined />}
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default OrderPage;
