import { AdminLayout } from '../../components/layouts';
import { ConfirmationNumberOutlined } from '@mui/icons-material';

const OrdersPage = () => {
  return (
    <AdminLayout
      title='Órdenes'
      subTitle='Mantenimiento de Órdenes'
      icon={<ConfirmationNumberOutlined />}
    >

    </AdminLayout>
  )
};

export default OrdersPage;