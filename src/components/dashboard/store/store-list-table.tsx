import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';

import PropTypes from 'prop-types';
import { useState } from 'react';
import { Scrollbar } from '../../scrollbar';
import StoreListItem from './store-list-item';


export const StoreListTable = (props) => {
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
  const handleOpenStore = (storeId) => {
    setOpenStore((prevValue) => (prevValue === storeId ? null : storeId));
  };

  return (
    <div {...other}>
      <Scrollbar>
        <Table
          sx={{ minWidth: 970 }}>
          <TableHead>
            <TableRow>
              <TableCell width="6%" />
              <TableCell  width="65%">
                Name
              </TableCell>

              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stores.map((store) => {
              return (
                <StoreListItem
                  key={`item_${store.id}`}
                  open={store.id === openStore}
                  handleOpenStore={handleOpenStore}
                  store={store} />
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

StoreListTable.propTypes = {
  stores: PropTypes.array.isRequired,
  storesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
