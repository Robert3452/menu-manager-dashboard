import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  Typography,
  Link,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { storeApi } from "../../../../api/store-api";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import BranchList from "../../../../components/dashboard/store/branches/branch-list";
import { StoreGeneralSettings } from "../../../../components/dashboard/store/store-general-settings";
import { getStore } from "../../../../slices/store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppDispatch, useAppSelector } from "@/store";
import { Store } from "@/api/models/store";

const tabs = [
  { label: "General", value: "general" },
  { label: "Branches", value: "branches" },
  { label: "Team", value: "team" },
];

const StoreIndex = () => {
  const dispatch = useAppDispatch();
  const stores = useAppSelector((state) => state.stores.stores);
  const [currentTab, setCurrentTab] = useState("general");
  const [store, setStore] = useState<Store | null>(null);
  const router = useRouter();

  useEffect(() => {
    const currentId =
      typeof router.query.storeId === "string" ? +router.query.storeId : 0;
    dispatch(getStore(currentId));
  }, []);

  useEffect(() => {
    // console.log(stores)
    // if (store)
    const currentId =
      typeof router.query.storeId === "string" ? +router.query.storeId : 0;

    setStore(stores.byId[currentId]);
  }, [stores]);

  const handleTabsChange = (event: any, value: any) => {
    setCurrentTab(value);
  };

  return (
    <>
      <Head>
        <title>Dashboard: Store | Material Kit Pro</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          {/* <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center"
                        }}

                    > */}
          <NextLink href="/dashboard/stores" passHref>
            <Typography
              color="textPrimary"
              component="a"
              sx={{
                alignItems: "center",
                display: "flex",
                pr: 2,
                pb: 2,
              }}
            >
              <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="subtitle2">Stores</Typography>
            </Typography>
          </NextLink>
          <Typography variant="h4">{store?.name}</Typography>
          {/* </Box> */}
          <Tabs
            indicatorColor="primary"
            onChange={handleTabsChange}
            scrollButtons="auto"
            textColor="primary"
            value={currentTab}
            variant="scrollable"
            sx={{ mt: 3 }}
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
          <Divider sx={{ mb: 3 }} />
          {currentTab === "general" && store && (
            <StoreGeneralSettings store={store} />
          )}
          {currentTab === "branches" && <BranchList />}
          {/* {currentTab === "team" && <AccountTeamSettings />} */}
          {/* {currentTab === 'billing' && <AccountBillingSettings />}
                    {currentTab === 'notifications' && <AccountNotificationsSettings />}
                    {currentTab === 'security' && <AccountSecuritySettings />} */}
        </Container>
      </Box>
    </>
  );
};

StoreIndex.getLayout = (page: ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default StoreIndex;
