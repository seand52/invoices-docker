import React, { useEffect } from 'react';
import InvoiceDetailsFormContainer from '../InvoiceDetailsForm/InvoiceDetailsFormContainer';
import { validateInvoice } from 'helpers/validateInvoice';
import {
  InvoiceProducts,
  InvoiceSettings,
} from 'store/reducers/invoiceFormReducer';
import Swal from 'sweetalert2';
import { alertProp } from 'utils/swal';
import { prepareInvoiceData } from 'helpers/prepareInvoiceData';
import { ICreateInvoice } from 'forms/formValidations/add-invoice';
import {
  resetSuccess,
  searchOne,
  updateInvoice,
} from 'store/actions/invoiceActions';
import { connect } from 'react-redux';
import { InitialState } from 'store';
import { getInvoiceState } from 'selectors/invoices';
import { InvoiceState } from 'store/reducers/invoicesReducer';
import { clearInvoice } from 'store/actions/invoiceFormActions';
import { navigate } from '@reach/router';
import { downloadInvoice } from 'helpers/makeDownloadLink';

interface Props {
  updateInvoice: (data: ICreateInvoice, id) => void;
  invoiceId: string;
  invoiceState: InvoiceState;
  resetSuccess: () => void;
  clearInvoice: () => void;
  searchOne: (id: string) => void;
  dispatch: any;
}
const EditInvoice = ({
  updateInvoice,
  invoiceState,
  resetSuccess,
  clearInvoice,
  invoiceId,
  searchOne,
  dispatch,
}: Props) => {
  useEffect(() => {
    if (invoiceState.success) {
      downloadInvoice(
        invoiceState.downloadedInvoice.base64invoice,
        invoiceState.downloadedInvoice.id,
      );
      resetSuccess();
      Swal.fire(
        alertProp({
          text: 'Your invoice has been saved correctly',
          title: 'Success!',
          type: 'success',
        }),
      ).then(() => {
        navigate('/invoices');
      });
    }
  }, [invoiceState.success]);

  useEffect(() => {
    searchOne(invoiceId);
    return () => {
      clearInvoice();
    };
  }, []);

  const onSubmitInvoice = (
    products: InvoiceProducts[],
    settings: InvoiceSettings,
  ) => {
    const res = validateInvoice(products, settings);
    if (res.type === 'error') {
      Swal.fire(
        alertProp({
          text: res.message,
          title: 'Oops...',
          type: 'error',
        }),
      );
      return;
    }
    const data = prepareInvoiceData(products, settings);
    updateInvoice(data, invoiceId);
  };

  return (
    <InvoiceDetailsFormContainer
      title='Edit Invoice'
      invoiceLoading={invoiceState.loading}
      dispatch={dispatch}
      onSubmitInvoice={onSubmitInvoice}
    />
  );
};

const mapStateToProps = (state: InitialState) => {
  return {
    invoiceState: getInvoiceState(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateInvoice: (data: ICreateInvoice, id) =>
      dispatch(updateInvoice(data, id)),
    resetSuccess: () => dispatch(resetSuccess()),
    clearInvoice: () => dispatch(clearInvoice()),
    searchOne: id => dispatch(searchOne(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditInvoice);
