import SaveIcon from "@mui/icons-material/Save";
import React from "react";
// import { Trash as TrashIcon } from "../../../icons/trash";
import toast from "react-hot-toast";
import * as Yup from "yup";

import {
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store";
import { createBranch } from "@/slices/branches";
import { CreateBranchDto } from "@/api/branch-api";
import { AxiosError } from "axios";
const NewBranchForm = () => {
  const dispatch = useAppDispatch();
  const storeState = useAppSelector((state) => state.stores.stores);

  const formik = useFormik({
    initialValues: {
      branchName: "",
      storeId: storeState.allIds[0],
    },
    validationSchema: Yup.object().shape({
      branchName: Yup.string().required("branch name required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const response = await dispatch(
          createBranch({ ...values } as CreateBranchDto)
        );
        toast.success(response.message);
        helpers.resetForm();
      } catch (error: any) {
        toast.error(error.message);
        helpers.resetForm();
        helpers.setStatus({ success: false });
        // helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });
  return (
    <Container sx={{ mt: 3 }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          direction={"row"}
          // justifyContent={'center'}
          alignItems={"center"}
          spacing={3}
        >
          <Grid item xs={12} display={"flex"} justifyContent={"flex-start"}>
            <Typography variant="h5">New Branch</Typography>
          </Grid>
          <Divider />
          <Grid item xs={12} md={8}>
            <TextField
              type="text"
              fullWidth
              autoComplete="off"
              onChange={formik.handleChange}
              error={Boolean(
                formik.touched.branchName && formik.errors.branchName
              )}
              helperText={formik.touched.branchName && formik.errors.branchName}
              onBlur={formik.handleBlur}
              value={formik.values.branchName}
              label="Branch name"
              name="branchName"
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              startIcon={<SaveIcon />}
              // disabled={}
              fullWidth
              type="submit"
              variant="contained"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default NewBranchForm;
