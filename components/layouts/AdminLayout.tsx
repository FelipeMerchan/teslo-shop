import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import { SideMenu } from '../ui';
import { AdminNavbar } from '../admin/AdminNavbar';

interface Props {
    children: React.ReactNode;
    icon?: JSX.Element;
    subTitle: string;
    title: string;
}

export const AdminLayout:FC<Props> = ({ children, icon, subTitle, title }) => {
  return (
    <>
        <nav>
            <AdminNavbar />
        </nav>
        <SideMenu />
        <main style={{
            margin: '80px auto',
            maxWidth: '1440px',
            padding: '0px 30px',
        }}>
            <Box display='flex' flexDirection='column' sx={{ mb: 2 }}>
              <Typography variant='h1' component='h1'>
                {icon}
                {title}
              </Typography>
              <Typography variant='h2' sx={{ mb: 1 }}>
                {subTitle}
              </Typography>
            </Box>

            <Box className='fadeIn'>
              {children}
            </Box>
        </main>
    </>
  )
};
