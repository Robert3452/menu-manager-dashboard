import { useEffect } from 'react';
import Head from 'next/head';
import { Divider } from '@mui/material';
import { gtm } from '../lib/gtm';
import { HomeHero } from '@/components/home/home-hero';
import { HomeDevelopers } from '@/components/home/home-developer';
import { MainLayout } from '@/components/main-layout';

const Home = () => {
    useEffect(() => {
        gtm.push({ event: 'page_view' });
    }, []);

    return (
        <>
            <Head>
                <title>
                    Material Kit Pro
                </title>
            </Head>
            <main>
                <HomeHero />
                <Divider />
                <HomeDevelopers />
                <Divider />
            </main>
        </>
    );
};

Home.getLayout = (page: any) => (
    <MainLayout>
        {page}
    </MainLayout>
);

export default Home;
