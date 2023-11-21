import { useEffect, useState } from 'react';
import { FieldProps } from 'formik';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SelectItem } from '../Actif/type';

interface SearchableSelectProps extends FieldProps {
  options: SelectItem[];
  label: string;
  isClearable?: boolean;
  disabled?: boolean;
}
const CustomSelect = ({
  field,
  form: { touched, errors, setFieldValue },
  options,
  label,
  isClearable = false,
  disabled = false,
}: SearchableSelectProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [value, setValue] = useState<SelectItem | null>(null);
  useEffect(() => {
    if (field.value !== undefined && field.value !== null) {
      const matchingOption = options.find(
        (option) => option.id === Number(field.value)
      );
      console.log('matchingOption:', matchingOption);
      if (matchingOption) {
        setValue(matchingOption);
      }
    }
  }, [field.value, options]);

  return (
    <Autocomplete
      disabled={disabled}
      placeholder={label}
      options={options}
      sx={{ width: 300 }}
      disableClearable={!isClearable}
      defaultValue={value}
      getOptionLabel={(option) => option.label}
      inputValue={inputValue}
      value={value}
      onChange={(_, newValue) => {
        setFieldValue(field.name, newValue ? newValue.id : null);
        setValue(newValue);
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          disabled={disabled}
          variant="outlined"
          error={touched[field.name] && Boolean(errors[field.name])}
        />
      )}
    />
  );
};

export default CustomSelect;
