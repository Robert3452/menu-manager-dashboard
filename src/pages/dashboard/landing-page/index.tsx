import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  IconButton,
  Input,
  OutlinedInput,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { t } from "i18next";
import React, { ReactNode } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  Cancel,
  DragIndicator,
  Image as ImageIcon,
  Save,
} from "@mui/icons-material";
import { Trash as TrashIcon } from "@/icons/trash";
import EditProductImage from "@/components/dashboard/corridors/edit-product-image";
const data = [
  { id: 1, index: 1, name: "Menú", link: "" },
  { id: 2, index: 2, name: "Whatsapp", link: "" },
  { id: 3, index: 0, name: "WiFi", link: "" },
];
const LandingPage = () => {
  const ondragend = () => {};
  const onClose = () => {};
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card>
        {/* <CardHeader >
          
        </CardHeader> */}
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h3" sx={{ pb: 3 }}>
                {t("Página de presentación")}
              </Typography>
            </Grid>
            <Grid item sm={3} xs={12}>
              <EditProductImage
                // handleChange={handleChangeImage}
                // image={productImage}
                name="image"
                size="xs"
              />
            </Grid>
            <Grid
              item
              sm={9}
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" sx={{ mb: 3 }}>
                {t("Título")}
              </Typography>
              <TextField
                sx={{ mb: 2 }}
                fullWidth
                label={t("Título de presentación")}
                //   value={}
                // onChange={}
                name="title"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                {t("Descripción adicional")}
              </Typography>
              <TextField
                multiline
                rows={3}
                fullWidth
                name="Solid"
                placeholder={t("Descripción adicional")}
                // variant="solid"
              />
              {/* <Textarea name="Soft" placeholder="Type in here…" variant="soft" /> */}
            </Grid>
            <Grid item xs={12}>
              <Divider />
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell width="5%" />
                    <TableCell width="40%">{t("Nombre")}</TableCell>
                    <TableCell width="40%">{t("Item")}</TableCell>
                    <TableCell width="15%">{t("Acciones")}</TableCell>
                  </TableRow>
                </TableHead>
                <DragDropContext onDragEnd={ondragend}>
                  <Droppable
                    type="buttons"
                    direction="vertical"
                    droppableId="buttons"
                  >
                    {(provided) => (
                      <TableBody
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {data.map((el, index) => {
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
                                      //   onClick={handleRenameInit}
                                      //   value={column.name}

                                      sx={{
                                        // borderColor: "transparent",
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
                                      //   onClick={handleRenameInit}
                                      //   value={column.name}
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
                                      <Switch />
                                      <IconButton
                                        // onClick={handleDelete}
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
                      </TableBody>
                    )}
                  </Droppable>
                </DragDropContext>
              </Table>
              <Box
                sx={{
                  width: "100%",
                  minHeight: "60px",
                  backgroundColor: "background.paper",
                  position: "sticky",
                  pt:3,
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
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};
LandingPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default LandingPage;
