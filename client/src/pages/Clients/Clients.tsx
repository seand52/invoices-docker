import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import Layout from 'components/Layout/Layout';
import {
  searchAll,
  deleteClient,
  resetSuccess,
  resetError,
} from 'store/actions/clientActions';
import { InitialState } from 'store';
import { getClientsState } from 'selectors/clients';
import { ClientState } from 'store/reducers/clientsReducer';
import Overview from 'components/Overview/Overview';
import SimpleModal from 'components/SimpleModal/SimpleModal';
import ClientDetailsForm from '../../components/Clients/ClientDetailsForm/ClientDetailsForm';
import Swal from 'sweetalert2';
import { alertProp, confirmationAlert } from 'utils/swal';
import { initialState, reducer } from './localReducer';
import { makeInvoiceClient } from 'store/actions/invoiceFormActions';
import { navigate } from '@reach/router';
import { useSetNavigation } from 'hooks/useSetNavigation';

interface Props {
  path: string;
  searchAll: ({ url: string }) => void;
  deleteClient: (id: string) => void;
  resetSuccess: () => void;
  resetError: () => void;
  makeInvoiceForClient: (id, name) => void;
  clientState: ClientState;
}

interface Data {
  name: string;
  email: string;
  telephone1: string;
  telephone2: string;
  address: string;
  city: string;
  actions: 'actions';
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
  {
    id: 'telephone1',
    numeric: false,
    disablePadding: true,
    label: 'Telephone',
  },

  { id: 'address', numeric: false, disablePadding: true, label: 'Address' },
  { id: 'city', numeric: false, disablePadding: true, label: 'City' },
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
    label: 'New Invoice',
    value: 'newInvoice',
  },
  {
    label: 'New Sales Order',
    value: 'newSalesOrder',
  },
];

const Clients = ({
  searchAll,
  clientState,
  resetSuccess,
  deleteClient: deleteClientAction,
  makeInvoiceForClient,
  resetError,
}: Props) => {
  useSetNavigation('clients');
  const [localState, localDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    searchAll({
      url: `${process.env.REACT_APP_API_URL}/clients?page=1&limit=15`,
    });
  }, []);

  useEffect(() => {
    if (clientState.success) {
      localDispatch({ type: 'CLOSE_MODAL' });
      Swal.fire(
        alertProp({
          type: 'success',
          title: 'Success!',
          text: `Client ${localState.action} correctly`,
        }),
      );
      resetSuccess();
    }
  }, [clientState.success]);

  const onSearchChange = e => {
    localDispatch({ type: 'SET_SEARCH', payload: e.target.value });
  };

  const submitSearch = e => {
    e.preventDefault();
    if (localState.search !== '') {
      searchAll({
        url: `${process.env.REACT_APP_API_URL}/clients?page=1&limit=15&name=${localState.search}`,
      });
    } else {
      searchAll({
        url: `${process.env.REACT_APP_API_URL}/clients?page=1&limit=15`,
      });
    }
  };

  const onSearchClear = () => {
    localDispatch({ type: 'SET_SEARCH', payload: '' });
    searchAll({
      url: `${process.env.REACT_APP_API_URL}/clients?page=1&limit=15`,
    });
  };

  const onAddNewClient = e => {
    e.preventDefault();
    localDispatch({ type: 'ADD_CLIENT' });
    resetError();
  };

  const deleteClient = (ids: string[]) => {
    Swal.fire(
      confirmationAlert({
        title: 'Are you sure you want to delete the client?',
        confirmButtonText: 'Yes, delete it!',
      }),
    ).then(result => {
      if (result.value) {
        deleteClientAction(ids[0]);
        localDispatch({ type: 'DELETE_CLIENT' });
      }
    });
  };

  const editClient = (id: string) => {
    localDispatch({ type: 'EDIT_CLIENT', payload: id });
  };

  const onNextPage = newPage => {
    searchAll({
      url: `${process.env.REACT_APP_API_URL}/clients?page=${newPage}&limit=${clientState.clients.rowsPerPage}`,
    });
  };

  const onChangeRowsPerPage = rowsPerPage => {
    const newPageCount = Math.ceil(
      clientState.clients.totalItems / rowsPerPage,
    );
    searchAll({
      url: `${process.env.REACT_APP_API_URL}/clients?page=${
        clientState.clients.currentPage > newPageCount
          ? newPageCount
          : clientState.clients.currentPage
      }&limit=${rowsPerPage}`,
    });
  };

  const makeNewInvoiceForClient = (id, name) => {
    makeInvoiceForClient(id, name);
    navigate('invoices/new');
  };

  const makeNewSalesOrderForClient = (id, name) => {
    makeInvoiceForClient(id, name);
    navigate('sales-order/new');
  };

  return (
    <div>
      <Layout
        main={
          <Overview
            title='Clients'
            searchState={localState.search}
            newInvoice={makeNewInvoiceForClient}
            newSalesOrder={makeNewSalesOrderForClient}
            tableActions={tableActions}
            onSearchClear={onSearchClear}
            loading={clientState.loading}
            editItem={editClient}
            deleteItem={deleteClient}
            tableHeader={headCells}
            tableData={clientState.clients}
            onAddNew={onAddNewClient}
            onSearchChange={onSearchChange}
            onSubmitSearch={submitSearch}
            onNextPage={onNextPage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            error={clientState.error}
          />
        }
      />
      <SimpleModal
        open={localState.showModal}
        closeModal={() => localDispatch({ type: 'TOGGLE_MODAL' })}
      >
        <ClientDetailsForm selectedClient={localState.selectedClientId} />
      </SimpleModal>
    </div>
  );
};

const mapStateToProps = (state: InitialState) => {
  return {
    clientState: getClientsState(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchAll: ({ url }) => dispatch(searchAll({ url })),
    deleteClient: id => dispatch(deleteClient(id)),
    resetSuccess: () => dispatch(resetSuccess()),
    resetError: () => dispatch(resetError()),
    makeInvoiceForClient: (id, name) => dispatch(makeInvoiceClient(id, name)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Clients);
