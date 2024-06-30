import { Cancel, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  OutlinedInput,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { DotsHorizontal as DotsHorizontalIcon } from "../../../icons/dots-horizontal";
import { FieldArray, FormikProvider, useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import EditProductImage from "./edit-product-image";
import CategoryList from "./toppingCategories/category-list";
import { Trash as TrashIcon } from "../../../icons/trash";
import {
  createProductCard,
  deleteProductCard,
  updateProductCard,
} from "../../../slices/menu";
import { Corridor } from "@/api/models/corridor";
import { Product } from "@/api/models/product";
import { useAppDispatch } from "@/store";

type MenuCardModalProps = {
  row: Corridor;
  onClose: any;
  open: boolean;
  card?: Product;
};
const MenuCardModal: React.FC<MenuCardModalProps> = (props) => {
  const { row, onClose, open } = props;
  const product = props.card;
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const moreRef = useRef<HTMLButtonElement>(null);
  const [productImage, setProductImage] = useState<any>(product?.image);
  const [file, setFile] = useState<Blob>();
  const validationSchema = Yup.object().shape({
    id: Yup.number(),
    name: Yup.string().required(),
    content: Yup.string().required(),
    image: Yup.mixed().required(),
    realPrice: Yup.number().required(),
    index: Yup.number(),
    corridorId: Yup.number(),
    toppingCategories: Yup.array().of(
      Yup.object().shape({
        id: Yup.string(),
        remove: Yup.bool().default(false),
        index: Yup.number(),
        title: Yup.string().required(),
        minToppingsForCategory: Yup.number().required(),
        maxToppingsForCategory: Yup.number().required(),
        toppingType: Yup.string().required(),
        mandatory: Yup.boolean().required(),
        toppings: Yup.array().of(
          Yup.object().shape({
            id: Yup.string(),
            index: Yup.number(),
            remove: Yup.bool().default(false),

            available: Yup.boolean(),
            title: Yup.string().required(),
            price: Yup.number(),
            maxLimit: Yup.number(),
            required: Yup.boolean(),
          })
        ),
      })
    ),
  });
  const formik = useFormik({
    validationSchema,
    initialValues: {
      id: product?.id,
      name: product?.name || "",
      content: product?.content || "",
      image: product?.image,
      index: product?.index || 0,
      realPrice: product?.realPrice || 0,
      corridorId: row?.id || 0,
      toppingCategories: !product?.toppingCategories
        ? []
        : product?.toppingCategories.map((el) => ({
            ...el,
            key: uuidv4(),
            toppings: el.toppings.map((el) => ({ ...el, key: uuidv4() })),
          })),
    },
    onSubmit: async (values, helpers) => {
      try {
        const response = product
          ? await dispatch(
              updateProductCard({
                productId: values.id || 0,
                product: { ...values, image: file },
              })
            )
          : await dispatch(
              createProductCard({
                product: { ...values, image: file || null },
              })
            );
        toast.success(response.message);
        helpers.setStatus({ succses: true });
        onClose();
      } catch (error) {
        toast.error("Algo va mal.");
        helpers.setStatus({ success: false });
        helpers.setSubmitting(false);
      }
    },
  });
  const [productForm, setProductForm] = useState({
    id: product?.id || uuidv4(),
    name: product?.name || "",
    content: product?.content || "",
    image: product?.image || "",
    realPrice: product?.realPrice || "",
    corridorId: row?.id || 0,
  });
  const handleChange = (event: any) => {
    const value = event.target.value;
    const field = event.target.name;

    const current = {
      ...productForm,
      [field]: value,
    };
    formik.setFieldValue(field, value);
    setProductForm(current);
  };
  const saveChanges = () => {
    // formik.setValues(productForm);
  };
  const handleDeleteProduct = async () => {
    if (!product?.id) return;
    const response = await dispatch(
      deleteProductCard({ productId: product?.id || 0 })
    );
    toast.success(response.message);
    toggleMenu();
  };
  const handleChangeImage = (event: any) => {
    const reader = new FileReader();

    reader.onload = () => {
      let result = reader.result;
      setProductImage(result)

      // if (result instanceof Blob) setProductImage(result);
    };
    reader.readAsDataURL(event.target.files[0]);
    const uploadedFile = event.target.files[0];
    formik.setFieldValue("image", uploadedFile);
    setFile(uploadedFile);
  };
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };
  useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors]);

  return (
    <Dialog fullWidth maxWidth="lg" onClose={onClose} open={open}>
      <form onSubmit={formik.handleSubmit}>
        <FormikProvider value={formik}>
          <Grid
            container
            sx={{
              direction: "column-reverse",
              position: "relative",
              [theme.breakpoints.up("sm")]: { direction: "column-reverse" },
            }}
          >
            <Grid
              item
              xs={12}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              px={5}
              pt={1}
            >
              <Typography
                // color="grey.200"
                sx={{
                  mb: 2,
                  mt: 2,
                }}
                variant="h2"
              >
                Product card
              </Typography>

              <Tooltip title="options" placement="top">
                <>
                  <IconButton onClick={toggleMenu} ref={moreRef}>
                    <DotsHorizontalIcon fontSize="small" />
                  </IconButton>
                  <Menu
                    anchorEl={moreRef.current}
                    keepMounted
                    onClose={toggleMenu}
                    open={openMenu}
                  >
                    <MenuItem onClick={handleDeleteProduct}>
                      <ListItemIcon>
                        <TrashIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Delete Product" />
                    </MenuItem>
                  </Menu>
                </>
              </Tooltip>
            </Grid>
            <Grid
              item
              lg={5}
              sm={6}
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <EditProductImage
                handleChange={handleChangeImage}
                image={productImage}
                name="image"
              />
            </Grid>
            <Grid item lg={7} sm={6} xs={12}>
              <Box
                sx={{
                  py: 4,
                  px: 3,
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Basic details
                </Typography>
                <TextField
                  sx={{ mb: 2 }}
                  fullWidth
                  label="Product Name"
                  value={productForm.name}
                  onChange={handleChange}
                  onBlur={saveChanges}
                  name="name"
                />
                <TextField
                  multiline
                  label="Description"
                  fullWidth
                  rows={4}
                  onChange={handleChange}
                  name="content"
                  placeholder="Product description"
                  sx={{ mb: 2 }}
                  value={productForm.content}
                />
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Pricing
                </Typography>
                <InputLabel sx={{ mb: 1 }}>Real price</InputLabel>
                <OutlinedInput
                  startAdornment={
                    <InputAdornment position="start">PEN</InputAdornment>
                  }
                  type="number"
                  name="realPrice"
                  placeholder="0"
                  value={productForm.realPrice}
                  onChange={handleChange}
                  onBlur={saveChanges}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ py: 2, px: 3 }}>
                <FieldArray
                  name="toppingCategories"
                  render={(arrayHelpers) => (
                    <CategoryList arrayHelpers={arrayHelpers} formik={formik} />
                  )}
                />
              </Box>
            </Grid>
          </Grid>
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
              sx={{ my: 1, mr: 2 }}
              color="error"
              variant="contained"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              endIcon={<Save />}
              sx={{ my: 1, mr: 4 }}
              color="primary"
              type="submit"
              variant="contained"
            >
              Save
            </Button>
          </Box>
        </FormikProvider>
      </form>
    </Dialog>
  );
};

export default MenuCardModal;
