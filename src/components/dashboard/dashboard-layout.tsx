"use client";
import { getStoreByOwner } from "@/slices/store";
import { useAppDispatch, useAppSelector } from "@/store";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { usePathname, useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { ReactNode, useEffect, useState } from "react";
import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

type DashboardLayoutProps = {
  children: ReactNode;
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = (props) => {
  const { children } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const activeStoreId = useAppSelector((state) => state.stores.activeStoreId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // console.log(activeStoreId);
    if (!activeStoreId) {
      dispatch(getStoreByOwner());
      router.push("/dashboard/my-store");
    }
  }, [pathName, activeStoreId]);

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onOpenSidebar={() => setIsSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setIsSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
