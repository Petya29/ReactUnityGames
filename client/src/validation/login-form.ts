import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { FormikHelpers } from "formik";
import { login } from "../store/slices/authSlice";
import { i18n } from "../lib";
import { setSnackbar } from "../store/slices/utilsSlice";

interface LoginFormFields {
    email: string,
    password: string
}

export function useLoginForm() {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { user } = useAppSelector(state => state.auth);

    const loginInitialValues: LoginFormFields = {
        email: '',
        password: ''
    }

    const loginValidationSchema = yup.object({
        email: yup
            .string()
            .trim()
            .email(t('Enter a valid email') as string)
            .required(t('Email is required') as string),
        password: yup
            .string()
            .trim()
            .min(8, t('Password must be at least 8 and no more than 32 characters') as string)
            .max(32, t('Password must be at least 8 and no more than 32 characters') as string)
            .required(t('Password is required') as string)
    });

    const onSubmit = async (values: LoginFormFields, onSubmitProps: FormikHelpers<LoginFormFields>): Promise<void> => {
        await dispatch(login({ email: values.email.toLowerCase(), password: values.password }))
            .unwrap()
            .then((originalPromiseResult) => {
                i18n.changeLanguage(originalPromiseResult.user.lang);
                localStorage.setItem('lang', originalPromiseResult.user.lang);
                navigate('/news');
            })
            .catch((error) => {
                if (error === 'Unexpected error') {
                    dispatch(setSnackbar({
                        open: true,
                        severity: 'error',
                        text: 'Unexpected error'
                    }));
                } else if (error.param) {
                    onSubmitProps.setErrors({ [error.param]: error.msg });
                }
            });
    }

    return {
        loginInitialValues,
        loginValidationSchema,
        onSubmit
    }
}