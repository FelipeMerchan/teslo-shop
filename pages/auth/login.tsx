import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../components/layouts';

type FormData = {
    email: string,
    password: string,
};

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onLoginUser = (data: FormData) => {
        console.log(data);
    }

    return (
        <AuthLayout title='Ingresar'>
            <form onSubmit={handleSubmit(onLoginUser)}>
                <Box sx={{ width: 350, padding: '8px 16px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ mb: 2 }}>
                            <Typography
                                variant='h1'
                                component='h1'
                            >
                                Iniciar sesión
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                type='email'
                                label='Correo'
                                variant='filled'
                                fullWidth
                                {...register('email')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label='Contraseña'
                                type='password'
                                variant='filled'
                                fullWidth
                                {...register('password')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                className='circular-btn'
                                type='submit'
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
            </form>
        </AuthLayout>
    )
}

export default LoginPage;
