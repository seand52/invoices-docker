import { PaymentType } from 'store/reducers/invoiceFormReducer';

interface CreateInvoiceSettings {
  clientId: number | null;
  date: string | Date;
  expirationDate?: string | Date | null;
  re: number;
  transportPrice: number;
  paymentType: PaymentType;
  tax: number;
}

export interface ICreateInvoice {
  settings: CreateInvoiceSettings;
  products: {
    quantity: number;
    discount: number;
    price: number;
    reference: string;
  }[];
}
