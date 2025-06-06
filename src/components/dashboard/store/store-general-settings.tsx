import WarningIcon from "@mui/icons-material/WarningOutlined";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import SaveIcon from "@mui/icons-material/Save";
import Modal from "@mui/material/Modal";
import toast from "react-hot-toast";
import { Image as ImageIcon } from "../../../icons/image";
import { Trash } from "../../../icons/trash";
import UploadInput from "../../upload-input";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import {
  updateStore,
  deleteStore as dispatchDeleteStore,
  createStore,
} from "../../../slices/store";
import { useAppDispatch, useAppSelector } from "@/store";
import { Store } from "@/api/models/store";
import { File } from "buffer";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useMounted } from "@/hooks/use-mounted";
type StoreGeneralSettingsProps = {
  store?: Store | null;
};
export const StoreGeneralSettings: React.FC<StoreGeneralSettingsProps> = (
  props
) => {
  // To get the user from the authContext, you can use
  const [file, setFile] = useState<Blob | null>();
  const [selectedImage, setSelectedImage] = useState<any>();
  const stores = useAppSelector((state) => state.stores.stores);

  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const store = stores.byId[stores.allIds[0]];
  const router = useRouter();
  const [disableDeleteBtn, setDisableDeleteBtn] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (store)
      formik.setValues({
        name: store.name,
        file: store.logo,
        branchName: store.branches?.[0].branchName || "",
      });
  }, [store]);

  const formik = useFormik({
    initialValues: {
      name: store?.name || "",
      file: store?.logo || "",
      branchName: store?.branches?.[0].branchName || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255),
      file: Yup.mixed(),
      branchName: Yup.string().max(255),
    }),
    onSubmit: async (values, helpers) => {
      try {
        let response;

        if (!store?.id && file) {
          response = await dispatch(
            createStore({ ...values, branchName: values.name, file })
          );
          setFile(null);

          toast.success(response.message);
        } else if (store?.id) {
          response = await dispatch(
            updateStore(store.id, {
              ...values,
              file: file || undefined,
            })
          );
          setFile(null);

          toast.success(response.message);
        }
        // const response = await storeApi.updateStore(store.id, { ...values, file })
        helpers.setStatus({ success: true });
        // helpers.resetForm()
        // router.reload();
        return;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || "Algo fue mal.");
        } else {
          toast.error("Algo fue mal.");
        }
        helpers.setStatus({ success: false });
        helpers.setSubmitting(false);
      }
    },
  });

  const deleteStore = async () => {
    setDisableDeleteBtn(true);
    const currentId = store.id;
    const res = await dispatch(dispatchDeleteStore(currentId));
    toast.success(res.message);
    setDisableDeleteBtn(false);
    handleDelete();
    router.reload();
  };

  const toggleModal = async () => {
    setOpenModal(!openModal);
  };
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    formik.handleChange(event);

    reader.onload = () => {
      setSelectedImage(reader.result); // Establecer la imagen seleccionada
    };
    const file: any = event.target.files?.[0];
    reader.readAsDataURL(file);

    const uploadedFile = file;
    formik.setFieldValue("file", uploadedFile);

    setFile(uploadedFile);
  };
  const handleDelete = () => {
    formik.setFieldValue("file", store?.logo);

    setFile(null);
    setSelectedImage(null);
  };
  return (
    <Box sx={{ mt: 4 }} {...props}>
      <Card>
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={4} xs={12}>
                <Typography variant="h6">Basic details</Typography>
              </Grid>

              <Grid item md={8} xs={12}>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Box
                    sx={{
                      alignItems: "center",
                      backgroundColor: "background.default",
                      backgroundImage: `url(${selectedImage || store?.logo})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      borderRadius: 1,
                      display: "flex",
                      height: 80,
                      justifyContent: "center",
                      overflow: "hidden",
                      width: 80,
                    }}
                  >
                    {!store?.logo && !selectedImage && (
                      <ImageIcon fontSize="small" />
                    )}
                  </Box>
                  <Box sx={{ pl: 2 }}>
                    <UploadInput
                      name={"file"}
                      handleChange={handleChange}
                      handleDelete={handleDelete}
                      // helperText={formik.touched.file && formik.errors.file}
                      // error={Boolean(formik.touched.file && formik.errors.file)}
                      value={file}
                      variant="contained"
                      placeholder={"Change"}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    mt: 3,
                    alignItems: "center",
                  }}
                >
                  <TextField
                    label="Store Name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    size="small"
                    sx={{
                      flexGrow: 1,
                      mr: 3,
                    }}
                    value={formik.values.name}
                  />
                  <Button
                    endIcon={<SaveIcon />}
                    type="submit"
                    disabled={!formik.dirty || formik.isSubmitting}
                  >
                    Save
                  </Button>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    mt: 3,
                    alignItems: "center",
                  }}
                >
                  <TextField
                    defaultValue={session?.user.email}
                    disabled
                    label="Email Address"
                    required
                    size="small"
                    sx={{
                      flexGrow: 1,
                      mr: 3,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderStyle: "dashed",
                      },
                    }}
                  />
                  {/* <Button>Edit</Button> */}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </form>
      </Card>
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Delete Store</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Typography sx={{ mb: 3 }} variant="subtitle1">
                Delete your store and all of your source data. This is
                irreversible.
              </Typography>
              <Button
                endIcon={<Trash />}
                color="error"
                variant="outlined"
                onClick={toggleModal}
                // disable={store?.id}
                disabled={typeof store === "undefined" || !store}
              >
                Delete store
              </Button>
              <Modal
                open={openModal}
                onClose={toggleModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    backgroundColor: "background.default",
                    minHeight: "100%",
                    p: 3,
                  }}
                >
                  <Container maxWidth="sm">
                    <Paper elevation={12}>
                      <Box
                        sx={{
                          display: "flex",
                          pb: 2,
                          pt: 3,
                          px: 3,
                        }}
                      >
                        <Avatar
                          sx={{
                            backgroundColor: (theme) =>
                              alpha(theme.palette.error.main, 0.08),
                            color: "error.main",
                            mr: 2,
                          }}
                        >
                          <WarningIcon fontSize="small" />
                        </Avatar>
                        <div>
                          <Typography variant="h5">Deactivate store</Typography>
                          <Typography
                            color="textSecondary"
                            sx={{ mt: 1 }}
                            variant="body2"
                          >
                            Are you sure you want to delete this store? All of
                            your data will be permanently removed. This action
                            cannot be undone.
                          </Typography>
                        </div>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          px: 3,
                          py: 1.5,
                        }}
                      >
                        <Button
                          sx={{ mr: 2 }}
                          variant="outlined"
                          onClick={toggleModal}
                        >
                          Cancel
                        </Button>
                        <Button
                          sx={{
                            backgroundColor: "error.main",
                            "&:hover": {
                              backgroundColor: "error.dark",
                            },
                          }}
                          disabled={disableDeleteBtn}
                          onClick={deleteStore}
                          variant="contained"
                        >
                          Deactivate
                        </Button>
                      </Box>
                    </Paper>
                  </Container>
                </Box>
              </Modal>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
