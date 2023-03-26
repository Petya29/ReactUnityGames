import { useEffect, useState } from "react";
import { AppBar, Box, FormControl, MenuItem, Select, SelectChangeEvent, Stack, Toolbar, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Lang } from "../../models/entities";
import { useLocalStorage } from "../../hooks/use-local-storage";
import { i18n } from "../../lib";
import { editUser, logout } from "../../store/slices/authSlice";
import { setSnackbar } from "../../store/slices/utilsSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { resetGameSlice } from "../../store/slices/gameSlice";

export const NavBar = () => {

    const { t } = useTranslation();

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { isAuth, user } = useAppSelector(state => state.auth);

    const [storageLanguage, setStorageLanguage] = useLocalStorage<keyof typeof Lang>('lang', "en");

    const [currentLanguage, setCurrentLanguage] = useState<keyof typeof Lang>(isAuth ? user.lang : storageLanguage);

    const handleChangeLanguage = (event: SelectChangeEvent) => {
        const newLang = event.target.value as Lang;
        i18n.changeLanguage(newLang).then(() => {
            if (isAuth) {
                dispatch(editUser({ lang: newLang }));
            }
            setCurrentLanguage(newLang);
            setStorageLanguage(newLang);
        });
    }

    const handleClickLogout = () => {
        dispatch(logout())
            .unwrap()
            .then((originalPromiseResult) => {
                if (originalPromiseResult) {
                    dispatch(resetGameSlice());
                    navigate('/');
                }
            })
            .catch((originalPromiseResult) => {
                if (originalPromiseResult === 'Unexpected error') {
                    dispatch(setSnackbar({
                        open: true,
                        severity: 'error',
                        text: 'Unexpected error'
                    }));
                }
            });
    }

    useEffect(() => {
        if (isAuth) {
            setCurrentLanguage(user.lang);
        }
    }, [isAuth]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky" sx={{ zIndex: 1100 }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography
                        component={NavLink}
                        to='/'
                        variant="h4"
                        sx={{
                            display: 'flex',
                            mr: 2,
                            cursor: 'pointer'
                        }}
                    >
                        SiteName
                    </Typography>
                    <Stack direction='row' sx={{ display: { xs: 'none', md: 'flex' }, gap: '60px' }}>
                        <Typography
                            component={NavLink}
                            to='/'
                            variant="h6"
                            sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}
                        >
                            {t('Home')}
                        </Typography>
                        <Typography
                            component={NavLink}
                            to='/games'
                            variant="h6"
                            sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}
                        >
                            {t('Games')}
                        </Typography>
                        <Typography
                            component={NavLink}
                            to='/news'
                            variant="h6"
                            sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}
                        >
                            {t('News')}
                        </Typography>
                    </Stack>
                    <Stack direction='row'>
                        <FormControl sx={{ display: { xs: 'none', md: 'inline-flex' }, mr: '10px' }}>
                            <Select
                                value={currentLanguage}
                                onChange={handleChangeLanguage}
                                variant='standard'
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value={'en'}>{t('English')}</MenuItem>
                                <MenuItem value={'pl'}>{t('Polish')}</MenuItem>
                                <MenuItem value={'ua'}>{t('Ukrainian')}</MenuItem>
                            </Select>
                        </FormControl>
                        {isAuth
                            ?
                            <Box
                                color="inherit"
                                sx={{ cursor: 'pointer' }}
                                onClick={handleClickLogout}
                            >
                                <Typography variant="h6">
                                    {t('Logout')}
                                </Typography>
                            </Box>
                            :
                            <Box sx={{ display: 'flex', gap: '10px' }}>
                                <NavLink to='/login'>
                                    <Typography variant="h6">
                                        {t('Log in')}
                                    </Typography>
                                </NavLink>
                                <NavLink to='/registration'>
                                    <Typography variant="h6">
                                        {t('Sign up')}
                                    </Typography>
                                </NavLink>
                            </Box>
                        }
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box >
    )
}
