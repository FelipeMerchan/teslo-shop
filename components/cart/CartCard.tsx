import NextLink from 'next/link';
import { Grid, CardActionArea, CardMedia, Box, Typography, Button, Link } from '@mui/material';

import { ItemCounter } from '../ui';
import { FC, useContext } from 'react';
import { ICartProduct } from '../../interfaces';
import { CartContext } from '../../context';

interface Props {
    product: ICartProduct;
    editable: boolean;
}

export const CartCard: FC<Props> = ({ product, editable }) => {
    const { updateCartQuantity, removeCartProduct } = useContext(CartContext);

    const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
        product.quantity = newQuantityValue;
        updateCartQuantity(product);
    };

    return (
        <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={3}>
                <NextLink href={`/product/${product.slug}`} passHref>
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
                                updateQuantity={(newValue) => onNewCartQuantityValue(product, newValue)}
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
                        <Button
                            onClick={() => removeCartProduct(product)}
                            variant='text'
                            color='error'
                        >
                            Remover
                        </Button>
                    )
                }
            </Grid>
        </Grid>
    )
};
