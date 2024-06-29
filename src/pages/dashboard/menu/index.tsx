"use client";
import { Branch } from "@/api/models/branch";
import MenuBoard from "@/components/dashboard/corridors/menu-board";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { useAppSelector } from "@/store";
import React, { ReactNode, useEffect, useState } from "react";

const DashboardMenu = () => {
  const stores = useAppSelector((state) => state.stores.stores);
  const [currentBranch, setCurrentBranch] = useState<Branch>();
  // const store = stores.byId[stores.allIds[0]];
  useEffect(() => {
    const branch = stores.byId[stores.allIds[0]]?.branches?.[0];
    if (branch) setCurrentBranch(branch);
  }, [stores]);

  return currentBranch && <MenuBoard branch={currentBranch} />;
};

DashboardMenu.getLayout = (page: ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);
export default DashboardMenu;
