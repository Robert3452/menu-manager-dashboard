import { Box, Container, Grid, Typography } from "@mui/material";
import React, { ReactNode, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import toast from "react-hot-toast";
import { AuthGuard } from "../../authentication/auth-guard";
import CorridorRow from "../../../components/dashboard/corridors/corridor-row";
import CorridorRowAdd from "../../../components/dashboard/corridors/corridor-row-add";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { getBoard, moveProductCard } from "../../../slices/menu";
import { ResetTvOutlined } from "@mui/icons-material";
import { Branch } from "@/api/models/branch";
import { useAppDispatch, useAppSelector } from "@/store";
type MenuBoardProps = {
  branch: Branch;
};
const MenuBoard: React.FC<MenuBoardProps> = ({ branch }) => {
  const { menu } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (branch) dispatch(getBoard({ branchId: branch?.id }));
  }, []);

  const handleDragEnd = async ({
    source,
    destination,
    draggableId,
    type,
  }: any) => {
    try {
      // Dropped outside the column
      if (type === "grid") {
        const [sourceCorridor, sourceRow] = source.droppableId.split("|");
        const [destinationCorridor, destinationRow] =
          destination.droppableId.split("|");
        if (
          sourceCorridor === destinationCorridor &&
          destinationRow === sourceRow &&
          source.index === destination.index
        ) {
          return;
        }
        const length = 3;
        // reduce 1 row if the destination is greater than source
        let excp =
          sourceRow < destinationRow && sourceCorridor !== destinationCorridor
            ? -1
            : 0;
        // Moved to the same column/row on different position
        let position = +destinationRow * length + destination.index;

        if (sourceCorridor === destinationCorridor) {
          await dispatch(
            moveProductCard({
              cardId: draggableId,
              position,
              branchId: branch?.id,
            })
          );
        } else {
          // // Moved to another column/row
          await dispatch(
            moveProductCard({
              cardId: draggableId,
              position,
              rowId: destinationCorridor,
              branchId: branch?.id,
            })
          );
        }
      }

      if (!destination) {
        return;
      }
      // Card has not been moved
      // Card has not been moved

      toast.success("Product moved!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <Box
      component={"main"}
      sx={{
        flexGrow: 1,
        py: 1,
        px: 0,
      }}
    >
      <Container maxWidth="xl" sx={{ minWidth: "1140px" }}>
        <Box sx={{ mb: 4 }}>
          <Grid
            container
            justifyContent="space-between"
            spacing={3}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid
              item
              // style={{ padding: "auto 0" }}
            >
              <Typography variant="h4">Menu</Typography>
            </Grid>
            <DragDropContext onDragEnd={handleDragEnd}>
              {menu.rows.allIds.length > 0 &&
                menu?.rows.allIds.map((rowId) => (
                  <CorridorRow rowId={rowId} key={`row_${rowId}`} />
                ))}
              <CorridorRowAdd />
            </DragDropContext>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
export default MenuBoard;
