import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Container, Link, Typography } from '@mui/material';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { AuthGuard } from '../../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../../components/dashboard/dashboard-layout';
import AddressBranchForm from '../../../../../components/dashboard/branch/address-branch-form';
const BranchCreate = () => {

    const router = useRouter();
    const storeId = router.query.storeId;
    const getBranch = useCallback(async () => {
    }, [])
    const [branch, setBranch] = useState(null);

    useEffect(() => {
        getBranch();
    }, [])

    return (
        <>
            <Head>
                <title>
                    Dashboard: Branch Create
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    backgroundColor: 'background.default',
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="md">
                    <Box sx={{ mb: 4 }}>
                        <NextLink
                            href={`/dashboard/stores`}
                            passHref
                        >
                            <Link
                                color="textPrimary"
                                component="a"
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex'
                                }}
                            >
                                <ArrowBackIcon
                                    fontSize="small"
                                    sx={{ mr: 1 }}
                                />
                                <Typography variant="subtitle2">
                                    Stores
                                </Typography>
                            </Link>
                        </NextLink>
                    </Box>

                    <Box mt={3}>
                        <AddressBranchForm />
                    </Box>
                </Container>
            </Box>
        </>
    );
}

BranchCreate.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            {page}
        </DashboardLayout>
    </AuthGuard>
)

export default BranchCreate