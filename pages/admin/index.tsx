import React from 'react';
import { DashboardOutlined } from '@mui/icons-material';

import { AdminLayout } from '../../components/layouts';

const DashboardPage = () => {
  return (
    <AdminLayout
      icon={<DashboardOutlined />}
      subTitle='Estadísticas generales'
      title='Dashboard'
    >
      <h2>Hola</h2>
    </AdminLayout>
  )
};

export default DashboardPage