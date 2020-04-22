import React from 'react';
import OverviewHeader from './OverviewHeader/OverviewHeader';
import OverviewTable from './OverviewTable/OverviewTable';
import { ClientsPaginated } from 'api/responses/clients.type';
import { HeadCell } from 'pages/Clients/Clients';
import { ProductsHeadCell } from 'pages/Products/Products';
import { ProductsPaginated } from 'api/responses/products.type';
import { InvoicesPaginated } from 'api/responses/invoices.type';
import { InvoicesHeadCell } from 'pages/Invoices/Invoices';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { CircularProgress } from '@material-ui/core';

export type TableOptions =
  | ClientsPaginated
  | ProductsPaginated
  | InvoicesPaginated;

export type TableHeadOptions =
  | HeadCell[]
  | ProductsHeadCell[]
  | InvoicesHeadCell[];

interface Props<T extends TableOptions, P extends TableHeadOptions> {
  searchState?: string;
  onSearchChange: (e) => void;
  onSubmitSearch: (e) => void;
  onAddNew: (e) => void;
  tableData: T;
  tableHeader: P;
  onNextPage: (newPage: number) => void;
  deleteItem: (ids: string[]) => void;
  editItem: (id: string) => void;
  onChangeRowsPerPage: (rowsPerPage: string) => void;
  loading?: boolean;
  onSearchClear?: () => void;
  transformToInvoice?: (id) => void;
  tableActions?: { label: string; value: string }[];
  newInvoice?: (id, name) => void;
  newSalesOrder?: (id, name) => void;
  generatePdf?: (id) => void;
  error: string | null;
  title: string;
}
export default function Overview<
  T extends TableOptions,
  P extends TableHeadOptions
>({
  searchState,
  onSearchChange,
  onSubmitSearch,
  onAddNew,
  tableData,
  tableHeader,
  onNextPage,
  deleteItem,
  editItem,
  onChangeRowsPerPage,
  loading,
  onSearchClear,
  transformToInvoice,
  tableActions,
  newInvoice,
  newSalesOrder,
  error,
  title,
  generatePdf,
}: Props<T, P>) {
  return (
    <div>
      <OverviewHeader
        searchState={searchState}
        onSearchClear={onSearchClear}
        onAddNew={onAddNew}
        onSearchChange={onSearchChange}
        onSubmitSearch={onSubmitSearch}
      />
      {tableData &&
      tableData.items &&
      tableData.items.length &&
      !loading &&
      !error ? (
        <OverviewTable
          generatePdf={generatePdf}
          title={title}
          newInvoice={newInvoice}
          newSalesOrder={newSalesOrder}
          tableActions={tableActions}
          transformToInvoice={transformToInvoice}
          onChangeRowsPerPage={onChangeRowsPerPage}
          deleteItem={deleteItem}
          onNextPage={onNextPage}
          tableHeader={tableHeader}
          tableData={tableData}
          editItem={editItem}
        />
      ) : loading ? (
        <CircularProgress size={75} />
      ) : (
        <p style={{ fontSize: '1.5rem' }}>
          No {title} were found... Click{' '}
          <a style={{ color: 'blue' }} href='#' onClick={e => onAddNew(e)}>
            Here
          </a>{' '}
          to create some {title}
        </p>
      )}
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
    </div>
  );
}
