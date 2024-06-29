import { Home as HomeIcon } from "@/icons/home";
import { Selector as SelectorIcon } from "@/icons/selector";
import { ShoppingBag as ShoppingBagIcon } from "@/icons/shopping-bag";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import GradingIcon from '@mui/icons-material/Grading';
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Logo } from "../logo";
// import { Scrollbar } from '../scrollbar';
import { QrCode2 } from "@mui/icons-material";
import { Scrollbar } from "../scrollbar";
import { DashboardSidebarSection } from "./dashboard-sidebar-section";
import { OrganizationPopover } from "./organization-popover";

const getSections = (t: any) => [
  {
    title: t("General"),
    items: [
      {
        title: t("Inicio"),
        path: "/dashboard",
        icon: <HomeIcon fontSize="small" />,
      },
      {
        title: t("Mi tienda"),
        path: "/my-store",
        icon: <StoreMallDirectoryIcon fontSize="small" />,
      },
      {
        title: t("Mi menú"),
        path: "/products",
        icon: <ShoppingBagIcon fontSize="small" />,
      },
      {
        title: t("Presentación"),
        path: "/landing-page",
        icon: <CoPresentIcon fontSize="small" />,
      },
      {
        title: t("Mi código QR"),
        path: "/qr-view",
        icon: <QrCode2 fontSize="small" />,
      },
    ],
  },
  
  {
    title: t("Administrar"),
    items: [
      {
        title: t("Pedidos"),
        icon: <GradingIcon fontSize="small" />,
        path: "/dashboard/orders",
        children: [
          {
            title: t("List"),
            path: "/dashboard/orders",
          },
          {
            title: t("Details"),
            path: "/dashboard/orders/1",
          },
        ],
      },
    ],
  },
 
 
];
type DashboardSidebarProps = {
  onClose: any;
  open: boolean;
};
export const DashboardSidebar: React.FC<DashboardSidebarProps> = (props) => {
  const { onClose, open } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"), {
    noSsr: true,
  });
  const sections = useMemo(() => getSections(t), [t]);
  const organizationsRef = useRef(null);
  const [openOrganizationsPopover, setOpenOrganizationsPopover] =
    useState(false);

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  };

  useEffect(
    handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath]
  );

  const handleOpenOrganizationsPopover = () => {
    setOpenOrganizationsPopover(true);
  };

  const handleCloseOrganizationsPopover = () => {
    setOpenOrganizationsPopover(false);
  };

  const content = (
    <>
      <Scrollbar
        sx={{
          height: "100%",
          "& .simplebar-content": {
            height: "100%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div>
            <Box sx={{ p: 3, width: "100%" }}>
              <NextLink href="/" passHref>
                {/* <a> */}
                <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                />
                {/* </a> */}
              </NextLink>
            </Box>
            <Box sx={{ px: 2 }}>
              <Box
                onClick={handleOpenOrganizationsPopover}
                ref={organizationsRef}
                sx={{
                  alignItems: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  px: 3,
                  py: "11px",
                  borderRadius: 1,
                }}
              >
                <div>
                  <Typography color="inherit" variant="subtitle1">
                    Acme Inc
                  </Typography>
                  <Typography color="grey.400" variant="body2">
                    {t("Your tier")} : Premium
                  </Typography>
                </div>
                <SelectorIcon
                  sx={{
                    color: "grey.500",
                    width: 14,
                    height: 14,
                  }}
                />
              </Box>
            </Box>
          </div>
          <Divider
            sx={{
              borderColor: "#2D3748",
              my: 3,
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            {sections.map((section) => (
              <DashboardSidebarSection
                key={section.title}
                path={router.asPath}
                sx={{
                  mt: 2,
                }}
                {...section}
              />
            ))}
          </Box>
          <Divider
            sx={{
              borderColor: "#2D3748", // dark divider
            }}
          />
          <Box sx={{ p: 2 }}>
            <Typography color="grey.100" variant="subtitle2">
              {t("Need Help?")}
            </Typography>
            <Typography color="grey.500" variant="body2">
              {t("Check our docs")}
            </Typography>
            <NextLink href="/docs/welcome" passHref>
              <Button
                color="secondary"
                component="a"
                fullWidth
                sx={{ mt: 2 }}
                variant="contained"
              >
                {t("Documentation")}
              </Button>
            </NextLink>
          </Box>
        </Box>
      </Scrollbar>
      <OrganizationPopover
        anchorEl={organizationsRef.current}
        onClose={handleCloseOrganizationsPopover}
        open={openOrganizationsPopover}
      />
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "grey.900",
            borderRightColor: "divider",
            borderRightStyle: "solid",
            borderRightWidth: (theme) =>
              theme.palette.mode === "dark" ? 1 : 0,
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "grey.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
