import { useAuth } from "@/hooks/use-auth";
import { ArrowRight as ArrowRightIcon } from "@/icons/arrow-right";
import { Briefcase as BriefcaseIcon } from "@/icons/briefcase";
import { Download as DownloadIcon } from "@/icons/download";
import { ExternalLink as ExternalLinkIcon } from "@/icons/external-link";
import { InformationCircleOutlined as InformationCircleOutlinedIcon } from "@/icons/information-circle-outlined";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import { OverviewBanner } from "../../components/dashboard/overview/overview-banner";

const Overview = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storeState = useAppSelector((state) => state.stores.stores);
  const auth = useAuth();
  const [displayBanner, setDisplayBanner] = useState(true);

  useEffect(() => {
    // Restore the persistent state from local/session storage
    const value = globalThis.sessionStorage.getItem("dismiss-banner");

    if (value === "true") {
      // setDisplayBanner(false);
    }
  }, []);

  const handleDismissBanner = () => {
    // Update the persistent state
    // globalThis.sessionStorage.setItem('dismiss-banner', 'true');
    setDisplayBanner(false);
  };
  useEffect(() => {
    if (storeState.allIds.length === 0) {
      // router.push("/store")
    }
  }, [storeState]);
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <OverviewBanner onDismiss={handleDismissBanner} />
          </Grid>
          <Grid item md={6} xs={12}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <BriefcaseIcon color="primary" fontSize="small" />
                  <Typography
                    color="primary.main"
                    sx={{ pl: 1 }}
                    variant="subtitle2"
                  >
                    Tienda
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Personaliza tu tienda
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  Crea tu propia identidad y registra todos los detalles sobre
                  tu tienda aquí.
                </Typography>
              </CardContent>
              <Divider />
              <CardActions>
                <Button
                  endIcon={<ArrowRightIcon fontSize="small" />}
                  size="small"
                >
                  Ir a mi tienda
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item md={6} xs={12}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <InformationCircleOutlinedIcon color="primary" />
                  <Typography
                    color="primary.main"
                    sx={{ pl: 1 }}
                    variant="subtitle2"
                  >
                    Menú
                  </Typography>
                </Box>
                <Typography sx={{ mt: 2 }} variant="h6">
                  Crea tu propio menu
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  Aquí en Tinkfood puedes crear tu menú virtual y hacer de que
                  las órdenes lleguen desde sus dispositivos hasta tu cocina.
                </Typography>
              </CardContent>
              <Divider />
              <CardActions>
                <Button
                  endIcon={<ExternalLinkIcon fontSize="small" />}
                  size="small"
                >
                  Ir a mi menú
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item md={6} xs={12}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <DownloadIcon color="primary" />
                  <Typography
                    color="primary.main"
                    sx={{ pl: 1 }}
                    variant="subtitle2"
                  >
                    Vista en tiempo real
                  </Typography>
                </Box>
                <Typography sx={{ mt: 2 }} variant="h6">
                  Comparte tu menú
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  Puedes ver tu menú en el QR y uri generado una vez termines de
                  crear tu menú virtual.
                </Typography>
              </CardContent>
              <Divider />
              <CardActions>
                <Button
                  endIcon={<DownloadIcon fontSize="small" />}
                  size="small"
                  variant="outlined"
                >
                  Ver QR
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

Overview.getLayout = (page: ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Overview;
