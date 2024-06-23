import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Box, Chip, Container, Link, Typography } from "@mui/material";
import Head from "next/head";
import NextLink from "next/link";
import React, { useState, useCallback, useEffect, ReactNode } from "react";
import { AuthGuard } from "../../../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../../../components/dashboard/dashboard-layout";
// import { storeApi } from '../../../../api/store-api';
import { useRouter } from "next/router";
import NewBranchForm from "../../../../../../components/dashboard/branch/new-branch-form";
const StoreEdit = () => {
  return (
    <>
      <Head>
        <title>Dashboard: Branch Edit</title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: "background.default",
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 4 }}>
            <NextLink href="/dashboard/stores" passHref>
              <Typography
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Branches</Typography>
              </Typography>
            </NextLink>
          </Box>

          <Box mt={3}>{<NewBranchForm />}</Box>
        </Container>
      </Box>
    </>
  );
};

StoreEdit.getLayout = (page: ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default StoreEdit;
