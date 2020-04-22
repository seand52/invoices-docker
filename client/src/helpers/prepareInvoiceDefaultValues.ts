import { FullInvoiceDetails } from 'api/responses/invoices.type';
import {
  InvoiceProducts,
  InvoiceSettings,
} from 'store/reducers/invoiceFormReducer';
import uuidv4 from 'uuid/v4';
import { TaxOption, taxOptions } from 'data/taxOptions';
import { FullSalesOrderDetails } from 'api/responses/sales-orders.type';
type Options = FullInvoiceDetails | FullSalesOrderDetails;
export function prepareInvoiceDefaultValues<T extends Options>(data: T) {
  const settings: InvoiceSettings = {
    client: { name: data.client.name, id: data.clientId },
    date: data.date,
    ...(data.expirationDate && { expirationDate: data.expirationDate }),
    transportPrice: data.transportPrice,
    paymentType: { label: data.paymentType, value: data.paymentType },
    tax: makeTaxArray(data),
  };
  const products: InvoiceProducts[] = data.invoiceToProducts.map(product => ({
    uuid: uuidv4(),
    quantity: product.quantity,
    price: parseFloat(product.price),
    reference: product.reference,
    description: product.description,
    discount: parseFloat(product.discount),
  }));
  return { settings, products };
}

function makeTaxArray<T extends Options>(data: T) {
  let taxes: TaxOption[] = [];
  if (!!data.tax) {
    const option = taxOptions.find(item => item.value === data.tax);
    taxes.push({
      label: option ? option.label : 'Tax',
      value: data.tax,
      category: 'tax',
    });
  }
  if (!!data.re) {
    const option = taxOptions.find(item => item.value === data.re);
    taxes.push({
      label: option ? option.label : 'Re',
      value: data.re,
      category: 're',
    });
  }
  return taxes;
}
