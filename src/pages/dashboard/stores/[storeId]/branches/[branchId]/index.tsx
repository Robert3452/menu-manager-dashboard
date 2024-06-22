import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Container,
  Divider,
  Link,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Head from "next/head";
import NextLink from "next/link";

import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { AuthGuard } from "../../../../../../components/authentication/auth-guard";
import AddressBranchForm from "../../../../../../components/dashboard/branch/address-branch-form";
import ScheduleBranchForm from "../../../../../../components/dashboard/branch/schedules-branch-form";
import { DashboardLayout } from "../../../../../../components/dashboard/dashboard-layout";
import { BranchGeneralSettings } from "../../../../../../components/dashboard/store/branches/branch-general-setting";
import { getBranch } from "../../../../../../slices/branches";
// import { useDispatch, useSelector } from '../../../../../../store';
import MenuBoard from "../../../../../../components/dashboard/corridors/menu-board";
import { useAppDispatch, useAppSelector } from "@/store";
import { Branch } from "@/api/models/branch";

const tabs = [
  { label: "General", value: "general" },
  { label: "Address", value: "address" },
  { label: "Schedule", value: "schedule" },
  { label: "Menu", value: "menu" },
];
interface QueryParams {
  branchId?: number;
}
const BranchIndex = () => {
  const [currentTab, setCurrentTab] = useState("general");
  const [branch, setBranch] = useState<Branch | null>(null);
  const router = useRouter();
  const query = router.query as QueryParams;
  const dispatch = useAppDispatch();
  const { branches: branchStore } = useAppSelector((state) => state.branches);
  useEffect(() => {
    if (query.branchId) dispatch(getBranch(query.branchId));
  }, []);

  useEffect(() => {
    if (query.branchId) setBranch(branchStore.byId[query.branchId]);
  }, [branchStore]);

  const handleTabsChange = (event: any, value: string) => {
    setCurrentTab(value);
  };

  return (
    <>
      <Head>
        <title>Dashboard: Branches | Material Kit Pro</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg" sx={{ overflowX: "auto" }}>
          <NextLink href={`/dashboard/stores/${router.query.storeId}`} passHref>
            <Link
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
              <Typography variant="subtitle2">Branches</Typography>
            </Link>
          </NextLink>
          <Typography variant="h4">Branch {branch?.branchName}</Typography>
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
          {currentTab === "general" && branch && (
            <BranchGeneralSettings branch={branch} />
          )}
          {currentTab === "address" && branch && (
            <AddressBranchForm branch={branch} />
          )}
          {currentTab === "schedule" && <ScheduleBranchForm />}
          {currentTab === "menu" && branch && <MenuBoard branch={branch} />}
        </Container>
      </Box>
    </>
  );
};

BranchIndex.getLayout = (page: ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default BranchIndex;
