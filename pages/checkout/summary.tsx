import NextLink from 'next/link';
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';

const SummaryPage = () => {
  return (
    <ShopLayout title='Reumen de la orden' pageDescription='Resumen de la orden'>
        <Typography variant='h1' component='h1' marginBottom={4}>Resumen de la orden</Typography>

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
                            <Button
                                className='circular-btn'
                                color='secondary'
                                fullWidth
                            >
                                Confirmar orden
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default SummaryPage