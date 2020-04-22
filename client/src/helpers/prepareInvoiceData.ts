import {
  InvoiceProducts,
  InvoiceSettings,
} from 'store/reducers/invoiceFormReducer';
import { ICreateInvoice } from 'forms/formValidations/add-invoice';

export const prepareInvoiceData = (
  products: InvoiceProducts[],
  settings: InvoiceSettings,
): ICreateInvoice => {
  const re = settings.tax.find(item => item.category === 're');
  const tax = settings.tax.find(item => item.category === 'tax');
  return {
    settings: {
      clientId: settings.client ? settings.client.id : null,
      date: settings.date,
      ...(settings.expirationDate && {
        expirationDate: settings.expirationDate,
      }),
      re: re ? re.value : 0,
      transportPrice: settings.transportPrice || 0,
      paymentType: settings.paymentType.value,
      tax: tax ? tax.value : 0,
    },
    products: products.map(item => ({
      quantity: item.quantity,
      discount: item.discount,
      price: item.price,
      reference: item.reference,
      description: item.description,
    })),
  };
};
