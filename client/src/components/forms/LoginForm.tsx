import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { useLoginForm } from "../../validation/login-form";
import { Link as routerLink } from 'react-router-dom';
import { Avatar, Box, Button, Card, CardContent, CircularProgress, Grid, Link, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export const LoginForm = () => {

  const { t } = useTranslation();

  const { loginInitialValues, loginValidationSchema, onSubmit } = useLoginForm();

  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: onSubmit
  });

  return (
    <div className="text-white">
      <Card sx={{ maxWidth: '540px' }}>
        <CardContent>
          <Avatar sx={{ m: 'auto', bgcolor: '#1976d2', zIndex: 999 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
            {t('Log in')}
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
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
              margin="normal"
              fullWidth
              name="password"
              label={t("password")}
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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
              {t('Log in')}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link component={routerLink} to="/forgot-password" variant="body2">
                  {t('Forgot password?')}
                </Link>
              </Grid>
              <Grid item>
                <Link component={routerLink} to="/registration" variant="body2">
                  {t("Don't have an account? Sign Up")}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}
