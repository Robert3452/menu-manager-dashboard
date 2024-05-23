import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "../../../store";
import * as Yup from "yup";
import { createProductCard } from "../../../slices/menu";
import toast from "react-hot-toast";
import { Box, Button, Link, OutlinedInput, Typography } from "@mui/material";
import { Plus as PlusIcon } from "../../../icons/plus";
import MenuCardModal from "./menu-card-modal";

const MenuCardAdd = (props) => {
  const { row, other } = props;
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    content: Yup.string(),
    // file: Yup.mixed(),
    // index: Yup.number(),
    // realPrice: Yup.number()
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      content: "",
      file: "",
      index: 0,
      realPrice: 0,
    },
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        setIsExpanded(false);
        helpers.resetForm();
        helpers.setStatus({ success: true });
        toast.success(response.message);
      } catch (error) {
        console.log(error);
        helpers.setStatus({ success: false });

        toast.error("Something went wrong");
      }
    },
  });
  const handleAddCancel = () => {
    formik.resetForm();
    setIsExpanded(false);
    // setName('');
  };
  const handleAddInit = () => {
    setIsExpanded(true);
  };
  return (
    <div {...other}>
      {isExpanded ? (
        <form onSubmit={formik.handleSubmit}>
          <OutlinedInput
            autoFocus
            fullWidth
            placeholder="My new task"
            name="name"
            onChange={formik.handleChange}
            sx={{
              backgroundColor: "background.paper",
              "& .MuiInputBase-input": {
                px: 2,
                py: 1,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "neutral.400",
              },
            }}
            value={formik.values.name}
          />
          <OutlinedInput
            autoFocus
            fullWidth
            placeholder="Description"
            name="content"
            onChange={formik.handleChange}
            sx={{
              backgroundColor: "background.paper",
              "& .MuiInputBase-input": {
                px: 2,
                py: 1,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "neutral.400",
              },
            }}
            value={formik.values.content}
          />
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              mt: 2,
            }}
          >
            <Button
              onClick={toggleOpen}
              size="small"
              type="submit"
              startIcon={<PlusIcon fontSize="small" />}
              variant="contained"
            >
              Add Card
            </Button>
            <Button onClick={handleAddCancel} size="small" sx={{ ml: 2 }}>
              Cancel
            </Button>
          </Box>
        </form>
      ) : (
        <Link
          onClick={toggleOpen}
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
            Add Card
          </Typography>
        </Link>
      )}
      <MenuCardModal row={row} onClose={toggleOpen} open={open} />
    </div>
  );
};

export default MenuCardAdd;
