import { useState, useContext } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { getSession, signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

import { AuthContext } from '../../context';
import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';

type FormData = {
    name    : string;
    email   : string;
    password: string;
};

const RegisterPage = () => {
    const router = useRouter();
    const { registerUser } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onRegisterForm = async ({ name, email, password }: FormData) => {
        setShowError(false);
        const { hasError, message } = await registerUser(name, email, password);

        if (hasError) {
            setShowError(true);
            setErrorMessage(message!);
            setTimeout(() => setShowError(false), 3000);
            return;
        }

        await signIn('credentials', { email, password });
        /* // Version personalizada de la autenticacion:
        const destination = router.query.p?.toString() || '/'
        router.replace(destination); */
    }

    return (
        <AuthLayout title='Crear cuenta'>
            <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
                <Box sx={{ width: 350, padding: '8px 16px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ mb: 2 }}>
                            <Typography
                                variant='h1'
                                component='h1'
                            >
                                Crear cuenta
                            </Typography>
                            <Chip
                                className='fadeIn'
                                label='No reconocemos ese usuario / contraseña'
                                color='error'
                                icon={<ErrorOutline />}
                                sx={{ display: showError ? 'flex' : 'none' }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label='Nombre'
                                variant='filled'
                                fullWidth
                                {
                                    ...register('name', {
                                        required: 'Este campo es requerido',
                                        minLength: { value: 2, message: 'Mínimo 2 caracteres'}
                                    })
                                }
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type='email'
                                label='Correo'
                                variant='filled'
                                fullWidth
                                {
                                    ...register('email', {
                                        required: 'Este campo es requerido',
                                        validate: validations.isEmail,
                                    })
                                }
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label='Contraseña'
                                type='password'
                                variant='filled'
                                fullWidth
                                {
                                    ...register('password', {
                                        required: 'Este campo es requerido',
                                        minLength: { value: 6, message: 'Mínimo 6 caracteres'}
                                    })
                                }
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                
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
                                Crear
                            </Button>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                        >
                            <NextLink
                                href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'}
                                passHref
                            >
                                <Link underline='always'>
                                    ¿Ya tienes una cuenta?
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const session = await getSession({ req });
    const { p = '/' } = query;

    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false,
            }
        }
    }

    return {
        props: {
            
        }
    }
}

export default RegisterPage;
