import { ToppingsCategoryProps } from "@/api/models/toppingsCategory";
import {
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
import { Scrollbar } from "../../../scrollbar";
import ItemRowCategory from "./item-row-category";

type CategoryListTableProps = {
  [key: string]: any;
  categories: ToppingsCategoryProps[];
  formik: any;
  arrayHelpers: any;
};
export const CategoryListTable: React.FC<CategoryListTableProps> = (props) => {
  const { categories, formik, arrayHelpers, ...other } = props;
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const updatedCategories = [...categories]; // Copia para mantener inmutabilidad

    // Mover la categoría de origen a destino
    const [movedCategory] = updatedCategories.splice(result.source.index, 1);
    updatedCategories.splice(result.destination.index, 0, movedCategory);

    // Reasignar índices para evitar duplicados
    const recalculatedCategories = updatedCategories.map((category, index) => {
      const uniqueToppings = new Map();
      category.toppings.forEach((topping) => {
        uniqueToppings.set(topping.key, topping); // Usamos el título como clave
      });

      return {
        ...category,
        index,
        toppings: Array.from(uniqueToppings.values()).map(
          (topping, toppingIndex) => ({
            ...topping,
            index: toppingIndex, // Recalcular índices de toppings
          })
        ),
      };
    });

    // Actualizar Formik con las categorías ajustadas
    formik.setValues({
      ...formik.values,
      toppingCategories: recalculatedCategories,
    });
  };

  return (
    <div {...other}>
      <Scrollbar>
        <Table
          sx={{
            minWidth: "1100px",
            ".MuiTableBody-root .MuiTableCell-root": {
              px: 1,
              py: 2,
            },
            ".MuiTableBody-root .MuiTableCell-AddTopping": { pt: 0, pb: 1 },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell width="5%" />
              <TableCell width="35%">Nombre de la categoría</TableCell>
              <TableCell width="20%">Obligatorio?</TableCell>
              <TableCell width="35%">
                {/* How many toppings you can choose? */}
                ¿Cuántos toppings puedes elegir?
              </TableCell>
              <TableCell width="5%" align="right">
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              type="categories"
              direction="vertical"
              droppableId={`categories`}
            >
              {(provided) => (
                <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                  {categories.map((category, index) => {
                    return (
                      !category.remove && (
                        <Draggable
                          key={category?.key}
                          draggableId={`${category?.key}`}
                          index={index}
                        >
                          {(_provided) => (
                            <ItemRowCategory
                              provided={_provided}
                              key={category?.id}
                              index={index}
                              category={category}
                              formik={formik}
                              arrayHelpers={arrayHelpers}
                            />
                          )}
                        </Draggable>
                      )
                    );
                  })}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </DragDropContext>
        </Table>
      </Scrollbar>
    </div>
  );
};
