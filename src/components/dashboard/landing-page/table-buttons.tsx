import { Trash as TrashIcon } from "@/icons/trash";
import { Cancel, DragIndicator, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Input,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { t } from "i18next";
import { DropResult } from "react-beautiful-dnd";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { FieldArray, FieldArrayRenderProps, FormikProps } from "formik";
import { IButton } from "@/api/models/landingPage";
import { Plus } from "@/icons/plus";

interface TableButtonsProps {
  buttons?: IButton[];
  arrayHelpers: FieldArrayRenderProps;
}

const TableButtons: React.FC<TableButtonsProps> = ({
  buttons,
  arrayHelpers,
}) => {
  const ondragend = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedButtons = Array.from(buttons || []);
    if (reorderedButtons.length === 0) return;
    const [removed] = reorderedButtons.splice(result.source.index, 1);
    reorderedButtons.splice(result.destination.index, 0, removed);

    reorderedButtons.forEach((button, index) => {
      button.index = index;
    });

    arrayHelpers.form.setFieldValue("buttons", reorderedButtons);
  };
  return (
    <Grid item xs={12}>
      <Typography gutterBottom variant="h5">
        Botones {/**TODO: Contador de botones**/}
      </Typography>
      <Divider sx={{ marginBottom: "16px", marginTop: "16px" }} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="5%" />
            <TableCell width="30%">{t("Nombre")}</TableCell>
            <TableCell width="50%">{t("Item")}</TableCell>
            <TableCell width="15%">{t("Acciones")}</TableCell>
          </TableRow>
        </TableHead>
        <DragDropContext onDragEnd={ondragend}>
          <Droppable type="buttons" direction="vertical" droppableId="buttons">
            {(provided) => (
              <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                {buttons?.map((el, index) => {
                  return (
                    <Draggable
                      key={el.id}
                      draggableId={`${el.id}`}
                      index={index}
                    >
                      {(_provided) => (
                        <TableRow
                          ref={_provided.innerRef}
                          {..._provided.dragHandleProps}
                          {..._provided.draggableProps}
                          hover
                        >
                          <TableCell
                            padding="checkbox"
                            sx={{
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
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <DragIndicator />
                              {/* <IconButton onClick={()=>{}}> */}

                              {/* </IconButton> */}
                            </Box>
                          </TableCell>
                          <TableCell sx={{ py: 0 }}>
                            <Input
                              disableUnderline
                              fullWidth
                              placeholder={t("Nombre del botón")}
                              name={`buttons.${index}.name`}
                              onChange={arrayHelpers.form.handleChange}
                              onBlur={arrayHelpers.form.handleBlur}
                              value={el.name}
                              sx={{
                                borderRadius: 1,
                                borderColor: "action.selected",

                                borderStyle: "solid",
                                borderWidth: 1,
                                cursor: "text",
                                m: "-1px",
                                "&:hover": {
                                  backgroundColor: "action.selected",
                                },
                                "& .MuiInputBase-input": {
                                  fontWeight: 500,
                                  px: 2,
                                  py: 1,
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ py: 0 }}>
                            <Input
                              disableUnderline
                              fullWidth
                              placeholder={t("Enlace a donde lleva")}
                              name={`buttons.${index}.link`}
                              onChange={arrayHelpers.form.handleChange}
                              onBlur={arrayHelpers.form.handleBlur}
                              value={el.link}
                              sx={{
                                borderColor: "action.selected",
                                borderRadius: 1,
                                borderStyle: "solid",
                                borderWidth: 1,
                                cursor: "text",
                                m: "-1px",
                                "&:hover": {
                                  backgroundColor: "action.selected",
                                },
                                "& .MuiInputBase-input": {
                                  fontWeight: 500,
                                  px: 2,
                                  py: 1,
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ py: 0 }}>
                            <Box
                              display={"flex"}
                              sx={{ py: 0 }}
                              //   flexDirection={"column"}
                              justifyContent={"space-between"}
                              alignItems={"flex-start"}
                            >
                              <Switch
                                checked={el.visible}
                                onChange={(event) =>
                                  arrayHelpers.form.setFieldValue(
                                    `buttons.${index}.visible`,
                                    event.target.checked
                                  )
                                }
                              />
                              <IconButton
                                // onClick={handleDelete}
                                onClick={() => arrayHelpers.remove(index)}
                                sx={{ ml: 2 }}
                                size="small"
                                color="error"
                              >
                                <TrashIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      )}
                    </Draggable>
                  );
                })}
                <TableRow>
                  <TableCell colSpan={4} align="right">
                    <Button
                      endIcon={<Plus />}
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        arrayHelpers.push({
                          id: Date.now(),
                          name: "",
                          link: "",
                          index: buttons?.length || 0,
                        })
                      }
                    >
                      {t("Agregar botón")}
                    </Button>
                  </TableCell>
                </TableRow>
                {provided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </DragDropContext>
      </Table>
    </Grid>
  );
};

export default TableButtons;
