import {
  IconButton,
  Switch,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { Close } from "@mui/icons-material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const ItemRowTopping = ({
  topping,
  arrayHelpers,
  formik,
  index,
  toppingsField,
  indexCategory,
  provided,
  ...other
}) => {
  const [toppingForm, setToppingForm] = useState({
    id: topping?.id || 0,
    title: topping?.title || "",
    price: topping?.price || 0,
    maxLimit: topping?.maxLimit || 0,
    required: topping?.required || false,
    remove: false,
    index: topping?.index,
    key: topping?.key,
  });
  const saveChange = () => {
    arrayHelpers.replace(index, toppingForm);
  };
  const handleChange = (event, field) => {
    const current = {
      ...toppingForm,
      [field]:
        event.target.type === "checkbox"
          ? event.target?.checked
          : event.target.value,
    };
    setToppingForm(current);
    // arrayHelpers.replace(index, current);
  };

  const handleRemove = () => {
    setToppingForm({ ...toppingForm, remove: true });
    arrayHelpers.replace(index, { ...toppingForm, remove: true });
  };
  return (
    <TableRow
      key={topping.id}
      ref={provided.innerRef}
      {...provided.dragHandleProps}
      {...other}
      {...provided.draggableProps}
    >
      <TableCell>
        <DragIndicatorIcon />
      </TableCell>
      <TableCell>
        <TextField
          error={Boolean(
            formik.errors?.toppingCategories?.[indexCategory]?.toppings?.[index]
              ?.title
          )}
          helperText={
            formik.errors?.toppingCategories?.[indexCategory]?.toppings?.[index]
              ?.title
          }
          onChange={(event) => handleChange(event, "title")}
          onBlur={saveChange}
          fullWidth
          label="Name"
          name={`${toppingsField}[${index}].title`}
          value={toppingForm.title}
        />
      </TableCell>
      <TableCell>
        <TextField
          error={Boolean(
            formik.errors?.toppingCategories?.[indexCategory]?.toppings?.[index]
              ?.price
          )}
          helperText={
            formik.errors?.toppingCategories?.[indexCategory]?.toppings?.[index]
              ?.price
          }
          onChange={(event) => handleChange(event, "price")}
          type="number"
          onBlur={saveChange}
          fullWidth
          label="Price"
          name={`${toppingsField}[${index}].price`}
          value={toppingForm.price}
        />
      </TableCell>
      <TableCell>
        <TextField
          type="number"
          inputProps={{ min: 0 }}
          // inputProps={{
          //   min: 0,
          //   max: formik.values.toppingCategories[indexCategory]
          //     .maxToppingsForCategory,
          // }}
          error={Boolean(
            formik.errors?.toppingCategories?.[indexCategory]?.toppings?.[index]
              ?.maxLimit
          )}
          helperText={
            formik.errors?.toppingCategories?.[indexCategory]?.toppings?.[index]
              ?.maxLimit
          }
          onBlur={saveChange}
          fullWidth
          onChange={(event) => handleChange(event, "maxLimit")}
          label="Max quantity"
          name={`${toppingsField}[${index}].maxLimit`}
          value={toppingForm.maxLimit}
        />
      </TableCell>
      <TableCell>
        <Switch
          onBlur={saveChange}
          onChange={(event) => handleChange(event, "required")}
          checked={toppingForm.required || false}
          edge="start"
          inputProps={{ "aria-label": "controlled" }}
          name={`${toppingsField}[${index}].required`}
        />
      </TableCell>
      <TableCell align="right">
        <Tooltip title="Remove row">
          <IconButton color="error" onClick={handleRemove}>
            <Close />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default ItemRowTopping;
