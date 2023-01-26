import { FC } from 'react';
import { CategoryOutlined, ConfirmationNumberOutlined, AdminPanelSettings, DashboardOutlined } from '@mui/icons-material';
import { Divider, ListSubheader, ListItem, ListItemIcon, ListItemText } from '@mui/material';

interface Props {
    navigateTo: (url: string) => void;
}

export const AdminPanel:FC<Props> = ({ navigateTo }) => {
  return (
    <>
        <Divider />
        <ListSubheader>Admin Panel</ListSubheader>
        <ListItem
            button
            onClick={() => navigateTo('/admin/')}
        >
            <ListItemIcon>
                <DashboardOutlined/>
            </ListItemIcon>
            <ListItemText primary='Dashboard' />
        </ListItem>
        <ListItem
            button
            onClick={() => navigateTo('/admin/products')}
        >
            <ListItemIcon>
                <CategoryOutlined/>
            </ListItemIcon>
            <ListItemText primary={'Productos'} />
        </ListItem>
        <ListItem
            button
            onClick={() => navigateTo('/admin/orders')}
        >
            <ListItemIcon>
                <ConfirmationNumberOutlined/>
            </ListItemIcon>
            <ListItemText primary='Órdenes' />
        </ListItem>

        <ListItem
            button
            onClick={() => navigateTo('/admin/users')}
        >
            <ListItemIcon>
                <AdminPanelSettings/>
            </ListItemIcon>
            <ListItemText primary='Usuarios' />
        </ListItem>
    </>
  )
}
