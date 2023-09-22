import { useCombobox, Combobox, InputBase, Input } from "@mantine/core";
import { FiltreProps } from "./type";


const Filtre = ({values, value, setValue,placeHolder}: FiltreProps) => {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
      });
    
      const options = values.map((v) => (
        <Combobox.Option value={v.nom} >
          {v.nom}
        </Combobox.Option>
    ));
    return (
        <Combobox
        store={combobox}
        onOptionSubmit={(val) => {
            setValue(val);
            combobox.closeDropdown();
        }}
        >
            <Combobox.Target>
                <InputBase
                component="button"
                pointer
                rightSection={<Combobox.Chevron />}
                onClick={() => combobox.toggleDropdown()}
                >
                {value || <Input.Placeholder>{placeHolder}</Input.Placeholder>}
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>    
    )
};

export default Filtre;