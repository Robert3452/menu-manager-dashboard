import React from "react";
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

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppDispatch, useAppSelector } from "@/store";
import { Store } from "@/api/models/store";
import { getStore, getStoreByOwner } from "@/slices/store";
import { StoreGeneralSettings } from "@/components/dashboard/store/store-general-settings";
import BranchList from "@/components/dashboard/store/branches/branch-list";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { json } from "stream/consumers";
import AddressBranchForm from "@/components/dashboard/branch/address-branch-form";
import ScheduleBranchForm from "@/components/dashboard/branch/schedules-branch-form";
import MenuBoard from "@/components/dashboard/corridors/menu-board";
interface ITabStore {
  label: string;
  value: string;
  disabled: boolean;
}
const tabs: ITabStore[] = [
  { label: "General", value: "general", disabled: false },
  { label: "Address", value: "address", disabled: true },
  { label: "Schedule", value: "schedule", disabled: true },
  { label: "Menu", value: "menu", disabled: true },
  //   { label: "Team", value: "team", disabled: false },
];

const StoreIndex = () => {
  const dispatch = useAppDispatch();
  const [tabsState, setTabsState] = useState<ITabStore[]>(tabs);
  const stores = useAppSelector((state) => state.stores.stores);
  const [currentTab, setCurrentTab] = useState("general");
  //   const [store, setStore] = useState<Store | null>(null);
  const store = stores.byId[stores.allIds[0]];
  const branch = stores.byId[stores.allIds[0]]?.branches?.[0];
  useEffect(() => {
    dispatch(getStoreByOwner());
  }, []);
  useEffect(() => {
    // const currStore = stores.byId[stores.allIds[0]];
    // if (currStore) setStore(currStore);
    const currTabs = tabsState;

    // let indexFound = currTabs.findIndex((el) => el.label === "Branches");
    setTabsState(
      currTabs
        // .filter((el) => el.value !== "general")
        .map((el) =>
          el.value === "general"
            ? el
            : { ...el, disabled: !store ? true : false }
        )
    );
    // if (indexFound < 0) return;
    // currTabs[indexFound].disabled = !currStore ? true : false;
    // setTabsState(currTabs);
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
          <Tabs
            indicatorColor="primary"
            onChange={handleTabsChange}
            scrollButtons="auto"
            textColor="primary"
            value={currentTab}
            variant="scrollable"
            sx={{ mt: 3 }}
          >
            {tabsState.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
                disabled={tab.disabled}
              />
            ))}
          </Tabs>
          <Divider sx={{ mb: 3 }} />
          {currentTab === "general" && <StoreGeneralSettings store={store} />}
          {currentTab === "address" && <AddressBranchForm branch={branch} />}
          {currentTab === "schedule" && <ScheduleBranchForm />}
          {currentTab === "menu" && branch && <MenuBoard branch={branch} />}
        </Container>
      </Box>
    </>
  );
};

StoreIndex.getLayout = (page: ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default StoreIndex;
