import React, { useEffect, useReducer } from 'react';
import * as api from 'api/salesOrder';
import { connect } from 'react-redux';
import Layout from 'components/Layout/Layout';
import {
  searchAll,
  deleteSalesOrder,
  resetSuccess,
  searchOne,
  transformToInvoice,
} from 'store/actions/SalesOrderActions';
import { InitialState } from 'store';
import { getSalesOrderState } from 'selectors/salesOrders';
import Overview from 'components/Overview/Overview';
import Swal from 'sweetalert2';
import { alertProp, confirmationAlert } from 'utils/swal';
import { initialState, reducer } from './localReducer';
import { SalesOrderState } from 'store/reducers/salesOrdersReducer';
import { navigate } from '@reach/router';
import { getInvoiceState } from 'selectors/invoices';
import { InvoiceState } from 'store/reducers/invoicesReducer';
import { downloadSalesOrder, downloadInvoice } from 'helpers/makeDownloadLink';
import { useSetNavigation } from 'hooks/useSetNavigation';

interface Props {
  path: string;
  searchAll: ({ url: string }) => void;
  searchOne: (id) => void;
  deleteSalesOrder: (id: string) => void;
  resetSuccess: () => void;
  transformToInvoice: (id) => void;
  salesOrderState: SalesOrderState;
  invoiceState: InvoiceState;
}

interface Data {
  id: string;
  client: string;
  totalPrice: string;
  date: string;
  paymentType: string;
  actions: 'actions';
  transport: string;
}

export interface SalesOrdersHeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  nested?: { key: 'client'; property: string }[];
  currency?: boolean;
}

const headCells: SalesOrdersHeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'client',
    numeric: false,
    disablePadding: true,
    label: 'Client',
    nested: [{ key: 'client', property: 'name' }],
  },
  {
    id: 'transport',
    numeric: false,
    disablePadding: true,
    label: 'Transport',
  },
  {
    id: 'totalPrice',
    numeric: false,
    disablePadding: true,
    label: 'Price',
    currency: true,
  },

  { id: 'date', numeric: false, disablePadding: true, label: 'Date' },
  { id: 'paymentType', numeric: false, disablePadding: true, label: 'Payment' },
  { id: 'actions', numeric: false, disablePadding: true, label: 'Actions' },
];

const tableActions = [
  {
    label: '',
    value: '',
  },
  {
    label: 'Edit',
    value: 'edit',
  },
  {
    label: 'Delete',
    value: 'delete',
  },
  {
    label: 'Make invoice',
    value: 'transform',
  },
  {
    label: 'Generate PDF',
    value: 'makePDF',
  },
];

