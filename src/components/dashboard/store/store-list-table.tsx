import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

import PropTypes from "prop-types";
import { useState } from "react";
import { Scrollbar } from "../../scrollbar";
import StoreListItem from "./store-list-item";
import { Store } from "@/api/models/store";
type StoreListProps = {
  stores: Store[];
  storesCount: number;
  onPageChange: any;
  onRowsPerPageChange: any;
  page: number;
  rowsPerPage: number;
};

export const StoreListTable: React.FC<StoreListProps> = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    stores,
    storesCount,
    rowsPerPage,
    ...other
  } = props;
  const [openStore, setOpenStore] = useState(null);
  const handleOpenStore = (storeId: any) => {
    setOpenStore((prevValue) => (prevValue === storeId ? null : storeId));
  };

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 970 }}>
          <TableHead>
            <TableRow>
              <TableCell width="6%" />
              <TableCell width="65%">Name</TableCell>

              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stores.map((store: Store) => {
              return (
                store && (
                  <StoreListItem
                    key={`item_${store.id}`}
                    open={store.id === openStore}
                    handleOpenStore={handleOpenStore}
                    store={store}
                  />
                )
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={storesCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};
