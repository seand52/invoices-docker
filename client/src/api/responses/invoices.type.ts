import { PaymentType } from 'store/reducers/invoiceFormReducer';

export interface InvoicesPaginated {
  items: Invoice[];
  itemCount: number;
  totalItems: number;
  pageCount: number;
  next: string;
  previous: string;
  currentPage: number;
  rowsPerPage: number;
}

export interface InvoiceProducts {
  id: number;
  invoiceId: number;
  quantity: number;
  discount: string;
  price: string;
  reference: string;
  description: string;
}

export interface Invoice {
  id: number;
  totalPrice: number;
  re: number;
  tax: number;
  transportPrice: number;
  paymentType: PaymentType;
  userId: number;
  clientId: number;
  date: string;
  expirationDate?: string;
  createdAt: string;
  updatedAt: string;
  client: {
    name: string;
    telephone1: string;
    email: string;
  };
}

export interface FullInvoiceDetails extends Invoice {
  invoiceToProducts: InvoiceProducts[];
}
