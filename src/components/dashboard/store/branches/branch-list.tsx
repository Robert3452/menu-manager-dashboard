import {
    Box,
    Card,
    CardContent,
    Divider,
    Grid
} from '@mui/material';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { storeApi } from '../../../../api/store-api';
import { AuthGuard } from '../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import { gtm } from '../../../../lib/gtm';

import { useRouter } from 'next/router';
import NewBranchForm from '../../branch/new-branch-form';
import { BranchListFilters } from './branch-list-filters';
import { BranchListTable } from './branch-list-table';
import { useDispatch, useSelector } from '../../../../store';
import { getBranches } from '../../../../slices/branches';

const applyFilters = (stores, filters) => stores.filter((store) => {
    if (filters.name) {
        const nameMatched = store.branchName.toLowerCase().includes(filters.name.toLowerCase());

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

const applyPagination = (items, page, rowsPerPage) => items.slice(page * rowsPerPage,
    page * rowsPerPage + rowsPerPage);

const BranchList = () => {
    const [branches, setBranches] = useState([]);
    const dispatch = useDispatch();
    const { branches: branchStore } = useSelector((state) => state.branch);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const router = useRouter();
    const [filters, setFilters] = useState({
        name: undefined,
        category: [],
        status: [],
        inStock: undefined
    });

    useEffect(() => {
        gtm.push({ event: 'page_view' });
    }, []);

    useEffect(() => {
        if (branchStore)
            setBranches(branchStore.allIds.map(el => branchStore.byId[el]));

    }, [branchStore])

    useEffect(() => {
        dispatch(getBranches(router.query.storeId));

    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []);

    const handleFiltersChange = (filters) => {
        setFilters(filters);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    // Usually query is done on backend with indexing solutions
    const filteredBranches = applyFilters(branches, filters);
    const paginatedBranches = applyPagination(filteredBranches, page, rowsPerPage);

    return (
        <>
            <Head>
                <title>
                    Dashboard: Store List | Material Kit Pro
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 1
                }}
            >
                <Card sx={{ px: 0 }}>
                    <CardContent>
                        <Grid
                            container
                            direction={"row"}
                            justifyContent={'center'}
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

BranchList.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            {page}
        </DashboardLayout>
    </AuthGuard>
);

export default BranchList;
