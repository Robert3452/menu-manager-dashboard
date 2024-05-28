import { Box, Card, CardContent, Divider, Grid } from "@mui/material";
import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";
import { storeApi } from "../../../../api/store-api";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import { gtm } from "../../../../lib/gtm";

import { useRouter } from "next/router";
import NewBranchForm from "../../branch/new-branch-form";
import { BranchListFilters } from "./branch-list-filters";
import { BranchListTable } from "./branch-list-table";
// import { getBranches } from '../../../../slices/branches';
import { useAppDispatch, useAppSelector } from "@/store";
import { Branch } from "@/api/models/branch";
import { getBranches } from "@/slices/branches";

const applyFilters = (stores: any, filters: any) =>
  stores.filter((store: any) => {
    if (filters.name) {
      const nameMatched = store.branchName
        .toLowerCase()
        .includes(filters.name.toLowerCase());

      if (!nameMatched) {
        return false;
      }
    }

    // It is possible to select multiple category options
    if (filters.category?.length > 0) {
      const categoryMatched = filters.category.includes(store.category);

      if (!categoryMatched) {
        return false;
      }
    }

    // It is possible to select multiple status options
    if (filters.status?.length > 0) {
      const statusMatched = filters.status.includes(store.status);
      if (!statusMatched) {
        return false;
      }
    }
    return true;
  });

const applyPagination = (items: any, page: any, rowsPerPage: any) =>
  items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const BranchList = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const dispatch = useAppDispatch();
  const branchStore = useAppSelector((state) => state.branches.branches);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();
  const [filters, setFilters] = useState({
    name: undefined,
    category: [],
    status: [],
    inStock: undefined,
  });

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(() => {
    if (branchStore)
      setBranches(branchStore.allIds.map((el) => branchStore.byId[el]));
  }, [branchStore]);

  useEffect(
    () => {
      dispatch(
        getBranches(
          typeof router.query.storeId === "string" ? +router.query.storeId : 0
        )
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleFiltersChange = (filters: any) => {
    setFilters(filters);
  };

  const handlePageChange = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredBranches = applyFilters(branches, filters);
  const paginatedBranches = applyPagination(
    filteredBranches,
    page,
    rowsPerPage
  );

  return (
    <>
      <Head>
        <title>Dashboard: Store List | Material Kit Pro</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 1,
        }}
      >
        <Card sx={{ px: 0 }}>
          <CardContent>
            <Grid
              container
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={3}
              px={0}
            >
              <Divider />

              <NewBranchForm />
            </Grid>
          </CardContent>
          {/* <ProjectListFilters onChange={handleFiltersChange} /> */}
          <BranchListFilters onChange={handleFiltersChange} />
          <BranchListTable
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            page={page}
            branches={paginatedBranches}
            branchesCount={filteredBranches.length}
            rowsPerPage={rowsPerPage}
          />
        </Card>
      </Box>
    </>
  );
};

BranchList.getLayout = (page: ReactNode) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default BranchList;
