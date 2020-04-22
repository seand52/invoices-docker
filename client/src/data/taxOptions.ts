export const taxOptions = [
  { label: 'IVA (21%)', value: 0.21, category: 'tax' },
  { label: 'IVA (10%)', value: 0.1, category: 'tax' },
  { label: 'IVA (4%)', value: 0.04, category: 'tax' },
  { label: 'RE (5.2%)', value: 0.052, category: 're' },
  { label: 'RE (1.75%)', value: 0.175, category: 're' },
  { label: 'RE (1.4%)', value: 0.014, category: 're' },
];

export type TaxOption = {
  label: string;
  value: number;
  category: 'tax' | 're';
};
