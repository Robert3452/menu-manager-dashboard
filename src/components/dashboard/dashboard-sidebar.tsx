import { Home as HomeIcon } from "@/icons/home";
import { Selector as SelectorIcon } from "@/icons/selector";
import { ShoppingBag as ShoppingBagIcon } from "@/icons/shopping-bag";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import GradingIcon from "@mui/icons-material/Grading";
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
        path: "/landing-page",
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
          {/* <Box sx={{ p: 2 }}>
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
          </Box> */}
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
