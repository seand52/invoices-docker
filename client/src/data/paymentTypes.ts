enum PaymentTypes {
  TRANSFERENCIA = 'Transferencia',
  TARJETA = 'Tarjeta',
  EFECTIVO = 'Efectivo',
}
export const paymentTypes = [
  { label: 'Bank Transfer', value: PaymentTypes.TRANSFERENCIA },
  { label: 'Cash', value: PaymentTypes.EFECTIVO },
  { label: 'Card', value: PaymentTypes.TARJETA },
];

export type PaymentType = { label: string; value: string };
