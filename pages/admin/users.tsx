import useSWR from 'swr';
import { PeopleOutline } from '@mui/icons-material';
import { Grid, MenuItem, Select } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { AdminLayout } from '../../components/layouts';
import { IUser } from '../../interfaces';
import { tesloApi } from '../../api';

const UsersPage = () => {
  const { data, error } = useSWR<IUser[]>('/api/admin/users');

  if (!data && !error) return (<></>);

  const onRoleUpdate = async (userId: string, newRole: string) => {
    try {
      await tesloApi.put('/admin/users', { userId, role: newRole });
    } catch (error) {
      console.log(error);
      alert('No se pudo actualizar el role del usuario');
    }
  };

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Correo', width: 250 },
    { field: 'name', headerName: 'Nombre completo', width: 300 },
    {
      field: 'role',
      headerName: 'Rol',
      width: 300,
      renderCell: ({ row }: GridValueGetterParams) => {
        return (
          <Select
            value={row.role}
            label='Rol'
            onChange={({ target }) => onRoleUpdate(row.id, target.value)}
            sx={{ width: '300px' }}
          >
            <MenuItem value='admin'>Admin</MenuItem>
            <MenuItem value='client'>Client</MenuItem>
            <MenuItem value='super-user'>Super User</MenuItem>
            <MenuItem value='seo'>SEO</MenuItem>
          </Select>
        )
      }
    },
  ];

  const rows = data!.map(({ _id, email, name, role }) => ({
    id: _id,
    email,
    name,
    role,
  }));

  return (
    <AdminLayout
      title='Usuarios'
      subTitle='Mantenimiento de usuarios'
      icon={<PeopleOutline />}
    >
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
    </AdminLayout>
  )
};

export default UsersPage;