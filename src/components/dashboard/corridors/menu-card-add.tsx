import { CorridorState } from "@/api/models/corridor";
import { Link, Typography } from "@mui/material";
import React, { useState } from "react";
import { Plus as PlusIcon } from "../../../icons/plus";
import MenuCardModal from "./menu-card-modal";
type MenuCardProps = {
  row: CorridorState;
};
const MenuCardAdd: React.FC<MenuCardProps> = (props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  return (
    <div>
       <Link
          onClick={toggleOpen}
          sx={{
            alignItems: "center",
            cursor: "pointer",
            display: "flex",
            justifyContent: "flex-start",
          }}
          underline="none"
        >
          <PlusIcon sx={{ color: "action.active" }} />
          <Typography color="textSecondary" variant="subtitle1">
            Add Card
          </Typography>
        </Link>
      <MenuCardModal row={row} onClose={toggleOpen} open={open} card={undefined} />
    </div>
  );
};

export default MenuCardAdd;
