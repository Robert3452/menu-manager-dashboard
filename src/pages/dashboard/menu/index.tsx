"use client";
import { Branch } from "@/api/models/branch";
import MenuBoard from "@/components/dashboard/corridors/menu-board";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { useAppSelector } from "@/store";
import { Container } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";

const DashboardMenu = () => {
  const stores = useAppSelector((state) => state.stores.stores);
  const myStoreId = useAppSelector((state) => state.stores.activeStoreId);
  const [currentBranch, setCurrentBranch] = useState<Branch>();
  useEffect(() => {
    console.log(stores);

    if (!myStoreId) return;
    const branch = stores.byId[myStoreId]?.branches?.[0];

    if (branch) setCurrentBranch(branch);
  }, [myStoreId]);
  console.log(currentBranch);
  return (
    <Container maxWidth="lg" sx={{ py: 4, overflowX: "auto" }}>
      {currentBranch && <MenuBoard branch={currentBranch} />}
    </Container>
  );
};

DashboardMenu.getLayout = (page: ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);
export default DashboardMenu;
