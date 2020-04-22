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
import { newInvoice, resetSuccess } from 'store/actions/invoiceActions';
import { connect } from 'react-redux';
import { InitialState } from 'store';
import { getInvoiceState } from 'selectors/invoices';
import { InvoiceState } from 'store/reducers/invoicesReducer';
import { navigate } from '@reach/router';
import { clearInvoice } from 'store/actions/invoiceFormActions';
import { downloadInvoice } from 'helpers/makeDownloadLink';

interface Props {
  saveInvoice: (data: ICreateInvoice) => void;
  invoiceState: InvoiceState;
  resetSuccess: () => void;
  clearInvoice: () => void;
  dispatch: any;
}
const NewInvoice = ({
  saveInvoice,
  invoiceState,
  resetSuccess,
  clearInvoice,
  dispatch,
}: Props) => {
  useEffect(() => {
    return () => {
      clearInvoice();
    };
  }, [clearInvoice]);
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
  }, [invoiceState.success, resetSuccess]);

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
    saveInvoice(data);
  };
  return (
    <React.Fragment>
      <InvoiceDetailsFormContainer
        title='New Invoice'
        invoiceLoading={invoiceState.loading}
        dispatch={dispatch}
        onSubmitInvoice={onSubmitInvoice}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state: InitialState) => {
  return {
    invoiceState: getInvoiceState(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveInvoice: (data: ICreateInvoice) => dispatch(newInvoice(data)),
    resetSuccess: () => dispatch(resetSuccess()),
    clearInvoice: () => dispatch(clearInvoice()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewInvoice);
