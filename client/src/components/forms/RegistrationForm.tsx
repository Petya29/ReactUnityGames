import { Avatar, Box, Button, Card, CardContent, CircularProgress, Grid, Link, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as routerLink } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useRegistrationForm } from "../../validation/registration-form";
import { useFormik } from "formik";

export const RegistrationForm = () => {

    const { t } = useTranslation();

    const { registrationInitialValues, registrationValidationSchema, onSubmit } = useRegistrationForm();

    const formik = useFormik({
      initialValues: registrationInitialValues,
      validationSchema: registrationValidationSchema,
      onSubmit: onSubmit
    });

    return (
        <div className="text-white">
            <Card sx={{ maxWidth: '540px' }}>
                <CardContent>
                    <Avatar sx={{ m: 'auto', bgcolor: '#1976d2' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
                        {t('Sign Up')}
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin='normal'
                            fullWidth
                            id="nickname"
                            name="nickname"
                            label={t("nickname")}
                            value={formik.values.nickname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.nickname && Boolean(formik.errors.nickname)}
                            helperText={formik.touched.nickname && formik.errors.nickname}
                        />
                        <TextField
                            margin='normal'
                            fullWidth
                            id="email"
                            name="email"
                            label={t("email")}
                            autoComplete="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            margin='normal'
                            fullWidth
                            id="password"
                            name="password"
                            label={t("password")}
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <TextField
                            margin='normal'
                            fullWidth
                            id="confirmPassword"
                            name="confirmPassword"
                            label={t("password confirmation")}
                            type="password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={formik.isSubmitting}
                            endIcon={
                                formik.isSubmitting
                                    ?
                                    <CircularProgress color='inherit' size={'1rem'} />
                                    :
                                    undefined
                            }
                        >
                            {t('Sign Up')}
                        </Button>
                        <Grid container>
                            <Grid item xs />
                            <Grid item>
                                <Link component={routerLink} to="/login" variant="body2">
                                    {t("Already have an account? Log in")}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </div>
    )
}
