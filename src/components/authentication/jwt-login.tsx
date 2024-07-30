import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  TextField,
} from "@mui/material";
import { useAuth } from "../../hooks/use-auth";
import { useMounted } from "@/hooks/use-mounted";
import GoogleLogo from "@/icons/googleg-g-logo";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export const JWTLogin: React.FC<any> = (props) => {
  const isMounted = useMounted();
  const router = useRouter();
  const { loginGoogle, isAuthenticated } = useAuth();
  const query = router.query as { returnUrl: string };
  const { login } = useAuth();
  const [checked, setChecked] = useState<boolean>(false);
  useEffect(() => {
    Cookies.set("auth-intent", "signin");
    // return () => Cookies.remove('auth-intent');
  }, []);
  const formik = useFormik({
    initialValues: {
      email: "romeza1239@gmail.com",
      password: "admin1234",
      keepAlive: false,
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
      keepAlive: Yup.boolean(),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await login(values.email, values.password, values.keepAlive);

        if (isMounted()) {
          const returnUrl: string = query?.returnUrl || "/dashboard";
          router.push(returnUrl);
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          // helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event: React.ChangeEvent<HTMLInputElement>
    formik.setFieldValue("keepAlive", event.target.checked);
    setChecked(event.target.checked);
  };

  return (
    <form noValidate onSubmit={formik.handleSubmit} {...props}>
      <TextField
        autoFocus
        error={Boolean(formik.touched.email && formik.errors.email)}
        fullWidth
        helperText={formik.touched.email && formik.errors.email}
        label="Email Address"
        margin="normal"
        name="email"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="email"
        value={formik.values.email}
      />
      <TextField
        error={Boolean(formik.touched.password && formik.errors.password)}
        fullWidth
        helperText={formik.touched.password && formik.errors.password}
        label="Password"
        margin="normal"
        name="password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="password"
        value={formik.values.password}
      />
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleChange}
              checked={checked}
              name="keepAlive"
            />
          }
          label="Mantenerme conectado"
        />
      </Box>
      {formik.errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>{formik.errors.submit}</FormHelperText>
        </Box>
      )}
      <Box sx={{ mt: 2 }}>
        <Button
          disabled={formik.isSubmitting}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Log In
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button
          disabled={formik.isSubmitting}
          fullWidth
          size="large"
          type="button"
          variant="contained"
          startIcon={<GoogleLogo />}
          onClick={loginGoogle}
          sx={{
            background: (theme) => theme.palette.grey["100"],
            color: (theme) => theme.palette.grey["900"],
            "&:hover": { background: (theme) => theme.palette.grey["400"] },
          }}
        >
          Inicia sesión con Google
        </Button>
      </Box>
    </form>
  );
};
