import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { InvoiceSettingKeys } from 'store/reducers/invoicesReducer';
import { Client } from 'api/responses/clients.type';

interface Props {
  loading: boolean;
  options: any;
  onInputChange: (e: any) => void;
  onSelectItem: (e: any, newValue: { name: string; id: number } | null) => void;
  defaultValue: any;
}
export default function InputFilter({
  loading = false,
  options = [],
  onInputChange,
  onSelectItem,
  defaultValue,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const onChange = e => {
    onInputChange(e);
  };

  return (
    <Autocomplete
      id='asynchronous-demo'
      style={{ width: 300 }}
      open={open}
      onChange={(e, newValue: Client) => {
        if (newValue) {
          onSelectItem(InvoiceSettingKeys.CLIENTID, {
            name: newValue.name,
            id: newValue.id,
          });
        } else {
          onSelectItem(InvoiceSettingKeys.CLIENTID, null);
        }
      }}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={option => option.name}
      options={options}
      defaultValue={defaultValue}
      loading={loading}
      renderInput={params => (
        <TextField
          onChange={onChange}
          {...params}
          label='Search for Client'
          fullWidth
          variant='outlined'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color='inherit' size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
