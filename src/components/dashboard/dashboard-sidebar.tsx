import { Home as HomeIcon } from "@/icons/home";
import { ShoppingBag as ShoppingBagIcon } from "@/icons/shopping-bag";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import GradingIcon from "@mui/icons-material/Grading";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import { Box, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
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
import { useAuth } from "@/hooks/use-auth";
import { I } from "@/utils/generalObj";

const getSections = (t: any, role: string = "Customer") => {
  const sidebarMenus: I = {
    Customer: [
      {
        title: t("Mi tienda"),
        items: [
          {
            title: t("Inicio"),
            path: "/dashboard/my-store",
            icon: <StoreMallDirectoryIcon fontSize="small" />,
          },
          {
            title: t("Mi menú"),
            path: "/dashboard/menu",
            icon: <ShoppingBagIcon fontSize="small" />,
          },
          {
            title: t("Presentación"),
            path: "/dashboard/landing-page",
            icon: <CoPresentIcon fontSize="small" />,
          },
        ],
      },
      {
        title: t("Pedidos"),
        items: [
          {
            title: t("Lista de pedidos"),
            icon: <GradingIcon fontSize="small" />,
            path: "/dashboard/orders",
          }
        ],
      },
    ],
    Administrator: [
      {
        title: t("Administrator - Inicio"),
        items: [
          {
            title: t("Inicio"),
            path: "/dashboard",
            icon: <HomeIcon fontSize="small" />,
          },
          {
            title: t("Usuarios"),
            path: "/dashboard/my-store",
            icon: <StoreMallDirectoryIcon fontSize="small" />,
          },
          {
            title: t("Mi menú"),
            path: "/dashboard/menu",
            icon: <ShoppingBagIcon fontSize="small" />,
          },
          {
            title: t("Presentación"),
            path: "/dashboard/landing-page",
            icon: <CoPresentIcon fontSize="small" />,
          },
          {
            title: t("Mi código QR"),
            path: "/dashboard/qr",
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
    ],
  };
  return sidebarMenus[role];
};
type DashboardSidebarProps = {
  onClose: any;
  open: boolean;
};
export const DashboardSidebar: React.FC<DashboardSidebarProps> = (props) => {
  const { onClose, open } = props;
  const auth = useAuth();
  const router = useRouter();
  const { t } = useTranslation();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"), {
    noSsr: true,
  });
  const sections = useMemo(() => {
    return getSections(t, auth.user?.role.name);
  }, [t, auth]);
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                px: 3,
                py: 2,
                width: "100%",
              }}
            >
              <NextLink href="/" passHref>
                <Logo
                  sx={{
                    height: "100%",
                    width: "100%",
                    pr: 2,
                  }}
                />
              </NextLink>
              <Box>
                <Typography variant="subtitle2">TinkFood</Typography>
              </Box>
            </Box>
          </div>
          <Box sx={{ flexGrow: 1 }}>
            {sections.map((section: any) => (
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
            color: "#FAFAFA",
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
          color: "#FAFAFA",
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
