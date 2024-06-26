import { ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
// import { AuthGuard } from "../../components/authentication/auth-guard";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import { OverviewBanner } from "../../components/dashboard/overview/overview-banner";
import { OverviewCryptoWallet } from "../../components/dashboard/overview/overview-crypto-wallet";
import { OverviewInbox } from "../../components/dashboard/overview/overview-inbox";
import { OverviewLatestTransactions } from "../../components/dashboard/overview/overview-latest-transactions";
import { OverviewPrivateWallet } from "../../components/dashboard/overview/overview-private-wallet";
import { OverviewTotalBalance } from "../../components/dashboard/overview/overview-total-balance";
import { OverviewTotalTransactions } from "../../components/dashboard/overview/overview-total-transactions";
import { ArrowRight as ArrowRightIcon } from "@/icons/arrow-right";
import { Briefcase as BriefcaseIcon } from "@/icons/briefcase";
import { Download as DownloadIcon } from "@/icons/download";
import { ExternalLink as ExternalLinkIcon } from "@/icons/external-link";
import { InformationCircleOutlined as InformationCircleOutlinedIcon } from "@/icons/information-circle-outlined";
import { Reports as ReportsIcon } from "@/icons/reports";
// import { UsersIcon } from '@/icons/users';
import { gtm } from "../../lib/gtm";
import UsersIcon from "@/icons/users";
import { AuthGuard } from "@/components/authentication/auth-guard";
import { useAppDispatch, useAppSelector } from "@/store";
import { getStoreByOwner } from "@/slices/store";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/use-auth";

const Overview = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storeState = useAppSelector((state) => state.stores.stores);
  const auth =  useAuth();

  useEffect(() => {
    console.log(auth)
    // TODO Verify  if the role is the customer
    dispatch(getStoreByOwner());
  }, []);

  useEffect(() => {
    if (storeState.allIds.length === 0) {
      // router.push("/store")
    }
  }, [storeState]);
  return <>{storeState && JSON.stringify(storeState.byId)}</>;
};

Overview.getLayout = (page: ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Overview;