const SalesOrders = ({
  path,
  searchAll,
  salesOrderState,
  resetSuccess,
  deleteSalesOrder: deleteSalesOrderAction,
  transformToInvoice: transformToInvoiceAction,
  invoiceState,
}: Props) => {
  useSetNavigation('salesOrders');
  const [localState, localDispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    searchAll({
      url: `${process.env.REACT_APP_API_URL}/sales-orders?page=1&limit=15`,
    });
  }, []);

  useEffect(() => {
    if (salesOrderState.success) {
      localDispatch({ type: 'CLOSE_MODAL' });
      Swal.fire(
        alertProp({
          type: 'success',
          title: 'Success!',
          text: `Sales Order ${localState.action} correctly`,
        }),
      );
      resetSuccess();
      if (invoiceState.downloadedInvoice.base64invoice) {
        downloadInvoice(
          invoiceState.downloadedInvoice.base64invoice,
          invoiceState.downloadedInvoice.id,
        );
        navigate('/invoices');
        return;
      }
      navigate('/sales-orders');
    }
  }, [salesOrderState.success, resetSuccess]);

  const onSearchChange = e => {
    localDispatch({ type: 'SET_SEARCH', payload: e.target.value });
  };

  const submitSearch = e => {
    e.preventDefault();
    if (localState.search !== '') {
      searchAll({
        url: `${process.env.REACT_APP_API_URL}/sales-orders?page=1&limit=15&clientName=${localState.search}`,
      });
    } else {
      searchAll({
        url: `${process.env.REACT_APP_API_URL}/sales-orders?page=1&limit=15`,
      });
    }
  };

  const onSearchClear = () => {
    localDispatch({ type: 'SET_SEARCH', payload: '' });
    searchAll({
      url: `${process.env.REACT_APP_API_URL}/sales-orders?page=1&limit=15`,
    });
  };

  const onAddNewSalesOrder = e => {
    e.preventDefault();
    navigate('/sales-order/new');
  };

  const deleteSalesOrder = (ids: string[]) => {
    Swal.fire(
      confirmationAlert({
        title: 'Are you sure you want to delete the client?',
        confirmButtonText: 'Yes, delete it!',
      }),
    ).then(result => {
      if (result.value) {
        deleteSalesOrderAction(ids[0]);
        localDispatch({ type: 'DELETE_SALES_ORDER' });
      }
    });
  };

  const editSalesOrder = (id: string) => {
    navigate(`/sales-order/${id}/edit`);
  };

  const onNextPage = newPage => {
    searchAll({
      url: `${process.env.REACT_APP_API_URL}/sales-orders?page=${newPage}&limit=${salesOrderState.salesOrders.rowsPerPage}`,
    });
  };

  const onChangeRowsPerPage = rowsPerPage => {
    const newPageCount = Math.ceil(
      salesOrderState.salesOrders.totalItems / rowsPerPage,
    );
    searchAll({
      url: `${process.env.REACT_APP_API_URL}/sales-orders?page=${
        salesOrderState.salesOrders.currentPage > newPageCount
          ? newPageCount
          : salesOrderState.salesOrders.currentPage
      }&limit=${rowsPerPage}`,
    });
  };

  const transformToInvoice = id => {
    Swal.fire(
      confirmationAlert({
        title: 'Are you sure you want to make this sales order an invoice?',
        confirmButtonText: 'Yes, transform it!',
        text: ' ',
      }),
    ).then(result => {
      if (result.value) {
        localDispatch({ type: 'SET_ACTION', payload: 'modified' });
        transformToInvoiceAction(id);
      }
    });
  };

  const generatePdf = id => {
    api
      .generatePdf(id)
      .then(res => {
        downloadSalesOrder(res.base64, res.id);
      })
      .catch(err => {
        Swal.fire(
          alertProp({
            type: 'error',
            title: 'Gee Whiz!',
            text: err.message,
          }),
        );
      });
  };
  return (
    <div>
      <Layout
        main={
          <Overview
            title='Sales Orders'
            searchState={localState.search}
            tableActions={tableActions}
            transformToInvoice={transformToInvoice}
            onSearchClear={onSearchClear}
            loading={salesOrderState.loading}
            editItem={editSalesOrder}
            deleteItem={deleteSalesOrder}
            tableHeader={headCells}
            tableData={salesOrderState.salesOrders}
            onAddNew={onAddNewSalesOrder}
            onSearchChange={onSearchChange}
            onSubmitSearch={submitSearch}
            generatePdf={generatePdf}
            onNextPage={onNextPage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            error={salesOrderState.error}
          />
        }
      />
    </div>
  );
};

const mapStateToProps = (state: InitialState) => {
  return {
    salesOrderState: getSalesOrderState(state),
    invoiceState: getInvoiceState(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchAll: ({ url }) => dispatch(searchAll({ url })),
    searchOne: id => dispatch(searchOne(id)),
    deleteSalesOrder: id => dispatch(deleteSalesOrder(id)),
    transformToInvoice: id => dispatch(transformToInvoice(id)),
    resetSuccess: () => dispatch(resetSuccess()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SalesOrders);
