import {
    Box,
    Button,
    TableCell,
    TableRow,
    TextField
} from '@mui/material';
import { useFormik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
// import { storeApi } from '../../../api/store-api';
import SettingsIcon from '@mui/icons-material/Settings';
import { storeApi } from '../../../../api/store-api';
import { Image as ImageIcon } from '../../../../icons/image';
import { Pencil } from '../../../../icons/pencil';
import UploadInput from '../../../upload-input';

const BranchListItem = (props) => {
    const { branch, handleOpenBranch, open } = props;
    const [file, setFile] = useState(null);
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: branch.name,
            file: branch.logo,
        },
        validationSchema: Yup.object({
            name: Yup.string().max(255),
            file: Yup.mixed(),
        }),
        onSubmit: async (values, helpers) => {
            try {
                const response = await storeApi.updateStore(branch.id, { ...values, file })
                toast.success(response.message);
                router.push('/dashboard/stores');

            } catch (error) {
                console.error(error);
                toast.error('Something went wrong!');
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: error.message });
                helpers.setSubmitting(false);
            }
        }
    })
    const handleDeleteStore = async () => {
        const response = await storeApi.deleteStore(branch.id);
        toast.success(response.message);
        router.push('/dashboard/stores');

    };
    const handleChange = (event) => {
        formik.handleChange(event);
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);
    }
    const handleDelete = (event) => {
        formik.setFieldValue("file", branch.logo);
        setFile(null);
    }

    return (
        <Fragment key={branch.id}>
            <TableRow
                hover
                key={branch.id}
            >
                <TableCell />
                <TableCell
                    style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        {branch.logo
                            ? (
                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        backgroundColor: 'background.default',
                                        backgroundImage: `url(${branch.logo})`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        borderRadius: 1,
                                        display: 'flex',
                                        height: 80,
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                        width: 80
                                    }}
                                />
                            )
                            : (
                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        backgroundColor: 'background.default',
                                        borderRadius: 1,
                                        display: 'flex',
                                        height: 80,
                                        justifyContent: 'center',
                                        width: 80
                                    }}
                                >
                                    <ImageIcon fontSize="small" />
                                </Box>
                            )}


                    </Box>
                    <Box
                        sx={{
                            padding: "10px 30px",
                            display: "flex",
                            flex: 1,
                            justifyContent: "center"
                        }}
                    >
                        <form
                            onSubmit={formik.handleSubmit}
                            style={{
                                alignItems: 'center',
                                justifyContent: "flex-start",
                                display: "flex",
                                flex: "1",
                            }}
                        >
                            <TextField
                                label="Branch name"
                                name="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                style={{ marginRight: "20px" }}
                            />

                            <UploadInput
                                name={"file"}
                                handleChange={handleChange}
                                handleDelete={handleDelete}
                                helperText={formik.touched.file && formik.errors.file}
                                error={Boolean(formik.touched.file && formik.errors.file)}
                                placeholder={"Update the logo"}
                            />
                        </form>
                    </Box>
                </TableCell>
                <TableCell align='right' >
                    <Button
                        startIcon={<Pencil />}
                        disabled={!formik.dirty}
                        onClick={() => { formik.submitForm() }}
                        sx={{ m: 1 }}
                        type="submit"
                        variant="text"
                    >
                        Update
                    </Button>
                    <NextLink
                        href={`/dashboard/stores/${branch.id}`}
                        passHref
                    >

                        <Button
                            // onClick={handleDeleteStore}
                            endIcon={<SettingsIcon />}
                            sx={{ m: 1 }}
                            color='info'
                            variant="text"
                        >
                            Settings
                        </Button>
                    </NextLink>

                </TableCell>
            </TableRow>
            {/* {open && (
                <TableRow>
                    <TableCell
                        colSpan={7}
                        sx={{
                            p: 0,
                            position: 'relative',
                            '&:after': {
                                position: 'absolute',
                                content: '" "',
                                top: 0,
                                left: 0,
                                backgroundColor: 'primary.main',
                                width: 3,
                                height: 'calc(100% + 1px)'
                            }
                        }}
                    >
                        <CardContent>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={3}
                            >

                                <Grid
                                    item
                                    xs={12}
                                >
                                    <Typography variant="h6">
                                        Branches
                                    </Typography>
                                    <Divider sx={{ my: 2 }} />
                                    {store.branches.map((el) => (
                                        <BranchItem key={el.id}
                                            branch={el}
                                            store={store} />

                                    ))}
                                </Grid>

                            </Grid>
                        </CardContent>
                        <Divider />
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                px: 2,
                                py: 1
                            }}
                        >

                            <NextLink
                                href={`/dashboard/stores/${store.id}/branches/create`}
                                passHref>
                                <Button
                                    startIcon={<PlusIcon />}
                                    sx={{ m: 1 }}
                                    type="button"
                                    variant="contained"
                                >
                                    Branch
                                </Button>
                            </NextLink>
                        </Box>
                    </TableCell>
                </TableRow>
            )} */}
        </Fragment>
    )
}

BranchListItem.propTypes = {
    branch: PropTypes.object,
    handleOpenBranch: PropTypes.func,
    open: PropTypes.bool
}

export default BranchListItem