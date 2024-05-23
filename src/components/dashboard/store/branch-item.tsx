import {
    Button,
    Grid,
    TableCell,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import { useFormik } from 'formik';
import React, { Fragment, useState, useEffect } from 'react';
import * as Yup from 'yup';

import SettingsIcon from '@mui/icons-material/Settings';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { branchesApi } from '../../../api/branch-api';

const BranchItem = (props) => {
    const [openModal, setOpenModal] = useState(false);
    const { branch: el, store } = props;
    const router = useRouter();
    const handleDeleteBranch = async () => {
        toggleModal()
    }

    useEffect(() => {
        console.log(el)

    }, [])

    const toggleModal = async () => {
        setOpenModal(!openModal);
    }
    return <Fragment>
        <TableRow sx={{ my: 2 }}>
            <TableCell>
                <Typography
                    variant={"h6"}
                >
                    {el.id}
                </Typography>

            </TableCell>
            <TableCell>
                <Grid
                    key={`${el.id}`}
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        xs={12}
                    >
                        <Typography
                            variant={"h5"}>
                            {el.branchName}
                        </Typography>
                    </Grid>

                </Grid>
            </TableCell>
            <TableCell
                align='right' >
                <NextLink
                    href={`/dashboard/stores/${store.id}/branches/${el.id}`}
                    passHref
                >

                    <Button
                        // onClick={handleDeleteStore}
                        endIcon={<SettingsIcon />}
                        // sx={{ m: 1 }}
                        color='info'
                        variant="text"
                    >
                        More
                    </Button>
                </NextLink>

            </TableCell>
        </TableRow>

    </Fragment>



}

export default BranchItem