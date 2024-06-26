import { useEffect } from "react";
import Head from "next/head";
import { Divider } from "@mui/material";
import { gtm } from "../lib/gtm";
import { HomeHero } from "@/components/home/home-hero";
import { HomeDevelopers } from "@/components/home/home-developer";
import { MainLayout } from "@/components/main-layout";
import { useAppDispatch, useAppSelector } from "@/store";
import { getStore, getStoreByOwner } from "@/slices/store";

const Home = () => {
//   const dispatch = useAppDispatch();
//   const storeState = useAppSelector((state) => state.stores.stores);
//   useEffect(() => {
//     // TODO Verify  if the role is the customer
//     dispatch(getStoreByOwner());
//   }, []);

  return (
    <>
      <Head>
        <title>Material Kit Pro</title>
      </Head>
      <main>
        {/* {storeState && JSON.stringify(storeState.byId)} */}
        <HomeHero />
        <Divider />
        <HomeDevelopers />
        <Divider />
      </main>
    </>
  );
};

Home.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default Home;
