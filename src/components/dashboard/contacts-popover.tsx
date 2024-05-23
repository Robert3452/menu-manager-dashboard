import { useEffect } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector,  } from "@/store";
import { getContacts } from "@/slices/chat";
import { StatusIndicator } from "../status-indicator";

type ContactsPopover = {
  anchorEl: any;
  onClose: any;
  open: boolean;
};

export const ContactsPopover: React.FC<ContactsPopover> = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const dispatch = useAppDispatch();
  // const { contacts } = useSelector((state) => state.chat);
  const { contacts } = useAppSelector((state) => state.chat);

  useEffect(
    () => {
      dispatch(getContacts());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          p: 2,
          width: 320,
        },
      }}
      transitionDuration={0}
      {...other}
    >
      <Typography variant="h6">Contacts</Typography>
      <Box sx={{ mt: 2 }}>
        <List disablePadding>
          {contacts.allIds.map((contactId: string | number) => {
            const contact = contacts.byId[contactId];

            return (
              <ListItem disableGutters key={contact.id}>
                <ListItemAvatar>
                  <Avatar src={contact.avatar} sx={{ cursor: "pointer" }} />
                </ListItemAvatar>
                <ListItemText
                  disableTypography
                  primary={
                    <Link
                      color="textPrimary"
                      noWrap
                      sx={{ cursor: "pointer" }}
                      underline="none"
                      variant="subtitle2"
                    >
                      {contact.name}
                    </Link>
                  }
                />
                {contact.isActive ? (
                  <StatusIndicator size="small" status="online" />
                ) : (
                  <Typography color="textSecondary" noWrap variant="caption">
                    {formatDistanceToNowStrict(contact.lastActivity)} ago
                  </Typography>
                )}
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Popover>
  );
};
