import DateFnsUtils from '@date-io/date-fns';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { Product } from 'api/responses/products.type';
import ButtonWithSpinner from 'components/ButtonWithSpinner/ButtonWithSpinner';
import InputFilter from 'components/InputFilter/InputFilter';
import { PaymentType, paymentTypes } from 'data/paymentTypes';
import { TaxOption, taxOptions } from 'data/taxOptions';
import { makeZero } from 'helpers/calculations';
import NumberFormatter from 'helpers/numberFormat';
import React from 'react';
import { InvoiceDetailsState } from 'store/reducers/invoiceFormReducer';
import { InvoiceSettingKeys } from 'store/reducers/invoicesReducer';

import styles from './InvoiceDetailsForm.module.scss';

interface Props {
  clientsLoading: boolean;
  options: any;
  onClientInputChange: (e: any) => void;
  onSelectTax: (e: any, newValue: any) => void;
  onSelectInvoiceSetting: (field: InvoiceSettingKeys, newValue: any) => void;
  products: Product[];
  invoiceState: InvoiceDetailsState;
  addProductRow: () => void;
  deleteProductRow: (id) => void;
  onSelectProduct: (product: any, uuid: string) => void;
  onChangeProductQuantity: (value, uuid) => void;
  saveInvoice: () => void;
  changeDiscount: (id, value) => void;
  invoiceLoading: boolean;
  onSelectCustomProduct: (key, value, uuid) => void;
  title: string;
}
export default function InvoiceDetailsForm({
  clientsLoading,
  options,
  onClientInputChange,
  onSelectTax,
  onSelectInvoiceSetting,
  products,
  invoiceState,
  addProductRow,
  deleteProductRow,
  onSelectProduct,
  onChangeProductQuantity,
  saveInvoice,
  changeDiscount,
  invoiceLoading,
  onSelectCustomProduct,
  title = '',
}: Props) {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(invoiceState.settings.date) || new Date(),
  );
  const [
    selectedExpiration,
    setSelecteExpiration,
  ] = React.useState<Date | null>(
    invoiceState.settings.expirationDate
      ? new Date(invoiceState.settings.expirationDate)
      : null,
  );
  const handleDateChange = (
    date: Date | null,
    type: 'validFrom' | 'expiration',
  ) => {
    switch (type) {
      case 'validFrom':
        setSelectedDate(date);
        onSelectInvoiceSetting(InvoiceSettingKeys.DATE, date);
        break;
      case 'expiration':
        setSelecteExpiration(date);
        onSelectInvoiceSetting(InvoiceSettingKeys.EXPIRATION, date);
    }
  };

  return (
    <React.Fragment>
      <div className={styles.top_area}>
        <h1>{title}</h1>
        <ButtonWithSpinner
          loading={invoiceLoading}
          success={false}
          onClick={saveInvoice}
          type='button'
          text='Save'
        />
      </div>
      {/* <div className={styles.main_form_container}> */}
      <div className={styles.form_settings}>
        <InputFilter
          defaultValue={invoiceState.settings.client}
          onSelectItem={onSelectInvoiceSetting}
          onInputChange={onClientInputChange}
          loading={clientsLoading}
          options={options}
        />
        <Autocomplete
          multiple
          id='tags-standard'
          onChange={(e, newValue) => onSelectTax(e, newValue)}
          defaultValue={invoiceState.settings.tax}
          //@ts-ignore
          options={taxOptions}
          getOptionLabel={(option: TaxOption) => option.label}
          renderInput={params => (
            <TextField
              {...params}
              variant='outlined'
              label='Tax Options'
              placeholder='Favorites'
              style={{ minWidth: '350px' }}
            />
          )}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant='dialog'
            format='dd/MM/yyyy'
            id='date-picker-inline'
            label='Issue Date'
            value={selectedDate}
            onChange={date => handleDateChange(date, 'validFrom')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <Autocomplete
          id='paymentType'
          //@ts-ignore
          defaultValue={invoiceState.settings.paymentType}
          options={paymentTypes}
          //@ts-ignore
          onChange={(e, newValue: PaymentType) =>
            onSelectInvoiceSetting(InvoiceSettingKeys.PAYMENTYPE, newValue)
          }
          getOptionLabel={(option: PaymentType) => option.label}
          style={{ width: 300 }}
          renderInput={params => (
            <TextField
              {...params}
              label='Payment Type'
              variant='outlined'
              fullWidth
            />
          )}
        />
        <TextField
          defaultValue={invoiceState.settings.transportPrice}
          onChange={e =>
            onSelectInvoiceSetting(
              InvoiceSettingKeys.TRANSPORTPRICE,
              parseFloat(e.target.value),
            )
          }
          style={{ minWidth: '350px' }}
          name='transportPrice'
          label='Transport Price'
          variant='outlined'
          type='text'
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant='dialog'
            format='dd/MM/yyyy'
            id='date-picker-inline'
            label='Expiration Date'
            value={selectedExpiration}
            onChange={date => handleDateChange(date, 'expiration')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
      <div className={styles.form_products}>
        {/* <div className={styles.product}> */}
        {!invoiceState.products.length ? (
          <Button
            variant='contained'
            onClick={addProductRow}
            className={styles.btn}
          >
            Add a product
          </Button>
        ) : (
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align='left'>Quantity</TableCell>
                <TableCell align='left'>Price</TableCell>
                <TableCell align='left'>Disc. %</TableCell>
                <TableCell align='left'>Total</TableCell>
                <TableCell align='left'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceState.products.map((row, index) => (
                <TableRow key={row.uuid}>
                  <TableCell component='th' scope='row'>
                    <Autocomplete
                      freeSolo
                      //@ts-ignore
                      defaultValue={row}
                      options={products}
                      //@ts-ignore
                      onChange={(e, newProduct: Product) =>
                        onSelectProduct(newProduct, row.uuid)
                      }
                      getOptionLabel={(product: Product) => product.reference}
                      style={{ width: 300 }}
                      renderInput={params => (
                        <TextField
                          onChange={e =>
                            onSelectCustomProduct(
                              'reference',
                              e.target.value,
                              row.uuid,
                            )
                          }
                          {...params}
                          label='Product'
                          variant='outlined'
                          fullWidth
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell align='left'>
                    <TextField
                      onChange={e =>
                        onChangeProductQuantity(
                          parseInt(e.target.value),
                          row.uuid,
                        )
                      }
                      id='outlined-number'
                      label='Number'
                      defaultValue={row.quantity}
                      className={styles.quantity}
                      type='number'
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin='normal'
                      variant='outlined'
                    />
                  </TableCell>
                  <TableCell align='left'>
                    <TextField
                      id='outlined-number'
                      label='Price'
                      value={row.price}
                      onChange={e =>
                        onSelectCustomProduct('price', e.target.value, row.uuid)
                      }
                      className={styles.quantity}
                      type='number'
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin='normal'
                      variant='outlined'
                    />
                  </TableCell>
                  <TableCell align='left'>
                    <TextField
                      defaultValue={
                        isNaN(row.discount) ? 0 : row.discount * 100
                      }
                      onChange={e =>
                        changeDiscount(
                          row.uuid,
                          (parseFloat(e.target.value) / 100).toFixed(4),
                          // Math.round(
                          //   (parseFloat(e.target.value) / 100) * 100,
                          // ) / 100,
                        )
                      }
                      name='discount'
                      label='Disc. %'
                      variant='outlined'
                      type='number'
                    />
                  </TableCell>
                  <TableCell align='left'>
                    {row.price
                      ? NumberFormatter.format(
                          makeZero(
                            Math.round(
                              row.quantity *
                                row.price *
                                (1 - row.discount) *
                                100,
                            ) / 100,
                          ),
                        )
                      : NumberFormatter.format(0)}
                  </TableCell>
                  <TableCell align='left'>
                    <span onClick={addProductRow}>
                      <AddIcon
                        className={`${styles.icon} ${styles.add_icon}`}
                      />
                    </span>
                    <span onClick={() => deleteProductRow(row.uuid)}>
                      <DeleteIcon
                        className={`${styles.icon} ${styles.delete_icon}`}
                      />
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {/* </div> */}
      </div>
      {/* </div> */}
    </React.Fragment>
  );
}
