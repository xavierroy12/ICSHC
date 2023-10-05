import React, { useEffect, useState } from 'react';
import { FieldProps, setIn } from 'formik';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SelectItem } from '../Actif/type';

interface SearchableSelectProps extends FieldProps {
  options: SelectItem[];
  label: string;
}

const CustomSelect: React.FC<SearchableSelectProps> = ({
  field,
  form: { touched, errors, setFieldValue },
  options,
  label,
}) => {
  const [defaultValue, setDefaultValue] = useState<SelectItem>();
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (field.value) {
      setDefaultValue(options.find((option) => option.id === field.value));
      if (defaultValue) {
        setInputValue(defaultValue.label);
      }
    }
  }, [field.value]);

  return (
    <Autocomplete
      placeholder={label}
      options={options}
      sx={{ width: 300 }}
      disableClearable
      getOptionLabel={(option) => option.label}
      inputValue={inputValue}
      value={defaultValue}
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
