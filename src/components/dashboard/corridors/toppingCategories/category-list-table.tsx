import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Scrollbar } from "../../../scrollbar";
import ItemRowCategory from "./item-row-category";

export const CategoryListTable = (props) => {
  const { categories, formik, arrayHelpers, ...other } = props;
  const onDragEnd = (result) => {
    if (!result.destination) return;
    let updatedCategories = categories;
    const [removedCategory] = updatedCategories.splice(result.source.index, 1);
    updatedCategories.splice(result.destination.index, 0, removedCategory);
    updatedCategories = updatedCategories.map((el, index) => ({
      ...el,
      index,
    }));
    const curr = formik.values;
    formik.setValues({
      ...curr,
      toppingCategories: updatedCategories,
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
              <TableCell width="35%">Category Name</TableCell>
              <TableCell width="20%">Mandatory?</TableCell>
              <TableCell width="35%">
                How many toppings you can choose?
              </TableCell>
              <TableCell width="5%" align="right">
                Actions
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
