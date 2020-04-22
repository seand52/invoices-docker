import { InvoicesPaginated, Invoice, InvoiceProducts } from './invoices.type';

export interface SalesOrdersPaginated extends InvoicesPaginated {}

export interface FullSalesOrderDetails extends Invoice {
  invoiceToProducts: InvoiceProducts[];
}
