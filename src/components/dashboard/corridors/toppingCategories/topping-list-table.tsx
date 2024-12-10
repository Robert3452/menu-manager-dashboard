import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { Plus as PlusIcon } from "../../../../icons/plus";
import ItemRowTopping from "./item-row-topping";
import { Topping } from "@/api/models/topping";

const ToppingListTable: React.FC<any> = ({
  toppings,
  formik,
  arrayHelpers,
  indexCategory,
}) => {
  const toppingsField = `toppingCategories.${indexCategory}.toppings`;
  const addTopping = () => {
    const newTopping = {
      id: 0,
      available: true,
      title: "New Topping",
      price: 0,
      maxLimit: 0,
      required: true,
      key: uuidv4(),
    };

    const form = formik.values;
    const category = form.toppingCategories[indexCategory];
    category.toppings = [...category?.toppings, newTopping].map(
      (topping, index) => ({
        ...topping,
        index,
      })
    );
    form.toppingCategories.splice(indexCategory, 1, category);
    formik.setValues({ ...form });

    // arrayHelpers.unshift();
  };
  const onDragEnd = (result: DropResult) => {
    // Verificar si el destino es válido
    if (!result.destination) return;

    const { source, destination } = result;

    // Crear una copia de los toppings
    const updatedToppings = [...toppings];

    // Mover el elemento en el array
    const [movedTopping] = updatedToppings.splice(source.index, 1);
    updatedToppings.splice(destination.index, 0, movedTopping);

    // Eliminar duplicados basados en `key`
    const uniqueToppingsMap = new Map();
    updatedToppings.forEach((topping) => {
      uniqueToppingsMap.set(topping.key, topping); // Usar `key` como identificador único
    });

    // Reconstruir el array sin duplicados y reasignar índices
    const reorderedToppings = Array.from(uniqueToppingsMap.values()).map(
      (topping, index) => ({
        ...topping,
        index, // Reasignar índice
      })
    );

    console.log(
      "Toppings después de mover y eliminar duplicados: ",
      reorderedToppings
    );

    // Actualizar el estado de formik
    formik.setValues((prevValues: any) => {
      const updatedCategory = {
        ...prevValues.toppingCategories[indexCategory],
        toppings: reorderedToppings,
      };

      const updatedCategories = [...prevValues.toppingCategories];
      updatedCategories[indexCategory] = updatedCategory;

      return {
        ...prevValues,
        toppingCategories: updatedCategories,
      };
    });
  };

  return (
    <TableRow>
      <TableCell
        colSpan={5}
        sx={{
          p: 0,
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
        }}
      >
        <Table
          sx={{
            maxWidth: "96%",
            mt: 0,
            mr: "auto",
            ml: 2,
            ".MuiTableBody-root .MuiTableCell-root": {
              px: 1,
              py: 2,
            },
          }}
        >
          <TableHead sx={{ backgroundColor: "transparent" }}>
            <TableRow>
              <TableCell
                sx={{ backgroundColor: "transparent" }}
                className="MuiTableCell-AddTopping"
                colSpan={6}
              >
                <Button
                  onClick={addTopping}
                  startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                >
                  Topping
                </Button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell></TableCell>
              <TableCell width="40%">Topping </TableCell>
              <TableCell width="25%">Precio </TableCell>
              <TableCell width="25%">Cant. Máx. </TableCell>
              <TableCell width="10%">Disponible </TableCell>
              <TableCell align="right" width="10%">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              type="categories"
              direction="vertical"
              droppableId="categories"
            >
              {(provided) => (
                <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                  {toppings.map(
                    (topping: Topping, index: number) =>
                      !topping.remove && (
                        <Draggable
                          key={topping?.key}
                          draggableId={`${topping?.key}`}
                          index={index}
                        >
                          {(_provided) => (
                            <ItemRowTopping
                              indexCategory={indexCategory}
                              key={topping.id}
                              index={index}
                              toppingsField={toppingsField}
                              topping={topping}
                              arrayHelpers={arrayHelpers}
                              formik={formik}
                              provided={_provided}
                            />
                          )}
                        </Draggable>
                      )
                  )}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </DragDropContext>
        </Table>
      </TableCell>
    </TableRow>
  );
};

export default ToppingListTable;
