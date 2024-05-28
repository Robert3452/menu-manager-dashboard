import SaveIcon from "@mui/icons-material/Save";
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
import Modal from "@mui/material/Modal";
import { alpha } from "@mui/material/styles";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
// import { Trash } from '../../../icons/trash';
import { Trash } from "../../../../icons/trash";
import {
  deleteBranch as removeBranch,
  updateBranch,
} from "../../../../slices/branches";
import { useAppDispatch } from "@/store";
import { Branch } from "@/api/models/branch";
import { UpdateBranchDto } from "@/api/branch-api";

type BranchGeneralSettingsProps = {
  branch: Branch;
};
interface QueryParams {
  branchId?: number;
}
export const BranchGeneralSettings: React.FC<BranchGeneralSettingsProps> = (
  props
) => {
  // To get the user from the authContext, you can use
  const { branch } = props;
  const router = useRouter();
  const query = router.query as QueryParams;
  const [disableDeleteBtn, setDisableDeleteBtn] = useState(false);
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      branchName: branch?.branchName || "",
      storeId: router.query.storeId,
    },
    validationSchema: Yup.object({
      branchName: Yup.string().max(255),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const response = await dispatch(
          updateBranch(branch.id, { ...values } as UpdateBranchDto)
        );
        toast.success(response.message);
        helpers.setStatus({ success: true });
      } catch (error) {
        console.error(error);
        toast.error("Algo fue mal.");
        helpers.setStatus({ success: false });
        // helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const deleteBranch = async () => {
    setDisableDeleteBtn(true);
    const res = await dispatch(removeBranch(query.branchId || 0));
    toast.success(res.message);
    setDisableDeleteBtn(false);
    router.push(`/dashboard/stores/${router.query.storeId}`);
  };

  const toggleModal = async () => {
    setOpenModal(!openModal);
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
                    display: "flex",
                    mt: 3,
                    alignItems: "center",
                  }}
                >
                  <TextField
                    label="Branch Name"
                    name="branchName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    size="small"
                    sx={{
                      flexGrow: 1,
                      mr: 3,
                    }}
                    value={formik.values.branchName}
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
                    defaultValue="dummy.account@gmail.com"
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
                  <Button>Edit</Button>
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
              <Typography variant="h6">Delete Branch</Typography>
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
              >
                Delete Branch
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
                          <Typography variant="h5">Remove branch</Typography>
                          <Typography
                            color="textSecondary"
                            sx={{ mt: 1 }}
                            variant="body2"
                          >
                            Are you sure you want to delete this branch? All of
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
                          onClick={deleteBranch}
                          variant="contained"
                        >
                          Remove
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
