import { useState, useEffect, useCallback, ReactNode } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { Download as DownloadIcon } from "../../../icons/download";
import { Upload as UploadIcon } from "../../../icons/upload";
import { Plus as PlusIcon } from "../../../icons/plus";
import { gtm } from "../../../lib/gtm";
import { StoreListTable } from "../../../components/dashboard/store/store-list-table";
import { storeApi } from "../../../api/store-api";
import { useAppDispatch, useAppSelector } from "@/store";
import { getStores } from "@/slices/store";
import { Store } from "@/api/models/store";

const applyPagination = (items: any, page: any, rowsPerPage: any) =>
  items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const StoreList = () => {
  const [stores, setStores] = useState<Store[]>();
  const dispatch = useAppDispatch();
  const storesState = useAppSelector((state) => state.stores.stores);
  // const storeState = Object.keys(stores).map((el) => stores.byId[+el]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [filters, setFilters] = useState({
  //   name: undefined,
  //   category: [],
  //   status: [],
  //   inStock: undefined,
  // });

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(
    () => {
      dispatch(getStores());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  useEffect(() => {
    if (storesState.allIds.length > 0) {
      const result = storesState.allIds.map(
        (storeId) => storesState.byId[+storeId]
      );
      setStores(result);
    }
  }, [storesState]);
  const handlePageChange = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <>
      <Head>
        <title>Dashboard: Store List | Material Kit Pro</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">Stores</Typography>
              </Grid>
              <Grid item>
                <NextLink href="/dashboard/stores/new" passHref>
                  <Button
                    component="a"
                    startIcon={<PlusIcon fontSize="small" />}
                    variant="contained"
                  >
                    Add
                  </Button>
                </NextLink>
              </Grid>
            </Grid>
            <Box
              sx={{
                m: -1,
                mt: 3,
              }}
            >
              <Button startIcon={<UploadIcon fontSize="small" />} sx={{ m: 1 }}>
                Import
              </Button>
              <Button
                startIcon={<DownloadIcon fontSize="small" />}
                sx={{ m: 1 }}
              >
                Export
              </Button>
            </Box>
          </Box>
          <Card>
            {/* <ProjectListFilters onChange={handleFiltersChange} /> */}
            {stores && (
              <StoreListTable
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={page}
                stores={stores}
                storesCount={stores.length}
                rowsPerPage={rowsPerPage}
              />
            )}{" "}
          </Card>
        </Container>
      </Box>
    </>
  );
};

StoreList.getLayout = (page: ReactNode) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default StoreList;
