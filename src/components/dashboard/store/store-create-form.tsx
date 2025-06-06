import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
// import UploadInput from "../../upload-input";
import UploadInput from "@/components/upload-input";
import { storeApi } from "../../../api/store-api";

export const StoreCreateForm = (props: any) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      file: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required(),
      file: Yup.mixed().required(),
    }),
    onSubmit: async (values, helpers) => {
      try {
        if (!file) return;
        const response = await storeApi.createStore({ ...values, file });
        // NOTE: Make API request
        toast.success(response.message);
        router.push("/dashboard/stores");
      } catch (err: any) {
        console.error(err);
        toast.error("Something went wrong!");
        helpers.setStatus({ success: false });
        helpers.setSubmitting(false);
      }
    },
  });

  const [file, setFile] = useState(null);
  const handleChange = (event: any) => {
    const uploadedFile = event.target.files[0];
    formik.setFieldValue("file", uploadedFile);
    setFile(uploadedFile);
  };
  const handleDelete = (_: any) => {
    setFile(null);
    formik.setFieldValue("file", null);
  };

  return (
    <form onSubmit={formik.handleSubmit} {...props}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Basic details</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Grid
                container
                sx={{ display: "flex" }}
                alignItems={"flex-start"}
                spacing={2}
              >
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(formik.touched.name && formik.errors.name)}
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    label="Store Name"
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <UploadInput
                    error={Boolean(formik.touched.file && formik.errors.file)}
                    helperText={formik.touched.file && formik.errors.file}
                    handleChange={handleChange}
                    handleDelete={handleDelete}
                    name={"file"}
                    placeholder={"Set a logo"}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          mx: -1,
          mb: -1,
          mt: 3,
        }}
      >
        <Button
          sx={{ m: 1, ml: "auto" }}
          variant="outlined"
          onClick={() => {
            router.back();
          }}
        >
          Cancel
        </Button>
        <Button sx={{ m: 1 }} type="submit" variant="contained">
          Create
        </Button>
      </Box>
    </form>
  );
};
