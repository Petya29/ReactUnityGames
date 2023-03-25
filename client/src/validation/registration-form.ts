import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { FormikHelpers } from "formik";
import { registration } from "../store/slices/authSlice";
import i18next from "i18next";
import { setSnackbar } from "../store/slices/utilsSlice";
import { i18n } from "../lib";

interface RegistrationFormFields {
    nickname: string,
    email: string,
    password: string,
    confirmPassword: string
}

export function useRegistrationForm() {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const registrationInitialValues: RegistrationFormFields = {
        nickname: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const registrationValidationSchema = yup.object({
        nickname: yup
            .string()
            .trim()
            .min(4, t('Nickname must be at least 4 and no more than 32 characters') as string)
            .max(32, t('Nickname must be at least 4 and no more than 32 characters') as string),
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
            .required(t('Password is required') as string),
        confirmPassword: yup
            .string()
            .trim()
            .oneOf([yup.ref('password'), null], t('Password must match') as string)
            .required(t('Password must match') as string),
    });

    const onSubmit = async (values: RegistrationFormFields, onSubmitProps: FormikHelpers<RegistrationFormFields>): Promise<void> => {
        const region = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[0];

        await dispatch(registration({
            nickname: values.nickname,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
            region: region,
            lang: i18next.language
        }))
            .unwrap()
            .then(originalPromiseResult => {
                i18n.changeLanguage(originalPromiseResult.user.lang);
                localStorage.setItem('lang', originalPromiseResult.user.lang);
                localStorage.setItem('region', originalPromiseResult.user.region);
                navigate('/');
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
        registrationInitialValues,
        registrationValidationSchema,
        onSubmit
    }
}