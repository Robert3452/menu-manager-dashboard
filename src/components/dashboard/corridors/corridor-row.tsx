import {
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  IconButton,
  Input,
  Menu,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import toast from "react-hot-toast";

import { useFormik } from "formik";
import * as Yup from "yup";
import { DotsHorizontal } from "../../../icons/dots-horizontal";
import { clearRow, deleteRow, updateRow } from "../../../slices/menu";
import { useDispatch, useSelector } from "../../../store";
import MenuCard from "./menu-card";
import MenuCardAdd from "./menu-card-add";

const rowSelector = (state, rowId) => {
  const { rows } = state.menu;
  return rows.byId[rowId];
};

const CorridorRow = (props) => {
  const { rowId, ...other } = props;
  const [isRenaming, setIsRenaming] = useState(false);

  const dispatch = useDispatch();
  const moreRef = useRef(null);
  const row = useSelector((state) => rowSelector(state, rowId));
  const [name, setName] = useState(row?.name || "");
  const [openMenu, setOpenMenu] = useState(false);
  
  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleRenameInit = () => {
    setIsRenaming(true);
  };
  const handleRename = async () => {
    try {
      // If name is empty use the initial row name
      if (!name) {
        setName(row.name);
        setIsRenaming(false);
        return;
      }

      // If name is equal to row name, it means there are no changes
      if (name === row.name) {
        setIsRenaming(false);
        return;
      }
      const update = { name };
      await dispatch(updateRow({ corridorId: row.id, body: update }));
      setIsRenaming(false);
      toast.success("row updated!");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  const toggleOpen = () => setOpenMenu(!openMenu);

  const handleDelete = async () => {
    try {
      setOpenMenu(false);
      const response = await dispatch(deleteRow(row.id));
      toast.success(response.message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };
  const handleClear = async () => {
    try {
      setOpenMenu(false);
      const response = await dispatch(clearRow(row.id));
      toast.success(response.message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    console.log(row)
    if (row);
    {
      const count = 0;
      if (!row?.cardIds) return;
      const currentGrid = row.cardIds.reduce((acc, curr) => {
        if (!acc[count]) acc[count] = [];

        acc[count].push(curr);
        if (acc[count].length % 3 === 0) count++;

        return acc;
      }, []);
      setGrid(currentGrid);
    }
  }, [row]);

  return (
    // <div {...other}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        px: 2,
        overflowX: "auto",
        overflowY: "hidden",
        minWidth: "100%",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          // pr: 2,
          py: 2,
        }}
      >
        {isRenaming ? (
          <>
            <ClickAwayListener onClickAway={handleRename}>
              <OutlinedInput
                autoFocus
                fullWidth
                onBlur={handleRename}
                onChange={handleChange}
                value={name}
                sx={{
                  backgroundColor: "background.paper",
                  "& .MuiInputBase-input": {
                    px: 2,
                    py: 1,
                  },
                }}
              />
            </ClickAwayListener>
          </>
        ) : (
          <Input
            disableUnderline
            fullWidth
            onClick={handleRenameInit}
            value={row.name}
            sx={{
              borderColor: "transparent",
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
        )}
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Chip
            sx={{ ml: 2 }}
            label={row?.cardIds?.length > 0 ? row?.cardIds?.length : 0}
          />
          <IconButton
            sx={{ ml: 2 }}
            edge="end"
            onClick={toggleOpen}
            ref={moreRef}
          >
            <DotsHorizontal fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "neutral.800" : "neutral.200",
          minHeight: 210,
          borderRadius: 1,
        }}
      >
        <Box sx={{ minHeight: 210 }}>
          {grid.length > 0 ? (
            grid.map((rowGrid, indexRow) => (
              <Droppable
                id={`id${indexRow}`}
                droppableId={`${row?.id}|${indexRow}`}
                key={`rowGrid${indexRow}`}
                type="grid"
                direction="horizontal"
              >
                {(provided) => (
                  <Box
                    // container
                    // spacing={2}
                    gap={2}
                    ref={provided.innerRef}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexGrow: 1,
                      minHeight: 210,
                      overflowY: "auto",
                      px: 2,
                      pt: 2,
                    }}
                    {...provided.droppableProps}
                  >
                    {rowGrid.map((cardId, index) => (
                      <Draggable
                        draggableId={`${cardId}`}
                        index={index}
                        key={cardId}
                      >
                        {(_provided, snapshot) => (
                          <MenuCard
                            cardId={cardId}
                            dragging={snapshot.isDragging}
                            index={index}
                            key={cardId}
                            row={row}
                            ref={_provided.innerRef}
                            style={{ ..._provided.draggableProps.style }}
                            {..._provided.draggableProps}
                            {..._provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            ))
          ) : (
            <Droppable
              droppableId={`${row?.id}|0`}
              type="grid"
              direction="horizontal"
            >
              {(provided) => (
                <Box
                  gap={2}
                  ref={provided.innerRef}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexGrow: 1,
                    minHeight: 210,
                    width: "100%",
                    overflowY: "auto",
                    px: 2,
                    pt: 2,
                  }}
                  {...provided.droppableProps}
                >
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          )}
        </Box>
        {/* Here add the 2d loop */}
        {/* Here add the 2d loop */}
        <Divider
          sx={{
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "neutral.700" : "neutral.300",
            pt: 3,
          }}
        />
        <Box sx={{ p: 2, alignSelf: "flex-end" }}>
          <MenuCardAdd row={row} />
        </Box>
      </Box>
      <Menu
        anchorEl={moreRef.current}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        keepMounted
        onClose={toggleOpen}
        open={openMenu}
      >
        <MenuItem onClick={handleClear}>Clear</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Box>
    // </div>
  );
};

export default CorridorRow;
