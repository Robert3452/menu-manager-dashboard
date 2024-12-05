import { GuestGuard } from "@/components/authentication/guest-guard";
import { JWTLogin } from "@/components/authentication/jwt-login";
import { Logo } from "@/components/logo";
import { useAuth } from "@/hooks/use-auth";
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

const platformIcons: I = {
  Amplify: "/static/icons/amplify.svg",
  Auth0: "/static/icons/auth0.svg",
  Firebase: "/static/icons/firebase.svg",
  JWT: "/static/icons/jwt.svg",
};

const Login = () => {
  const router = useRouter();
  const { platform } = useAuth();
  const { disableGuard } = router.query;

  useEffect(() => {
    // gtm.push({ event@: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Login | Material Kit Pro</title>
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
              <Typography variant="h4">Log in</Typography>
              <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
                Sign in on the internal platform
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              {/* {platform === 'Amplify' && <AmplifyLogin />} */}
              {/* {platform === 'Auth0' && <Auth0Login />} */}
              {/* {platform === 'Firebase' && <FirebaseLogin />} */}
              {/* {platform === "JWT" && <JWTLogin />} */}
              <JWTLogin />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Grid container>
              <Grid
                item
                xs={12}
                md={6}
                display="flex"
                justifyContent={"flex-start"}
                >
                <NextLink
                  href={
                    disableGuard
                      ? `/authentication/register?disableGuard=${disableGuard}`
                      : "/authentication/register"
                  }
                  passHref
                >
                  <Typography color="textSecondary" variant="body2">
                    Registrarme
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

Login.getLayout = (page: ReactNode) => <GuestGuard>{page}</GuestGuard>;

export default Login;
