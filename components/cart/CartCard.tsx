import NextLink from 'next/link';
import { Grid, CardActionArea, CardMedia, Box, Typography, Button, Link } from '@mui/material';

import { ItemCounter } from '../ui';
import { FC } from 'react';
import { ICartProduct } from '../../interfaces';

interface Props {
    product: ICartProduct;
    editable: boolean;
}

export const CartCard: FC<Props> = ({ product, editable }) => {
  return (
    <Grid container spacing={2} sx={{ mb: 1 }} key={product.slug}>
        <Grid item xs={3}>
            {/* TODO: llevar a la pagina del producto */}
            <NextLink href='/product/slug' passHref>
                <Link>
                    <CardActionArea>
                        <CardMedia
                            image={`/products/${product.image}`}
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
                <Typography variant='body1'>Talla: <strong>{product.size}</strong></Typography>
                {
                    editable
                    ? (
                        <ItemCounter
                            currentValue={product.quantity}
                            maxValue={10}
                            updateQuantity={() => {}}
                        />
                    )
                    : (
                        <Typography>
                            {product.quantity} {product.quantity > 1 ? 'productos' : 'producto'}
                        </Typography>
                    )
                }
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
            {
                editable && (
                    <Button variant='text' color='error'>
                        Remover
                    </Button>
                )
            }
        </Grid>
    </Grid>
  )
};
