import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';
import { countries } from '../../utils';

type FormData = {
    firstName: string;
    lastName : string;
    address  : string;
    address2?: string;
    zip      : string;
    city     : string;
    country  : string;
    phone    : string;
}

const AddressPage = () => {
  return (
    <ShopLayout title='Dirección' pageDescription='Confirmar dirección del destino'>
        <Typography variant='h1' component='h1' marginBottom={4}>Dirección</Typography>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField label='Nombre' variant='filled' fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Apellido' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='Dirección' variant='filled' fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Dirección 2(opcional)' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='Código Postal' variant='filled' fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Ciudad' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <Select
                        variant='filled'
                        label='País'
                        value={'CRI'}
                    >
                        {
                            countries.map(({ code, name }) => (
                                <MenuItem
                                    key={code}
                                    value={code}
                                >
                                    {name}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Teléfono' variant='filled' fullWidth />
            </Grid>
        </Grid>

        <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
            <Button className='circular-btn' size='large' color='secondary'>
                Revisar pedido
            </Button>
        </Box>
    </ShopLayout>
  )
};

/* export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const { token = '' } = req.cookies;
    let isValidToken = false;

    try {
        await jwt.isValidToken(token);
        isValidToken = true;
    } catch (error) {
        isValidToken = false;
    }

    if (!isValidToken) {
        return {
            redirect: {
                destination: '/auth/login?p=/checkout/address',
                permanent: false,
            }
        }
    }

    return {
        props: {
            
        }
    }
} */

export default AddressPage;
