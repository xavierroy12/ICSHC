import { useState } from 'react';
import { FieldProps } from 'formik';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SelectItem } from '../Actif/type';

interface SearchableSelectProps extends FieldProps {
  options: SelectItem[];
  label: string;
  isClearable?: boolean;
}

const CustomSelect = ({
  field,
  form: { touched, errors, setFieldValue },
  options,
  label,
  isClearable = false,
}: SearchableSelectProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <Autocomplete
      placeholder={label}
      options={options}
      sx={{ width: 300 }}
      disableClearable={!isClearable}
      defaultValue={options[field.value - 1]}
      getOptionLabel={(option) => option.label}
      inputValue={inputValue}
      onChange={(_, newValue) => {
        setFieldValue(field.name, newValue);
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          error={touched[field.name] && Boolean(errors[field.name])}
        />
      )}
    />
  );
};

export default CustomSelect;
