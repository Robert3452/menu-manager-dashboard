import { ReactNode, useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Box, Card, Container, Divider, Link, Typography } from "@mui/material";
import { I } from "@/utils/generalObj";
import { useAuth } from "@/hooks/use-auth";
import { AuthBanner } from "@/components/authentication/auth-banner";
import { Logo } from "@/components/logo";
import { GuestGuard } from "@/components/authentication/guest-guard";

const platformIcons: I = {
  Amplify: "/static/icons/amplify.svg",
  Auth0: "/static/icons/auth0.svg",
  Firebase: "/static/icons/firebase.svg",
  JWT: "/static/icons/jwt.svg",
};

const VerifyCode = () => {
  const router = useRouter();
  const { platform } = useAuth();
  const { disableGuard } = router.query;

  useEffect(() => {
    // gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Verify Code | Material Kit Pro</title>
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
        <AuthBanner />
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: "60px",
              md: "120px",
            },
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "grey.900" : "grey.100",
              borderColor: "divider",
              borderRadius: 1,
              borderStyle: "solid",
              borderWidth: 1,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              mb: 4,
              p: 2,
              "& > img": {
                height: 32,
                width: "auto",
                flexGrow: 0,
                flexShrink: 0,
              },
            }}
          >
            <Typography color="textSecondary" variant="caption">
              The app authenticates via {platform}
            </Typography>
            <img alt="Auth platform" src={platformIcons[platform]} />
          </Box>
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
              <Typography variant="h4">Verify Code</Typography>
              <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
                Confirm registration using your verification code
              </Typography>
            </Box>
            <Divider sx={{ my: 3 }} />
            {platform === "Amplify" && (
              <NextLink
                href={
                  disableGuard
                    ? `/authentication/login?disableGuard=${disableGuard}`
                    : "/authentication/login"
                }
                passHref
              >
                <Typography color="textSecondary" variant="body2">
                  Did you not receive the code?
                </Typography>
              </NextLink>
            )}
          </Card>
        </Container>
      </Box>
    </>
  );
};

VerifyCode.getLayout = (page: ReactNode) => <GuestGuard>{page}</GuestGuard>;

export default VerifyCode;
