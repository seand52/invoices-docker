import { FormControl, MenuItem, Select } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import Paper from '@material-ui/core/Paper';
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import clsx from 'clsx';
import NumberFormatter from 'helpers/numberFormat';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { searchAll, searchAllOk } from 'store/actions/clientActions';
import { TableHeadOptions, TableOptions } from '../Overview';

interface EnhancedTableProps<P extends TableHeadOptions> {
  numSelected: number;
  // onSelectAllClick: (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   checked: boolean,
  // ) => void;
  rowCount: number;
  headCells: P;
}

function EnhancedTableHead<P extends TableHeadOptions>(
  props: EnhancedTableProps<P>,
) {
  const { numSelected, rowCount } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            // onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {/* 
        //@ts-ignore */}
        {props.headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align='left'
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }),
);

interface EnhancedTableToolbarProps {
  title: string;
  numSelected: number;
  deleteItem: (ids: string[]) => void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color='inherit'
          variant='subtitle1'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant='h4' id='tableTitle'>
          {props.title}
        </Typography>
      )}
      {numSelected > 0 ? (
        // @ts-ignore
        <Tooltip onClick={props.deleteItem} title='Delete'>
          <IconButton aria-label='delete'>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton aria-label='filter list'>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);

interface Props<T extends TableOptions, P extends TableHeadOptions> {
  tableHeader: P;
  tableData: T;
  searchAll: ({ url: string }) => void;
  onNextPage: (newPage: number) => void;
  deleteItem: (ids: string[]) => void;
  editItem: (id: string) => void;
  transformToInvoice?: (id: string) => void;
  onChangeRowsPerPage: (rowsPerPage: string) => void;
  tableActions?: { label: string; value: string }[];
  newInvoice?: (id, name) => void;
  newSalesOrder?: (id, name) => void;
  generatePdf?: (id) => void;
  title: string;
}

function OverviewTable<T extends TableOptions, P extends TableHeadOptions>({
  tableHeader,
  tableData,
  onNextPage,
  deleteItem,
  editItem,
  onChangeRowsPerPage,
  transformToInvoice,
  tableActions,
  newInvoice,
  newSalesOrder,
  title,
  generatePdf,
}: Props<T, P>) {
  const classes = useStyles();
  const [selected, setSelected] = useState<string[]>([]);

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    /* need to send newPage + 1 because the pagination component is 0 indexed 
    whereas the API starts at page = 1
    */
    onNextPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const numberOfRows = event.target.value;
    onChangeRowsPerPage(numberOfRows);
  };

  const handleAction = (e, clientData) => {
    const action = e.target.value;
    switch (action) {
      case 'delete':
        deleteItem([clientData.id]);
        break;
      case 'edit':
        editItem(clientData.id);
        break;
      case 'transform':
        if (transformToInvoice) {
          transformToInvoice(clientData.id);
        }
        break;
      case 'newInvoice':
        if (newInvoice) {
          newInvoice(clientData.id, clientData.name);
        }
        break;
      case 'newSalesOrder':
        if (newSalesOrder) {
          newSalesOrder(clientData.id, clientData.name);
        }
        break;
      case 'makePDF':
        if (generatePdf) {
          generatePdf(clientData.id);
        }
    }
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          title={title}
          deleteItem={() => deleteItem(selected)}
          numSelected={selected.length}
        />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby='tableTitle'
            size='medium'
            aria-label='enhanced table'
          >
            <EnhancedTableHead
              numSelected={selected.length}
              rowCount={tableData.totalItems}
              headCells={tableHeader}
            />
            <TableBody>
              {/* 
        //@ts-ignore */}
              {tableData.items.map((row, index) => {
                const isItemSelected = isSelected(row.id.toString());
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role='checkbox'
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox
                        onClick={event => handleClick(event, row.id.toString())}
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    {/* 
        //@ts-ignore */}
                    {tableHeader.map((item, index) => {
                      if (item.id === 'actions') {
                        return (
                          <TableCell key={item.id} padding='none' align='left'>
                            <FormControl
                              variant='filled'
                              style={{
                                minWidth: '80px',
                                margin: '10px',
                              }}
                            >
                              <Select
                                labelId='demo-simple-select-outlined-label'
                                id='demo-simple-select-outlined'
                                value=''
                                variant='standard'
                                onChange={e =>
                                  handleAction(e, {
                                    id: row.id.toString(),
                                    name: row.name,
                                  })
                                }
                                labelWidth={50}
                              >
                                {tableActions &&
                                  tableActions.map((item, index) => (
                                    <MenuItem key={index} value={item.value}>
                                      {item.label}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          </TableCell>
                        );
                      }
                      if (item.nested && item.nested.length) {
                        return item.nested.map((i, __index) => (
                          <TableCell key={__index} padding='none' align='left'>
                            {row[i.key][i.property]}
                          </TableCell>
                        ));
                      }
                      if (item.id === 'transport') {
                        return (
                          <TableCell key={item.id} padding='none' align='left'>
                            {row.isTransport ? <CheckIcon /> : null}
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={item.id} padding='none' align='left'>
                          {item.currency
                            ? NumberFormatter.format(row[item.id])
                            : row[item.id]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[15, 30, 45]}
          component='div'
          count={tableData.totalItems}
          rowsPerPage={tableData.rowsPerPage}
          page={tableData.currentPage - 1}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    searchAll: ({ url }) => dispatch(searchAll({ url })),
    searchAllOk: clients => dispatch(searchAllOk(clients)),
  };
};

export default connect(null, mapDispatchToProps)(OverviewTable);
