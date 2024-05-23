import {
  Box,
  Card,
  Grid,
  Typography
} from "@mui/material";
import React, { forwardRef, useState } from "react";

import PropTypes from "prop-types";
import { useSelector } from "../../../store";
import MenuCardModal from "./menu-card-modal";

const cardSelector = (state, cardId) => {
  const { cards } = state.menu;
  const card = cards.byId[cardId];
  // debugger
  return {
    ...card,
    // members: card.memberIds.map((memberId) => members.byId[memberId])
  };
};

const MenuCard = forwardRef((props, ref) => {
  const { cardId, dragging, row, ...other } = props;
  // debugger
  const card = useSelector((state) => cardSelector(state, cardId));

  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box
        ref={ref}
        xs={4}
        lg={4}
        sx={{
          outline: "none",
          // py: 1,
          width: 340,
          height: 180,
        }}
        {...other}
      >
        <Card
          onClick={toggleOpen}
          raised={dragging}
          sx={{
            display: "flex",
            alignItems: "center",
            minHeight: 180,
            p: 2,
            ...(dragging && {
              backgroundColor: "background.paper",
            }),
            "&:hover": {
              backgroundColor: "background.default",
            },
          }}
          variant="elevation"
        >
          <Grid spacing={1} container>
            <Grid
              item
              xs={7}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Typography sx={{ mt: 1 }} variant="h5">
                {card.name}
              </Typography>
              <Typography sx={{ mt: 1 }} variant="caption">
                {card?.content?.slice(0, 50)}...
              </Typography>
              <Typography
                sx={{ mt: 1 }}
                variant="subtitle2"
                fontWeight={"bold"}
              >
                {card?.realPrice}
              </Typography>
            </Grid>
            {card.image && (
              <Grid
                item
                xs={5}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <img
                  style={{
                    alignItems: "center",
                    objectFit: "cover",
                    maxHeight: 120,
                    maxWidth: 120,
                    width: "100%",
                    height: "100%",
                    borderRadius: "8px",
                  }}
                  src={card.image}
                />

                {/* <CardMedia */}
                {/* image={card.image} */}
                {/* sx={{ height: 120 }} */}
                {/* /> */}
              </Grid>
            )}
          </Grid>
        </Card>
      </Box>
      <MenuCardModal card={card} row={row} onClose={toggleOpen} open={open} />
    </>
  );
});

MenuCard.propTypes = {
  cardId: PropTypes.any.isRequired,
  dragging: PropTypes.bool,
  index: PropTypes.number,
  row: PropTypes.object.isRequired,
  style: PropTypes.object,
};

MenuCard.defaultProps = {
  dragging: false,
};

export default MenuCard;
