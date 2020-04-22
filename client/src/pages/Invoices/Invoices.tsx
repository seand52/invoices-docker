import React, { useEffect, useReducer } from 'react';
import * as api from 'api/invoice';
import { connect } from 'react-redux';
import Layout from 'components/Layout/Layout';
import {
  searchAll,
  deleteInvoice,
  resetSuccess,
  searchOne,
} from 'store/actions/invoiceActions';
import { InitialState } from 'store';
import { getInvoiceState } from 'selectors/invoices';
import Overview from 'components/Overview/Overview';
import Swal from 'sweetalert2';
import { alertProp, confirmationAlert } from 'utils/swal';
import { initialState, reducer } from './localReducer';
import { InvoiceState } from 'store/reducers/invoicesReducer';
import { navigate } from '@reach/router';
import { InvoicesPaginated } from 'api/responses/invoices.type';
import { useSetNavigation } from 'hooks/useSetNavigation';
import { downloadInvoice } from 'helpers/makeDownloadLink';

interface Props {
  path: string;
  searchAll: ({ url: string }) => void;
  searchOne: (id) => void;
  deleteInvoice: (id: string) => void;
  resetSuccess: () => void;
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

export interface InvoicesHeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  nested?: { key: 'client'; property: string }[];
  currency?: boolean;
}

const headCells: InvoicesHeadCell[] = [
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
    label: 'Generate PDF',
    value: 'makePDF',
  },
];

const Invoices = ({
  path,
  searchAll,
  searchOne,
  invoiceState,
  resetSuccess,
  deleteInvoice: deleteInvoiceAction,
}: Props) => {
  useSetNavigation('invoices');
  const [localState, localDispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    searchAll({
      url: `${process.env.REACT_APP_API_URL}/invoices?page=1&limit=15`,
    });
  }, []);

  useEffect(() => {
    if (invoiceState.success) {
      localDispatch({ type: 'CLOSE_MODAL' });
      Swal.fire(
        alertProp({
          type: 'success',
          title: 'Success!',
          text: `Invoice ${localState.action} correctly`,
        }),
      );
      resetSuccess();
      navigate('/invoices');
    }
  }, [invoiceState.success]);

  const onSearchChange = e => {
    localDispatch({ type: 'SET_SEARCH', payload: e.target.value });
  };

  const submitSearch = e => {
    e.preventDefault();
    if (localState.search !== '') {
      searchAll({
        url: `${process.env.REACT_APP_API_URL}/invoices?page=1&limit=15&clientName=${localState.search}`,
      });
    } else {
      searchAll({
        url: `${process.env.REACT_APP_API_URL}/invoices?page=1&limit=15`,
      });
    }
  };

  const onSearchClear = () => {
    localDispatch({ type: 'SET_SEARCH', payload: '' });
    searchAll({
      url: `${process.env.REACT_APP_API_URL}/invoices?page=1&limit=15`,
    });
  };

  const onAddNewInvoice = e => {
    e.preventDefault();
    navigate('/invoices/new');
  };

  const deleteInvoice = (ids: string[]) => {
    Swal.fire(
      confirmationAlert({
        title: 'Are you sure you want to delete the client?',
        confirmButtonText: 'Yes, delete it!',
      }),
    ).then(result => {
      if (result.value) {
        deleteInvoiceAction(ids[0]);
        localDispatch({ type: 'DELETE_INVOICE' });
      }
    });
  };

  const editInvoice = (id: string) => {
    navigate(`/invoice/${id}/edit`);
  };

  const onNextPage = newPage => {
    searchAll({
      url: `${process.env.REACT_APP_API_URL}/invoices?page=${newPage}&limit=${invoiceState.invoices.rowsPerPage}`,
    });
  };

  const onChangeRowsPerPage = rowsPerPage => {
    const newPageCount = Math.ceil(
      invoiceState.invoices.totalItems / rowsPerPage,
    );
    searchAll({
      url: `${process.env.REACT_APP_API_URL}/invoices?page=${
        invoiceState.invoices.currentPage > newPageCount
          ? newPageCount
          : invoiceState.invoices.currentPage
      }&limit=${rowsPerPage}`,
    });
  };

  const generatePdf = id => {
    api
      .generatePdf(id)
      .then(res => {
        downloadInvoice(res.base64, res.id);
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
          <Overview<InvoicesPaginated, InvoicesHeadCell[]>
            title='Invoices'
            searchState={localState.search}
            tableActions={tableActions}
            onSearchClear={onSearchClear}
            loading={invoiceState.loading}
            editItem={editInvoice}
            deleteItem={deleteInvoice}
            tableHeader={headCells}
            tableData={invoiceState.invoices}
            onAddNew={onAddNewInvoice}
            onSearchChange={onSearchChange}
            onSubmitSearch={submitSearch}
            generatePdf={generatePdf}
            onNextPage={onNextPage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            error={invoiceState.error}
          />
        }
      />
    </div>
  );
};

const mapStateToProps = (state: InitialState) => {
  return {
    invoiceState: getInvoiceState(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchAll: ({ url }) => dispatch(searchAll({ url })),
    searchOne: id => dispatch(searchOne(id)),
    deleteInvoice: id => dispatch(deleteInvoice(id)),
    resetSuccess: () => dispatch(resetSuccess()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Invoices);
