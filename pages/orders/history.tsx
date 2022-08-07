import NextLink from 'next/link';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { ShopLayout } from '../../components/layouts';

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
                <NextLink href={`/orders/${params.row.order}`} passHref>
                    <Link underline='always'>
                        Ver orden ({params.row.order})
                    </Link>
                </NextLink>
            )
        }
    },
]

const rows = [
    { id: 1, paid: true, fullName: 'Felipe Merchan', order: '1234' },
    { id: 2, paid: false, fullName: 'Melissa Flores', order: '4564' },
    { id: 3, paid: true, fullName: 'Eduardo Rios', order: '5670' },
    { id: 4, paid: true, fullName: 'Natalia Herrera', order: '8697' },
]

const HistoryPage = () => {
  return (
    <ShopLayout title='Historial de órdenes' pageDescription='Historial de órdenes del cliente'>
        <Typography variant='h1' component='h1' marginBottom={4}>Historial de órdenes</Typography>
        <Grid container>
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
  )
}

export default HistoryPage