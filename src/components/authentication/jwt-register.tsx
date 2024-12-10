"use client";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  TextField,
  Typography,
  Link,
  Grid,
} from "@mui/material";
import { useAuth } from "../../hooks/use-auth";
import { useMounted } from "../../hooks/use-mounted";
import GoogleLogo from "@/icons/googleg-g-logo";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { CreateUserDto } from "@/api/auth/auth-api";
export const JWTRegister: React.FC<any> = (props) => {
  const isMounted = useMounted();
  const router = useRouter();
  const query = router.query as { returnUrl: string };
  const { register, loginGoogle } = useAuth();
  useEffect(() => {
    Cookies.set("auth-intent", "signup");
    // return () => Cookies.remove('auth-intent');
  }, []);
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
      password: "",
      policy: false,
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      firstName: Yup.string().max(255).required("Name is required"),
      password: Yup.string().min(7).max(255).required("Password is required"),
      confirmPassword: Yup.string()
        .min(7)
        .max(255)
        .required("Passwords don't match"),
      policy: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await register({
          email: values.email,
          firstName: values.firstName,
          lastname: values.lastName,
          password: values.password,
          repeatPassword: values.confirmPassword,
          roleId: 8,
        });

        if (isMounted()) {
          const returnUrl = query.returnUrl || "/dashboard";
          router.push(returnUrl);
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setSubmitting(false);
        }
      }
    },
  });
  useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors]);

  return (
    <form noValidate onSubmit={formik.handleSubmit} {...props}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            error={Boolean(formik.touched.firstName && formik.errors.firstName)}
            fullWidth
            helperText={formik.touched.firstName && formik.errors.firstName}
            label="Nombres"
            margin="normal"
            name="firstName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            error={Boolean(formik.touched.lastName && formik.errors.lastName)}
            fullWidth
            helperText={formik.touched.lastName && formik.errors.lastName}
            label="Apellidos"
            margin="normal"
            name="lastName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={Boolean(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label="Correo electrónico"
            margin="normal"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
          />
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={Boolean(
              formik.touched.confirmPassword && formik.errors.confirmPassword
            )}
            fullWidth
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            label="Confirm Password"
            margin="normal"
            name="confirmPassword"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.confirmPassword}
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          ml: -1,
          mt: 2,
        }}
      >
        <Checkbox
          checked={formik.values.policy}
          name="policy"
          onChange={formik.handleChange}
        />
        <Typography color="textSecondary" variant="body2">
          I have read the{" "}
          <Link component="a" href="#">
            Terms and Conditions
          </Link>
        </Typography>
      </Box>
      {Boolean(formik.touched.policy && formik.errors.policy) && (
        <FormHelperText error>{formik.errors.policy}</FormHelperText>
      )}
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
          Register
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
            color: (theme) => theme.palette.grey["900"],
            background: (theme) => theme.palette.grey["100"],
            "&:hover": { background: (theme) => theme.palette.grey["400"] },
          }}
        >
          Regístrate con Google
        </Button>
      </Box>
    </form>
  );
};
