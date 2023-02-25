import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { useLoginForm } from "../../validation/login-form";
import { LockIcon } from "../ui/icons";
import { Button, TextField } from "../ui/inputs";
import { Paper } from "../ui/surfaces";

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
      <Paper className="!p-4 w-[520px]">
        <div className="flex flex-col items-center text-xl font-bold">
          <LockIcon
            className="bg-[#d200fa] rounded-full p-1"
            size="lg"
            disableRipple
            isHoverable={false}
          />
          {t("Sign in")}
        </div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-full mt-4">
          <TextField
            id="email"
            name="email"
            className="!w-full"
            label="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextField
            name="password"
            type="password"
            id="password"
            className="!w-full"
            label="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Button type="submit" disabled={formik.isSubmitting}>{t("Sign in")}</Button>
        </form>
      </Paper>
    </div>
  )
}
