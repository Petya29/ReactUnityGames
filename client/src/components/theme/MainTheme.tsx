import { Fragment, ReactNode, useMemo } from "react";
import { Alert, Box, createTheme, CssBaseline, Slide, SlideProps, Snackbar, ThemeProvider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Mode } from "../../models/entities";
import { NavBar } from "../partials/NavBar";
import { setSnackbar } from "../../store/slices/utilsSlice";

const isPrefersDarkMode = () => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

const defineMode = (mode: Mode | undefined) => {
    if (mode !== undefined) return mode;
    return isPrefersDarkMode() ? 'dark' : 'light';
}

type TransitionProps = Omit<SlideProps, 'direction'>;
const TransitionRight = (props: TransitionProps) => {
    return <Slide {...props} direction="left" />;
}

type MainThemeProps = {
    children: ReactNode
}

export const MainTheme = ({ children }: MainThemeProps) => {

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const { mode, snackbar } = useAppSelector(state => state.utils);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: defineMode(mode),
                    background: {
                        default: defineMode(mode) === 'light' ? '#fafaf3 !important' : '#121212 !important' // '#ecf0f1b0' - light grey
                    }
                },
                components: {
                    MuiCssBaseline: {
                        styleOverrides: {
                            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                                backgroundColor: "transparent"
                            },
                            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                                borderRadius: 8,
                                backgroundColor: defineMode(mode) === 'light' ? '#959595' : "#6b6b6b",
                                minHeight: 24,
                                border: defineMode(mode) === 'light' ? '3px solid #ffffff' : '3px solid #121212'
                            },
                            "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
                                backgroundColor: defineMode(mode) === 'light' ? '#b2b2b2' : "#959595"
                            },
                            "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
                                backgroundColor: defineMode(mode) === 'light' ? '#b2b2b2' : "#959595"
                            },
                            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
                                backgroundColor: defineMode(mode) === 'light' ? '#b2b2b2' : "#959595"
                            }
                        }
                    }
                }
            }),
        [mode]
    );

    const snackbarCloseHandle = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setSnackbar({ ...snackbar, open: false }));
    }

    return (
        <ThemeProvider theme={theme}>
            <Fragment>
                <CssBaseline />
                <NavBar />
                <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={snackbar.open}
                        autoHideDuration={2500}
                        onClose={snackbarCloseHandle}
                        TransitionComponent={TransitionRight}
                        sx={{ display: snackbar.open ? 'flex' : 'none' }}
                    >
                        <Alert onClose={snackbarCloseHandle} severity={snackbar.severity} sx={{ width: '100%' }}>
                            {t(snackbar.text)}
                        </Alert>
                    </Snackbar>
                    {children}
                </Box>
            </Fragment>
        </ThemeProvider>
    )
}
