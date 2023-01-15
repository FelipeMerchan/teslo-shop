import React from 'react';
import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material';

import { AdminLayout } from '../../components/layouts';
import { Grid } from '@mui/material';
import { SummaryTile } from '../../components/admin';

const DashboardPage = () => {
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
          title={1}
        />
        <SummaryTile
          icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
          subTitle='Órdenes pagadas'
          title={2}
        />
        <SummaryTile
          icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
          subTitle='Órdenes pendientes'
          title={3}
        />
        <SummaryTile
          icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />}
          subTitle='Clientes'
          title={4}
        />
        <SummaryTile
          icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
          subTitle='Productos'
          title={6}
        />
        <SummaryTile
          icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />}
          subTitle='Productos sin existencias'
          title={6}
        />
        <SummaryTile
          icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} />}
          subTitle='Bajo inventario'
          title={7}
        />
        <SummaryTile
          icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />}
          subTitle='Actualización en'
          title={8}
        />
      </Grid>
    </AdminLayout>
  )
};

export default DashboardPage