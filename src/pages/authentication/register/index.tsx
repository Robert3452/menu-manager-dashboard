"use client";

import { I } from "@/utils/generalObj";
import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  Typography
} from "@mui/material";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { GuestGuard } from "../../../components/authentication/guest-guard";
import { JWTRegister } from "../../../components/authentication/jwt-register";
import { Logo } from "../../../components/logo";
import { useAuth } from "../../../hooks/use-auth";
import { gtm } from "../../../lib/gtm";

const platformIcons: I = {
  Amplify: "/static/icons/amplify.svg",
  Auth0: "/static/icons/auth0.svg",
  Firebase: "/static/icons/firebase.svg",
  JWT: "/static/icons/jwt.svg",
};

const Register = () => {
  const router = useRouter();
  const { platform } = useAuth();
  const { disableGuard } = router.query;

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Register | Material Kit Pro</title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* <AuthBanner /> */}
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: "60px",
              md: "120px",
            },
          }}
        >
          <Card elevation={16} sx={{ p: 4 }}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <NextLink href="/" passHref>
                {/* <a> */}
                <Logo
                  sx={{
                    height: 40,
                    width: 40,
                  }}
                />
                {/* </a> */}
              </NextLink>
              <Typography variant="h4">Register</Typography>
              <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
                Register on the internal platform
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              {platform === "JWT" && <JWTRegister />}
            </Box>
            <Divider sx={{ my: 3 }} />
            <Grid container>
              <Grid item xs={12} md={6}>
                <NextLink
                  href={
                    disableGuard
                      ? `/authentication/login?disableGuard=${disableGuard}`
                      : "/authentication/login"
                  }
                  passHref
                >
                  <Typography color="textSecondary" variant="body2">
                    Tengo una cuenta
                  </Typography>
                </NextLink>
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
                display="flex"
                justifyContent={"flex-end"}
              >
                <NextLink href={`/`} passHref>
                  <Typography color="textSecondary" variant="body2">
                    Volver al inicio
                  </Typography>
                </NextLink>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Register.getLayout = (page: ReactNode) => <GuestGuard>{page}</GuestGuard>;

export default Register;
