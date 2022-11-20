import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { getSession } from 'next-auth/react';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { dbOrders } from '../../database';
import { ShopLayout } from '../../components/layouts';
import { IOrder } from '../../interfaces';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100},
    { field: 'fullName', headerName: 'Nombre Completo', width: 300},
    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra información sobre si la orden fue pagada',
        width: 200,
        renderCell: (params: GridValueGetterParams) => {
            return (
                params.row.paid
                    ? <Chip color='success' label='Pagada' variant='outlined' />
                    : <Chip color='error' label='No pagada' variant='outlined' />
            )
        }
    },
    {
        field: 'order',
        headerName: 'Ver orden',
        width: 200,
        sortable: false,
        renderCell: (params: GridValueGetterParams) => {
            return (
                <NextLink href={`/orders/${params.row.orderId}`} passHref>
                    <Link underline='always'>
                        Ver orden
                    </Link>
                </NextLink>
            )
        }
    },
];

interface Props {
    orderList: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orderList }) => {
    const rows = orderList.map((order, index) => ({
        fullName: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
        id: index + 1,
        orderId: order._id,
        paid: order.isPaid,
    }));

    return (
        <ShopLayout title='Historial de órdenes' pageDescription='Historial de órdenes del cliente'>
            <Typography variant='h1' component='h1' marginBottom={4}>Historial de órdenes</Typography>
            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        columns={columns}
                        rows={rows}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>
        </ShopLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session: any = await getSession({ req });

    if(!session) {
        return {
            redirect: {
                destination: '/auth/login?p=/order/history',
                permanent: false,
            }
        };
    }

    const orderList = await dbOrders.getOrderListByUser(session.user._id);

    return {
        props: {
            orderList,
        }
    }
}

export default HistoryPage