import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { ConfirmationNumberOutlined, CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { Card, CardContent, Chip, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import { AdminLayout } from '../../../components/layouts';

import { dbOrders } from '../../../database';
import { IOrder } from '../../../interfaces';
import { CartList, OrderSummary } from '../../../components/cart';
import { Box } from '@mui/system';

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const { shippingAddress, isPaid } = order;

  return (
    <AdminLayout
      icon={<ConfirmationNumberOutlined />}
      subTitle={`Orden ID: ${order._id}`}
      title='Resumen de la orden'
    >
      {
        isPaid
          ? (
            <Chip
              sx={{ mt: 2, mb: 4 }}
              label='La orden ya fue pagada'
              variant='outlined'
              color='success'
              icon={<CreditScoreOutlined />}
            />
        ) :
        (
          <Chip
            sx={{ mt: 2, mb: 4 }}
            label='Pendiente por pagar'
            variant='outlined'
            color='error'
            icon={<CreditCardOffOutlined />}
          />
        )
      }

      <Grid container className='fadeIn'>
        <Grid item xs={12} sm={7}>
          <CartList products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Resumen ({order.numberOfItems} {order.numberOfItems > 1 ? 'productos' : 'producto'})</Typography>
              <Divider sx={{ my: 1 }} />

              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
              >
                <Typography variant='subtitle1'>Dirección de entrega</Typography>
              </Box>

              <Typography>{shippingAddress.firstName} {shippingAddress.lastName}</Typography>
              <Typography>{shippingAddress.address}{shippingAddress.address2 ? `, ${shippingAddress.address2}` : '' }</Typography>
              <Typography>{shippingAddress.city}, {shippingAddress.zip}</Typography>
              <Typography>{shippingAddress.country}</Typography>
              <Typography>{shippingAddress.phone}</Typography>
              <Divider sx={{ my: 1 }} />

              <OrderSummary
                orderValues={{
                  numberOfItems: order.numberOfItems,
                  subTotal: order.subTotal,
                  tax: order.tax,
                  total: order.total,
                }}
              />

              <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                {
                  isPaid
                    ? (
                      <Chip
                        sx={{ mt: 2, mb: 4 }}
                        label='La orden ya fue pagada'
                        variant='outlined'
                        color='success'
                        icon={<CreditScoreOutlined />}
                      />
                  ) :
                  (
                    <Chip
                      sx={{ mt: 2, mb: 4 }}
                      label='Pendiente por pagar'
                      variant='outlined'
                      color='error'
                      icon={<CreditCardOffOutlined />}
                    />
                  )
                }
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  )
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const { id = '' } = query;

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: `/admin/orders`,
        permanent: false,
      }
    };
  }

  return {
    props: {
      order,
    }
  };
};

export default OrderPage;
