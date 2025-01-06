import { Box, Container, Divider, Tab, Tabs, Typography } from "@mui/material";
import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";
import AddressBranchForm from "@/components/dashboard/branch/address-branch-form";
import ScheduleBranchForm from "@/components/dashboard/branch/schedules-branch-form";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { StoreGeneralSettings } from "@/components/dashboard/store/store-general-settings";
import { getBranch } from "@/slices/branches";
import { useAppDispatch, useAppSelector } from "@/store";
import { t } from "i18next";
interface ITabStore {
  label: string;
  value: string;
  disabled: boolean;
}
const tabs: ITabStore[] = [
  { label: "General", value: "general", disabled: false },
  { label: "Address", value: "address", disabled: true },
  { label: "Schedule", value: "schedule", disabled: true },
];

const StoreIndex = () => {
  const [tabsState, setTabsState] = useState<ITabStore[]>(tabs);
  const stores = useAppSelector((state) => state.stores.stores);
  const [currentTab, setCurrentTab] = useState("general");
  //   const [store, setStore] = useState<Store | null>(null);
  const store = stores.byId[stores.allIds[0]];
  const branch = stores.byId[stores.allIds[0]]?.branches?.[0];
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (branch) dispatch(getBranch(branch.id));
  }, [stores]);
  useEffect(() => {
    const currTabs = tabsState;

    setTabsState(
      currTabs.map((el) =>
        el.value === "general" ? el : { ...el, disabled: !store ? true : false }
      )
    );
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
                label={t(tab.label)}
                value={tab.value}
                disabled={tab.disabled}
              />
            ))}
          </Tabs>
          <Divider sx={{ mb: 3 }} />
          {currentTab === "general" && <StoreGeneralSettings store={store} />}
          {currentTab === "address" && branch && (
            <AddressBranchForm branchId={branch.id} />
          )}
          {currentTab === "schedule" && <ScheduleBranchForm />}
        </Container>
      </Box>
    </>
  );
};

StoreIndex.getLayout = (page: ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default StoreIndex;
