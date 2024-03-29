import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material';

import { AdminLayout } from '../../components/layouts';
import { Grid, Typography } from '@mui/material';
import { SummaryTile } from '../../components/admin';
import { DashboardSummaryResponse } from '../../interfaces';

const DashboardPage = () => {
  const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
    refreshInterval: 30 * 1000,
  });

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('tick');
      setRefreshIn(refreshIn => refreshIn > 0 ? refreshIn - 1 : 30);
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);
  

  if (!error && !data) {
    return <></>;
  }

  if (error) {
    console.log(error);
    return <Typography>Error al cargar la información</Typography>;
  }

  const {
    lowInventory,
    notPaidOrders,
    numberOfClients,
    numberOfOrders,
    numberOfProducts,
    paidOrders,
    productsWithNoInventory,
  } = data!;

  return (
    <AdminLayout
      icon={<DashboardOutlined />}
      subTitle='Estadísticas generales'
      title='Dashboard'
    >
      <Grid container spacing={2}>
        <SummaryTile
          icon={<CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} />}
          subTitle='Órdenes totales'
          title={numberOfOrders}
        />
        <SummaryTile
          icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
          subTitle='Órdenes pagadas'
          title={paidOrders}
        />
        <SummaryTile
          icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
          subTitle='Órdenes pendientes'
          title={notPaidOrders}
        />
        <SummaryTile
          icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />}
          subTitle='Clientes'
          title={numberOfClients}
        />
        <SummaryTile
          icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
          subTitle='Productos'
          title={numberOfProducts}
        />
        <SummaryTile
          icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />}
          subTitle='Productos sin existencias'
          title={productsWithNoInventory}
        />
        <SummaryTile
          icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} />}
          subTitle='Bajo inventario'
          title={lowInventory}
        />
        <SummaryTile
          icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />}
          subTitle='Actualización en'
          title={refreshIn}
        />
      </Grid>
    </AdminLayout>
  )
};

export default DashboardPage;
