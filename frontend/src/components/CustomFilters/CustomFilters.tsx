import {
  Autocomplete,
  Button,
  IconButton,
  Modal,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { Fragment, useState } from 'react';

import AddGroupeFiltres from '../AddGroupeFiltres';
import { toast } from 'react-toastify';
import CustomOption from '../CustomOption';
import { selectedFiltersType as actifSelectedFilterType } from '../ActifsList/ActifsList';
import { selectedFiltersType as clientSelectedFilterType } from '../ClientsList/ClientsList';
import { Actif } from '../ActifsList/type';
import { Client } from '../ClientsList/type';
import { FiltreGroup } from '../Filtres/type';

type SelectedFilter = actifSelectedFilterType | clientSelectedFilterType;
export type DataType = Actif | Client;

type Props = {
  selectedFilters: SelectedFilter;
  setSelectedFilters: (value: SelectedFilter) => void;
  setFiltersList: (value: FiltreGroup[]) => void;
  filtersList: { id: number; label: string }[];
  data: DataType[];
  setData: React.Dispatch<React.SetStateAction<DataType[]>>;
  resetData: () => void;
  currentFiltersGroup: { value: number; label: string } | undefined;
  setCurrentFiltersGroup: (
    value: { value: number; label: string } | undefined
  ) => void;
  isButtonDisabled: boolean;
  saveButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
  filtersGroupSelect: { value: number; label: string }[];
  setFiltersGroupSelect: (value: { value: number; label: string }[]) => void;
};

interface Filterable {
  [key: string]: string | number | boolean;
}
const CustomFilters = ({
  selectedFilters,
  setSelectedFilters,
  setFiltersList,
  data,
  setData,
  currentFiltersGroup,
  setCurrentFiltersGroup,
  isButtonDisabled,
  saveButtonRef,
  filtersGroupSelect,
  setFiltersGroupSelect,
}: Props) => {
  const [open, setOpen] = useState(false);
  const id_user = localStorage.getItem('id_user') || 'unknown'; // retrieve id_user from local storage, default to 'unknown';
  const saveFilters = (label: string) => {

    const urlParts = window.location.pathname.split('/');
    const from = urlParts[urlParts.length - 1];

    // First, check if a filter with the same label already exists
    fetch(
      window.name +
        `api/filter/checkLabelExists?label=${label}&id_user=${id_user}`,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.exists) {
          // Alert the user that the label already exists
          toast.error(
            'Un filtre portant ce nom existe déjà. Veuillez entrer un autre nom svp.'
          );
        } else {
          // If the label is unique, proceed to save it
          const tempData = {
            id_user: id_user,
            filters: selectedFilters,
            from: from,
            label: label,
          };

          // Send the JSON data to the server to save in the database
          fetch(window.name + 'api/filter/saveFilters', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-User-Action-Id': id_user, // send the user id in a custom header
            },
            body: JSON.stringify(tempData),
          })
            .then((response) => {
              if (response.ok) {
                toast.success(
                  'Le(s) filtre(s) selectionné(s) ont été enregistrés avec succès!'
                );
                setOpen(false);

                // After the filters are saved successfully, fetch the updated filter list
                fetch(
                  window.name + `api/filter/getFiltersById?id_user=${id_user}`
                )
                  .then((response) => response.json())
                  .then((newFiltersData) => {
                    setFiltersList(newFiltersData.filters);

                    // Update the filtersGroupSelect state with the new filters
                    const updatedFilterOptions = newFiltersData.filters.map(
                      (filter: { id: number; label: string }) => ({
                        value: filter.id,
                        label: filter.label,
                      })
                    );

                    setFiltersGroupSelect(updatedFilterOptions);

                    // Apply the newly created filter
                    if (label) {
                      const selectedFilterObject = newFiltersData.filters.find(
                        (filter: { label: string }) => filter.label === label
                      );
                      if (selectedFilterObject) {
                        const filteredData = data.filter((d: Filterable) => {
                          return Object.keys(selectedFilterObject).every(
                            (key) => {
                              const filterValue = selectedFilterObject[
                                key
                              ] as string;
                              return (
                                filterValue === 'All' || d[key] === filterValue
                              );
                            }
                          );
                        });
                        setSelectedFilters(selectedFilterObject);
                        setData(filteredData);
                      }
                    }
                  })
                  .catch((error) => {
                    console.error('Error:', error);
                  });
              } else {
                console.error('Failed to save selected filters.');
              }
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error checking label existence:', error);
      });
  };

  const deleteFilter = (filterId: number) => {
    // Send a POST request to delete the filter
    fetch(window.name + 'api/filter/deleteFilterById?id=', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: filterId }),
    })
      .then((response) => {
        if (response.ok) {
          toast.success(
            'Le(s) filtre(s) selectionné(s) ont été enregistrés avec succès!'
          );
          setOpen(false);

          // After the filters are saved successfully, fetch the updated filter list
          fetch(window.name + `api/filter/getFiltersById?id_user=${id_user}`)
            .then((response) => response.json())
            .then((newFiltersData) => {
              setFiltersList(newFiltersData.filters);

              // Update the filtersGroupSelect state with the new filters
              const updatedFilterOptions = newFiltersData.filters.map(
                (filter: { id: number; label: string }) => ({
                  value: filter.id,
                  label: filter.label,
                })
              );

              setFiltersGroupSelect(updatedFilterOptions);
            });
        } else {
          toast.error('Une erreur est survenue lors de la supression du filtre');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  const localDarkMode = window.localStorage.getItem('darkMode');
  const modalBgColor =
    localDarkMode === 'true' ? 'bg-slate-600' : 'bg-slate-100';

  const onChange = async (
    newValue: {
      value: number;
      label: string;
    } | null
  ) => {
    if (!newValue) return;
    const newValueExists = filtersGroupSelect.some(
      (option) => option.value === newValue.value
    );

    if (newValueExists) {
      // The newValue is a valid option, so you can set it as the value.
      setCurrentFiltersGroup(newValue);
    } else {
      // The newValue doesn't exist in the options, so clear the selected value.
      setCurrentFiltersGroup(undefined);
    }

    try {
      const selectedLabel = newValue.label;
      setCurrentFiltersGroup(newValue); // Set the currently selected filter group label

      const response = await fetch(
        window.name + 'api/filter/getFiltersByLabel?label=' + selectedLabel
      );

      if (response.ok) {
        const selectedFilterObject = await response.json();

        // Filtrer vos données (actifs) en fonction des filtres sélectionnés

        const filteredData = data.filter((d: Filterable) => {
          // Check if the item matches all selected filters
          return Object.keys(selectedFilterObject).every((key) => {
            const filterValue = selectedFilterObject[key] as string;

            // Compare the item's value with the filter value
            return filterValue === 'All' || d[key] === filterValue;
          });
        });

        // Mettez à jour les filtres sélectionnés et les données actives
        setSelectedFilters(selectedFilterObject);
        setData(filteredData);
      } else {
        console.error('Failed to fetch filter data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <Fragment>
      <div className="items-end justify-end flex pb-4 w-full">
        <Autocomplete
          className="mr-4"
          sx={{ width: 250 }}
          options={filtersGroupSelect}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          onChange={async (_, newValue) => {
            if (newValue) onChange(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Mes filtres personnels"
            />
          )}
          renderOption={(props, option) => (
            <li {...props}>
              <CustomOption
                option={option}
                onDelete={deleteFilter}
                currentFiltersGroup={currentFiltersGroup}
                setCurrentFiltersGroup={setCurrentFiltersGroup}
              />
            </li>
          )}
        />

        <Button
          disabled={isButtonDisabled} // Disable the button based on the state
          ref={saveButtonRef}
          onClick={() => {
            setOpen(true);
          }}
          className="my-auto"
        >
          Sauvegarder filtre(s)
        </Button>
      </div>
      <Modal open={open} onClose={handleCloseModal}>
        <div className={'m-auto p-4 py-10 w-fit align-right ' + modalBgColor}>
          <IconButton
            tabIndex={0}
            onClick={() => setOpen(false)}
            className="float-right"
          >
            <CloseIcon />
          </IconButton>
          <AddGroupeFiltres
            handleClose={handleCloseModal}
            saveFilters={(label) => saveFilters(label)}
            selectedFilters={selectedFilters}
          />
        </div>
      </Modal>
    </Fragment>
  );
};
export default CustomFilters;
