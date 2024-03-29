import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { AccountCircleOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from '@mui/icons-material';

import { AuthContext, UiContext } from '../../context';
import { AdminPanel } from './AdminPanel';


export const SideMenu = () => {
    const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
    const { isLoggedIn, user, logout } = useContext(AuthContext);
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState('');

    const onSearchTerm = () => {
        if(searchTerm.trim().length === 0) return;

        navigateTo(`/search/${searchTerm}`);
    }

    const navigateTo = (url: string) => {
        router.push(url);
        toggleSideMenu();
    }

    return (
        <Drawer
            open={ isMenuOpen }
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
            onClose={toggleSideMenu}
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>
                <List>
                    <ListItem>
                        <Input
                            autoFocus
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' ? onSearchTerm() : null}
                            type='text'
                            placeholder='Buscar...'
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        onClick={onSearchTerm}
                                    >
                                    <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>

                    {
                        isLoggedIn && (
                            <>
                                <ListItem button>
                                    <ListItemIcon>
                                        <AccountCircleOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary='Perfil' />
                                </ListItem>

                                <ListItem
                                    button
                                    onClick={() => navigateTo('/orders/history')}
                                >
                                    <ListItemIcon>
                                        <ConfirmationNumberOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary='Mis Órdenes' />
                                </ListItem>
                            </>
                        )
                    }


                    <ListItem
                        onClick={() => navigateTo('/category/men')}
                        button
                        sx={{ display: { xs: '', sm: 'none' } }}
                    >
                        <ListItemIcon>
                            <MaleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Hombres'} />
                    </ListItem>

                    <ListItem
                        onClick={() => navigateTo('/category/women')}
                        button
                        sx={{ display: { xs: '', sm: 'none' } }}
                    >
                        <ListItemIcon>
                            <FemaleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Mujeres'} />
                    </ListItem>

                    <ListItem
                        onClick={() => navigateTo('/category/kid')}
                        button
                        sx={{ display: { xs: '', sm: 'none' } }}
                    >
                        <ListItemIcon>
                            <EscalatorWarningOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Niños'} />
                    </ListItem>

                    {
                        isLoggedIn
                            ? (
                                <ListItem button onClick={logout}>
                                    <ListItemIcon>
                                        <LoginOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary='Salir' />
                                </ListItem>
                            )
                            : (
                                <ListItem
                                    button
                                    onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
                                >
                                    <ListItemIcon>
                                        <VpnKeyOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary='Ingresar' />
                                </ListItem>
                            )
                    }

                    {/* Admin */}
                    {
                        user?.role === 'admin' && (
                            <AdminPanel navigateTo={navigateTo} />
                        )
                    }
                </List>
            </Box>
        </Drawer>
    )
};
