import {
  Autocomplete,
  Box,
  Grid,
  IconButton,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Close } from "@mui/icons-material";
import { FieldArray } from "formik";
import { ChevronDown as ChevronDownIcon } from "../../../../icons/chevron-down";
import { ChevronRight as ChevronRightIcon } from "../../../../icons/chevron-right";
import ToppingListTable from "./topping-list-table";

const isMandatoryOpts = [
  { value: true, name: "Requerido" },
  { value: false, name: "Opcional" },
];
const toppingTypeOpts = [
  { value: "exclusive", name: "Individual" },
  { value: "inclusive", name: "Múltiple" },
];
type ItemRowCategoryProps = {
  // dragging: any;
  category: any;
  formik: any;
  arrayHelpers: any;
  index: number;
  provided: any;
  [k: string]: any;
};
const ItemRowCategory: React.FC<ItemRowCategoryProps> = ({
  // dragging,
  category,
  formik,
  arrayHelpers,
  index,
  provided,
  ...other
}) => {
  const [amounterror, setAmounterror] = useState(false);

  const [showTopping, setShowTopping] = useState(false);
  const [individualType, setIndividualType] = useState(true);
  const currCategory = category;
  const curr = formik.values.toppingCategories[index];
  const [mandatory, setMandatory] = useState(
    category.mandatory ? isMandatoryOpts[0] : isMandatoryOpts[1]
  );
  useEffect(() => {
    const hasTestErrors =
      typeof formik.errors?.toppingCategories?.[index] === "string";
    if (hasTestErrors) setAmounterror(hasTestErrors);
    else setAmounterror(false);
  }, [formik.errors]);

  const [toppingType, setToppingType] = useState(
    toppingTypeOpts.find((el) => el.value == category.toppingType) ||
      toppingTypeOpts[0]
  );
  const handleOpenTopping = () => {
    setShowTopping(!showTopping);
  };

  const undoChanges = () => {
    arrayHelpers.replace(index, currCategory);
  };
  const [categoryForm, setCategoryForm] = useState({
    id: category?.id || 0,
    title: category?.title || "",
    minToppingsForCategory: category?.minToppingsForCategory || 0,
    maxToppingsForCategory: category?.maxToppingsForCategory || 0,
    toppingType: category?.toppingType || "",
    mandatory: category?.mandatory || false,
    toppings: formik.values?.toppingCategories?.[index]?.toppings || [],
    index: formik.values?.toppingCategories?.[index]?.index,
    key: formik.values?.toppingCategories?.[index]?.key,
  });
  const handleChange = (event: any) => {
    const value = event.target.value;
    const field = event.target.name.split(".").pop();
    const current = {
      ...categoryForm,
      [field]: value,
    };
    setCategoryForm(current);
  };
  const saveChange = () => {
    // console.log(categoryForm);
    arrayHelpers.replace(index, {
      ...categoryForm,
      toppings: formik.values?.toppingCategories?.[index]?.toppings,
    });
  };
  const handleMandatory = (event: any, newValue: any) => {
    setMandatory(newValue);
    handleChange({
      target: { value: newValue?.value, name: "field.mandatory" },
    });
  };

  const handleToppingType = (event: any, newValue: any) => {
    setToppingType(newValue);
    setIndividualType(newValue?.value === "exclusive");
    setCategoryForm({
      ...categoryForm,
      toppingType: newValue?.value || "exclusive",
      minToppingsForCategory:
        newValue?.value === "exclusive"
          ? 1
          : categoryForm.minToppingsForCategory,
      maxToppingsForCategory:
        newValue?.value === "exclusive"
          ? 1
          : categoryForm.maxToppingsForCategory,
    });
  };
  const handleRemove = () => {
    arrayHelpers.replace(index, { ...categoryForm, remove: true });
  };

  useEffect(() => {
    setIndividualType(categoryForm.toppingType === "exclusive");
  }, [categoryForm]);

  return curr ? (
    <>
      <TableRow
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        {...provided.draggableProps}
        hover
        // key={category.id}
        {...other}
      >
        <TableCell
          padding="checkbox"
          sx={{
            ...(showTopping && {
              position: "relative",
              "&:after": {
                position: "absolute",
                content: '" "',
                top: 0,
                left: 0,
                backgroundColor: "primary.main",
                width: 3,
                height: "calc(100% + 1px)",
              },
            }),
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <DragIndicatorIcon />
            <IconButton onClick={() => handleOpenTopping()}>
              {showTopping ? (
                <ChevronDownIcon fontSize="small" />
              ) : (
                <ChevronRightIcon fontSize="small" />
              )}
            </IconButton>
          </Box>
        </TableCell>
        <TableCell>
          <TextField
            autoFocus
            fullWidth
            error={Boolean(formik.errors?.toppingCategories?.[index]?.title)}
            helperText={formik.errors?.toppingCategories?.[index]?.title}
            name={`toppingCategories[${index}].title`}
            onChange={handleChange}
            onBlur={saveChange}
            value={categoryForm?.title}
          />
        </TableCell>
        <TableCell>
          <Autocomplete
            isOptionEqualToValue={(option, value) => {
              return `${option?.value}` == `${value?.value}`;
            }}
            onBlur={saveChange}
            getOptionLabel={(option) => `${option.name}`}
            getOptionKey={(option) => `${option.value}`}
            options={isMandatoryOpts}
            onChange={handleMandatory}
            value={mandatory}
            autoComplete={false}
            renderInput={(params) => (
              <TextField
                // fullWidth
                autoComplete="off"
                // label="Escoge"
                {...params}
              />
            )}
          />
        </TableCell>
        <TableCell>
          <Grid container spacing={1}>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Autocomplete
                isOptionEqualToValue={(option, value) =>
                  option?.value === value?.value
                }
                fullWidth
                getOptionLabel={(option) => option.name}
                getOptionKey={(option) => option.value}
                options={toppingTypeOpts}
                onChange={handleToppingType}
                value={toppingType}
                onBlur={saveChange}
                autoComplete={false}
                renderInput={(params) => (
                  <TextField
                    name={`toppingCategories[${index}].toppingType`}
                    // fullWidth
                    autoComplete="off"
                    // label="Escoge"
                    {...params}
                  />
                )}
              />
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                inputProps={{ min: 0 }}
                error={Boolean(
                  formik.errors?.toppingCategories?.[index]
                    ?.minToppingsForCategory || amounterror
                )}
                helperText={
                  formik.errors?.toppingCategories?.[index]
                    ?.minToppingsForCategory
                }
                type="number"
                name={`toppingCategories[${index}].minToppingsForCategory`}
                value={categoryForm?.minToppingsForCategory}
                autoComplete="off"
                // helperText={formik.touched["streetNumber"] && formik.errors["streetNumber"]}
                label="Min"
                disabled={individualType}
                // name="min"
                onBlur={saveChange}
                onChange={handleChange}
                // value={formik.values?.streetNumber}
              />
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                error={Boolean(
                  formik.errors?.toppingCategories?.[index]
                    ?.maxToppingsForCategory
                )}
                helperText={
                  formik.errors?.toppingCategories?.[index]
                    ?.maxToppingsForCategory
                }
                inputProps={{ min: individualType ? 1 : 2 }}
                type="number"
                disabled={individualType}
                autoComplete="off"
                // helperText={formik.touched["streetNumber"] && formik.errors["streetNumber"]}
                label="Máx"
                name={`toppingCategories[${index}].maxToppingsForCategory`}
                onChange={handleChange}
                onBlur={saveChange}
                value={categoryForm?.maxToppingsForCategory}
              />
            </Grid>
            {formik.errors?.toppingCategories?.[index] &&
              !formik.errors?.toppingCategories?.[index]?.title && (
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Typography variant="caption" color="error">
                    {`${formik.errors?.toppingCategories?.[index]}`}
                  </Typography>
                </Grid>
              )}
          </Grid>
        </TableCell>
        <TableCell align="right">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "100%",
            }}
          >
            {/* <Tooltip title="Save"> */}
            {/* <IconButton color="primary" onClick={handleSaveCategory}>
              <Save />
            </IconButton> */}
            {/* </Tooltip> */}
            <Tooltip title="Remove row">
              <IconButton color="error" onClick={handleRemove}>
                <Close />
              </IconButton>
            </Tooltip>
          </Box>
        </TableCell>
      </TableRow>
      <FieldArray
        name={`toppingCategories[${index}].toppings`}
        render={(toppingsArrayHelpers) =>
          showTopping && (
            <ToppingListTable
              indexCategory={index}
              formik={formik}
              arrayHelpers={toppingsArrayHelpers}
              toppings={category.toppings}
            />
          )
        }
      />
    </>
  ) : (
    // <TableBody key={category.id}  sx={{width:"100%"}} >
    // </TableBody>
    <></>
  );
};

export default ItemRowCategory;
