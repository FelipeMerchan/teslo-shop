import NextLink from 'next/link';
import { Grid, CardActionArea, CardMedia, Box, Typography, Button, Link } from '@mui/material';

import { ItemCounter } from '../ui';
import { FC } from 'react';
import { IProduct } from '../../interfaces';

interface Props {
    product: IProduct;
}

export const CartCard: FC<Props> = ({ product }) => {
  return (
    <Grid container spacing={2} sx={{ mb: 1 }} key={product.slug}>
        <Grid item xs={3}>
            {/* TODO: llevar a la pagina del producto */}
            <NextLink href='/product/slug' passHref>
                <Link>
                    <CardActionArea>
                        <CardMedia
                            image={`products/${product.images[0]}`}
                            component='img'
                            sx={{ borderRadius: '5px' }}
                        />
                    </CardActionArea>
                </Link>
            </NextLink>
        </Grid>
        <Grid item xs={7}>
            <Box display='flex' flexDirection='column'>
                <Typography variant='body1'>{product.title}</Typography>
                <Typography variant='body1'>Talla: <strong>M</strong></Typography>
                {/* Condicional */}
                <ItemCounter />
            </Box>
        </Grid>
        <Grid
            item
            xs={2}
            display='flex'
            alignItems='center'
            flexDirection='column'
        >
            <Typography variant='subtitle1'>${product.price}</Typography>
            {/* Editable */}
            <Button variant='text' color='error'>
                Remover
            </Button>
        </Grid>
    </Grid>
  )
}
