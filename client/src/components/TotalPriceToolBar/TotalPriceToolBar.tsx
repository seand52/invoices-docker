import React from 'react';
import {
  InvoiceProducts,
  InvoiceSettings,
} from 'store/reducers/invoiceFormReducer';
import styles from './TotalPriceToolbar.module.scss';
import NumberFormatter from 'helpers/numberFormat';
import {
  calculateSubTotal,
  calculateIva,
  calculateRe,
  calculateTransport,
  roundedNumber,
} from 'helpers/calculations';

interface Props {
  products: InvoiceProducts;
  settings: InvoiceSettings;
}

const calculateTotalprice = (
  products: InvoiceProducts[],
  settings: InvoiceSettings,
) => {
  const ivaSettings = settings.tax.find(item => item.category === 'tax');
  const reSettings = settings.tax.find(item => item.category === 're');

  const subTotal = calculateSubTotal(products);
  const iva = calculateIva(ivaSettings, subTotal);
  const re = calculateRe(reSettings, subTotal);
  const transport = calculateTransport(settings);
  const invoiceTotal = subTotal + iva + re + transport;
  return {
    subTotal: roundedNumber(subTotal),
    iva: roundedNumber(iva),
    re: roundedNumber(re),
    transport: roundedNumber(transport),
    invoiceTotal: roundedNumber(invoiceTotal),
  };
};

export default function TotalPriceToolBar({ products, settings }) {
  const { subTotal, iva, re, transport, invoiceTotal } = calculateTotalprice(
    products,
    settings,
  );
  return (
    <div className={styles.price_bar}>
      <p>SubTotal: {NumberFormatter.format(subTotal)}</p>
      <p>Taxes: {NumberFormatter.format(roundedNumber(iva + re))}</p>
      <p>Transport: {NumberFormatter.format(transport)}</p>
      <p>Total: {NumberFormatter.format(invoiceTotal)}</p>
    </div>
  );
}
