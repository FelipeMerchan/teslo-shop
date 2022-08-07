import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';

import { AuthLayout } from '../../components/layouts';

const LoginPage = () => {
  return (
    <AuthLayout title='Ingresar'>
        <Box sx={{ width: 350, padding: '8px 16px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ mb: 2 }}>
                    <Typography
                        variant='h1'
                        component='h1'
                    >Iniciar sesión</Typography>
                </Grid>

                <Grid item xs={12}>
                    <TextField label='Correo' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='Contraseña'
                        type='password'
                        variant='filled'
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        className='circular-btn'
                        color='secondary'
                        size='large'
                        fullWidth
                    >
                        Ingresar
                    </Button>
                </Grid>

                <Grid
                    item
                    xs={12}
                >
                    <NextLink href='/auth/register' passHref>
                        <Link underline='always'>
                            ¿No tienes una cuenta?
                        </Link>
                    </NextLink>
                </Grid>
            </Grid>
        </Box>
    </AuthLayout>
  )
}

export default LoginPage