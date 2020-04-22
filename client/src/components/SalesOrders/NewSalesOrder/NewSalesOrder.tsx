import React, { useEffect } from 'react';
import InvoiceDetailsFormContainer from 'components/Invoices/InvoiceDetailsForm/InvoiceDetailsFormContainer';
import { validateInvoice } from 'helpers/validateInvoice';
import {
  InvoiceProducts,
  InvoiceSettings,
} from 'store/reducers/invoiceFormReducer';
import Swal from 'sweetalert2';
import { alertProp } from 'utils/swal';
import { prepareInvoiceData } from 'helpers/prepareInvoiceData';
import { ICreateSalesOrder } from 'forms/formValidations/add-sales-oder';
import { newSalesOrder, resetSuccess } from 'store/actions/SalesOrderActions';
import { connect } from 'react-redux';
import { InitialState } from 'store';
import { getSalesOrderState } from 'selectors/salesOrders';
import { SalesOrderState } from 'store/reducers/salesOrdersReducer';
import { navigate } from '@reach/router';
import { clearInvoice } from 'store/actions/invoiceFormActions';
import { downloadSalesOrder } from 'helpers/makeDownloadLink';

interface Props {
  saveSalesOrder: (data: ICreateSalesOrder) => void;
  salesOrderState: SalesOrderState;
  resetSuccess: () => void;
  clearInvoice: () => void;
  dispatch: any;
}
const NewSalesOrder = ({
  saveSalesOrder,
  salesOrderState,
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
    if (salesOrderState.success) {
      downloadSalesOrder(
        salesOrderState.downloadedSalesOrder.base64salesOrder,
        salesOrderState.downloadedSalesOrder.id,
      );
      resetSuccess();
      Swal.fire(
        alertProp({
          text: 'Your sales order has been saved correctly',
          title: 'Success!',
          type: 'success',
        }),
      ).then(() => {
        navigate('/sales-orders');
      });
    }
  }, [salesOrderState.success, resetSuccess]);

  const onSubmitSalesOrder = (
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
    saveSalesOrder(data);
  };
  return (
    <InvoiceDetailsFormContainer
      title='New Sales Order'
      invoiceLoading={salesOrderState.loading}
      dispatch={dispatch}
      onSubmitInvoice={onSubmitSalesOrder}
    />
  );
};

const mapStateToProps = (state: InitialState) => {
  return {
    salesOrderState: getSalesOrderState(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveSalesOrder: (data: ICreateSalesOrder) => dispatch(newSalesOrder(data)),
    resetSuccess: () => dispatch(resetSuccess()),
    clearInvoice: () => dispatch(clearInvoice()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewSalesOrder);
