import { CreateCorridorDto } from "@/api/menu-board-api";
import { createRow } from "@/slices/menu";
import { useAppDispatch, useAppSelector } from "@/store";
import { Box, Button, Link, OutlinedInput, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Plus as PlusIcon } from "../../../icons/plus";

const CorridorRowAdd: React.FC<any> = (props) => {
  const dispatch = useAppDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const { allIds } = useAppSelector((state) => state.menu.rows);
  const activeStoreId =
    useAppSelector((state) => state.stores.activeStoreId) || 0;
  const storesById = useAppSelector((state) => state.stores.stores.byId);
  const branchId = storesById[activeStoreId].branches?.[0].id || 0;

  const validationSchema = Yup.object().shape({
    index: Yup.number(),
    name: Yup.string().required("Este campo es requerido."),
    description: Yup.string(),
  });
  const formik = useFormik({
    initialValues: {
      index: allIds?.length ? allIds?.length : 0,
      name: "",
      description: "",
      branchesIds: [branchId],
    },
    validationSchema,
    onSubmit: async (values, helpers) => {
      console.log(values);
      try {
        const response = await dispatch(
          createRow({ ...values } as CreateCorridorDto)
        );
        setIsExpanded(false);
        toast.success(response.message);
        helpers.resetForm();
        helpers.setStatus({ success: true });
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
        helpers.setStatus({ success: false });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleAddInit = () => {
    setIsExpanded(true);
  };

  const handleAddCancel = () => {
    setIsExpanded(false);
    formik.resetForm();
  };
  return (
    <Box
      sx={{
        px: 1,
      }}
      {...props}
    >
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.200",
          borderRadius: 1,
          mt: 7,
          mx: 1,
          width: {
            xs: 300,
          },
        }}
      >
        <Box
          sx={{
            p: 2,
          }}
        >
          {isExpanded ? (
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
              onSubmit={formik.handleSubmit}
            >
              <OutlinedInput
                autoFocus
                fullWidth
                placeholder="Nuevo corredor"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                sx={{
                  backgroundColor: "background.paper",
                  "& .MuiInputBase-input": {
                    px: 2,
                    py: 1,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "grey.400",
                  },
                }}
              />
              <OutlinedInput
                autoFocus
                fullWidth
                multiline
                minRows={3}
                maxRows={3}
                placeholder="Description"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                sx={{
                  mt: 2,
                  backgroundColor: "background.paper",
                  "& .MuiInputBase-input": {
                    px: 0,
                    py: 0,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "grey.400",
                  },
                }}
              />
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 2,
                  width: "100%",
                }}
              >
                <Button
                  // onClick={handleAddConfirm}
                  size="small"
                  startIcon={<PlusIcon fontSize="small" />}
                  disabled={formik.isSubmitting}
                  type="submit"
                  variant="contained"
                >
                  Nuevo corredor
                </Button>
                <Button onClick={handleAddCancel} size="small" sx={{ ml: 2 }}>
                  Cancel
                </Button>
              </Box>
            </form>
          ) : (
            <Link
              onClick={handleAddInit}
              sx={{
                alignItems: "center",
                cursor: "pointer",
                display: "flex",
                justifyContent: "flex-start",
              }}
              underline="none"
            >
              <PlusIcon sx={{ color: "action.active" }} />
              <Typography color="textSecondary" variant="subtitle1">
                Add corridor
              </Typography>
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CorridorRowAdd;
