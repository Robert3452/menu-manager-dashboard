import {
  IconButton,
  Switch,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Close } from "@mui/icons-material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Topping } from "@/api/models/topping";

type ItemRowtoppingProps = {
  topping: Topping;
  arrayHelpers: any;
  formik: any;
  index: number;
  toppingsField: any;
  indexCategory: number;
  provided: any;
  [key: string]: any;
};
const ItemRowTopping: React.FC<ItemRowtoppingProps> = ({
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
    available: topping?.available || false,
    remove: false,
    index: topping?.index,
    key: topping?.key,
  });

  const saveChange = useCallback(() => {
    arrayHelpers.replace(index, toppingForm);
  }, [toppingForm, index, arrayHelpers]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const value =
      event.target.type === "checkbox" &&
      event.target instanceof HTMLInputElement
        ? event.target.checked
        : event.target.value;

    setToppingForm((previousForm) => ({
      ...previousForm,
      [field]: value,
      index: toppingForm.remove ? -1 : index,
    }));
  };

  const handleRemove = () => {
    setToppingForm({ ...toppingForm, remove: true });
    arrayHelpers.replace(index, { ...toppingForm, remove: true, index: -1 });
  };

  useEffect(() => {
    setToppingForm((previousForm) => ({ ...previousForm, index }));
  }, [index]);

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
          inputProps={{
            min: 0,
          }}
          label="Price"
          name={`${toppingsField}[${index}].price`}
          value={toppingForm.price}
        />
      </TableCell>
      <TableCell>
        <TextField
          type="number"
          inputProps={{
            min: 0,
            max: formik.values.toppingCategories[indexCategory]
              .maxToppingsForCategory,
          }}
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
          label="Cant. Máx."
          name={`${toppingsField}[${index}].maxLimit`}
          value={toppingForm.maxLimit}
        />
      </TableCell>
      <TableCell>
        <Switch
          onBlur={saveChange}
          onChange={(event) => handleChange(event, "available")}
          checked={toppingForm.available || false}
          edge="start"
          inputProps={{ "aria-label": "controlled" }}
          name={`${toppingsField}[${index}].available`}
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
