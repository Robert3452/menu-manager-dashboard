import EditProductImage from "@/components/dashboard/corridors/edit-product-image";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import TableButtons from "@/components/dashboard/landing-page/table-buttons";
import { getLandingPage, upsertLandingPage } from "@/slices/store";
import { useAppDispatch, useAppSelector } from "@/store";
import { Cancel, Save } from "@mui/icons-material";
import toast from "react-hot-toast";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { t } from "i18next";
import { ReactNode, useEffect, useState } from "react";
import * as Yup from "yup";
const data = [
  { id: 1, index: 1, name: "Menú", link: "" },
  { id: 2, index: 2, name: "Whatsapp", link: "" },
  { id: 3, index: 0, name: "WiFi", link: "" },
];

const LandingPage = () => {
  const dispatch = useAppDispatch();
  const activeStoreId = useAppSelector((state) => state.stores.activeStoreId);

  const landingPage = useAppSelector((state) =>
    activeStoreId
      ? state.stores.stores.byId[activeStoreId]?.landingPages?.[0]
      : undefined
  );
  useEffect(() => {
    if (typeof activeStoreId === "number")
      dispatch(getLandingPage(activeStoreId));
  }, [activeStoreId]);
  useEffect(() => {
    if (landingPage) {
      formik.setValues({ ...landingPage } as any);
      setLandingImage(landingPage.image);
    }
  }, [landingPage]);
  useEffect(() => {
  }, [activeStoreId]);

  const [landingImage, setLandingImage] = useState<any>(landingPage?.image);
  const validationSchema = Yup.object({
    title: Yup.string().max(50).required("Campo requerido"),
    description: Yup.string().max(200).required("Campo requerido"),
    image: Yup.mixed().required(),
    buttons: Yup.array().of(
      Yup.object().shape({
        id: Yup.number().required(),
        index: Yup.number().required(),
        name: Yup.string().required(),
        link: Yup.string().required(),
      })
    ),
  });
  // create formik object
  const formik = useFormik({
    validationSchema,
    initialValues: {
      title: landingPage?.title || "",
      description: landingPage?.description || "",
      image: landingPage?.image || "",
      buttons: landingPage?.buttons || [],
    },
    onSubmit: async (values) => {
      try {
        await dispatch(upsertLandingPage(activeStoreId as number, values));

        toast.success("Página de presentación actualizada");
      } catch (error) {
        console.error(error);
        const axiosError: AxiosError<any> = error as AxiosError;
        toast.error(axiosError.response?.data.message);
      }
    },
  });
  const onClose = () => {};
  const handleChangeImage = (event: any) => {
    const reader = new FileReader();

    reader.onload = () => {
      let result = reader.result;
      setLandingImage(result);
    };
    reader.readAsDataURL(event.target.files[0]);
    const uploadedFile = event.target.files[0];
    formik.setFieldValue("image", uploadedFile);
    // setFile(uploadedFile);
  };

  useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <FormikProvider value={formik}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h3" sx={{ pb: 3 }}>
                    {t("Página de presentación")}
                  </Typography>
                </Grid>
                {/* START: Landing page presentation */}
                <Grid item sm={3} xs={12}>
                  <EditProductImage
                    handleChange={handleChangeImage}
                    name="image"
                    image={landingImage}
                    size="xs"
                  />
                </Grid>
                <Grid
                  item
                  sm={9}
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 3 }}>
                    {t("Título")}
                  </Typography>
                  <TextField
                    sx={{ mb: 2 }}
                    fullWidth
                    label={t("Título de presentación")}
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    name="title"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 3 }}>
                    {t("Descripción adicional")}
                  </Typography>
                  <TextField
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                    multiline
                    rows={3}
                    fullWidth
                    name="description"
                    placeholder={t("Descripción adicional")}
                    // variant="solid"
                  />
                  {/* <Textarea name="Soft" placeholder="Type in here…" variant="soft" /> */}
                </Grid>
                {/*END Landing page presentation */}
                <FieldArray
                  name="buttons"
                  render={(arrayHelpers) => (
                    <TableButtons
                      buttons={formik.values?.buttons}
                      arrayHelpers={arrayHelpers}
                    />
                  )}
                />
                <Grid item xs={12}>
                  <Box
                    sx={{
                      width: "100%",
                      minHeight: "60px",
                      backgroundColor: "background.paper",
                      position: "sticky",
                      bottom: 0,
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      startIcon={<Cancel />}
                      color="error"
                      variant="contained"
                      type="button"
                      sx={{ my: 1, mr: 2 }}
                      onClick={onClose}
                    >
                      Cancelar
                    </Button>
                    <Button
                      endIcon={<Save />}
                      sx={{ my: 1, mr: 4 }}
                      color="secondary"
                      type="submit"
                      variant="contained"
                    >
                      Guardar
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </FormikProvider>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};
LandingPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default LandingPage;
