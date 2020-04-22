export enum DocumentType {
  NIF = 'NIF',
  CIF = 'CIF',
  INTRA = 'INTRA',
  PASSPORT = 'PASSPORT',
}
export interface Client {
  id: number;
  name: string;
  shopName: string;
  address: string;
  city: string;
  province: string;
  postcode: string;
  telephone1: string;
  telephone2: string;
  email: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  documentType: DocumentType;
  documentNum: string;
}

export interface ClientsPaginated {
  items: Client[];
  itemCount: number;
  totalItems: number;
  pageCount: number;
  next: string;
  previous: string;
  currentPage: number;
  rowsPerPage: number;
}
