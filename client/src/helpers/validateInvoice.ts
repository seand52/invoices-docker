import {
  InvoiceProducts,
  InvoiceSettings,
} from 'store/reducers/invoiceFormReducer';

const isTransportInvoice = (settings, products) => {
  return (
    !products.length && settings.transportPrice && settings.transportPrice > 0
  );
};
export const validateInvoice = (
  products: InvoiceProducts[],
  settings: InvoiceSettings,
) => {
  if (!settings.client || !settings.paymentType) {
    return {
      type: 'error',
      message:
        'You must complete the required fields before saving your invoice. Check that you have selected a client and payment type',
    };
  }

  const filteredProducts = products.filter(item => item.reference !== '');
  if (
    !filteredProducts.length &&
    !isTransportInvoice(settings, filteredProducts)
  ) {
    return {
      type: 'error',
      message: 'You cannot create an invoice without any products!',
    };
  }
  return {
    message: 'ok',
    type: 'success',
  };
};
