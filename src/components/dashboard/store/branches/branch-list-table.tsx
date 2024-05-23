import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';

import PropTypes from 'prop-types';
import { Scrollbar } from '../../../scrollbar';
import BranchItem from '../branch-item';


export const BranchListTable = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    branches,
    branchesCount,
    rowsPerPage,
    ...other
  } = props;

  return (
    <div {...other}>
      <Scrollbar>
        <Table
          sx={{ minWidth: 450 }}>
          <TableHead>
            <TableRow>
              <TableCell width="6%" >
                Id
              </TableCell>
              <TableCell width="74%">
                Name
              </TableCell>

              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {branches.map((branch) => {
              return (
                <BranchItem
                  key={branch.id}
                  branch={branch}
                  store={{ id: branch?.storeId }}
                />
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={branchesCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

BranchListTable.propTypes = {
  branches: PropTypes.array.isRequired,
  branchesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
