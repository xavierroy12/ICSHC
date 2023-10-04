import { Select, SelectItem } from '@mantine/core';

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  data: SelectItem[];
};

const CustomSelect = ({ label, value, onChange, data }: Props) => {
  console.log(value);
  console.log(data);
  return (
    <div className="input-container">
      <Select
        transitionProps={{
          transition: 'pop-top-left',
          duration: 80,
          timingFunction: 'ease',
        }}
        searchable
        placeholder="Sélectionner une option"
        label={label}
        value={value}
        data={data}
        onChange={onChange}
      />
    </div>
  );
};
export default CustomSelect;
