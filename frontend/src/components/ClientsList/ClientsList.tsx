import {useEffect, useRef, useState} from 'react';
import { Client } from './type';
import { FiltreGroup } from '../Filtres/type';
import { useNavigate } from 'react-router-dom';
import MUIDataTable, {
    MUIDataTableColumn,
    MUIDataTableOptions,
  } from 'mui-datatables';
  import DeleteIcon from '@mui/icons-material/Delete';
  import {
    Autocomplete,
    Button,
    CircularProgress,
    Modal,
    TextField,
    ToggleButton,
  } from '@mui/material';
  import AddGroupeFiltres from '../AddGroupeFiltres';
  import { toast } from 'react-toastify';

type selectedFiltersType = {
    actifs?:string;
    emplacement?: string;
    poste?:string;
    type_client?:string;
  };
  type currentFiltersGroupType = {
    value: number;
    label: string;
  };

const ClientsList = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showInactif, setShowInactif] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [clients, setClients] = useState<Client[]>([]);
  const [cleanClients, setCleanClients] = useState<Client[]>([]);

  const [inactifClients, setInactifClients] = useState<Client[]>([]);

 // New state to store selected filters
  const [selectedFilters, setSelectedFilters] = useState<selectedFiltersType>(
    {}
  );

  const [filtersList, setFiltersList] = useState<FiltreGroup[]>([]);
  const [filtersGroupSelect, setFiltersGroupSelect] = useState<
    { value: number; label: string }[]
  >([]);
  const [currentFiltersGroup, setCurrentFiltersGroup] =
    useState<currentFiltersGroupType>();

  let lastClickTime = 0; // To track double-clicks

  const id_user = localStorage.getItem('id_user');
  const saveButtonRef = useRef(null);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State to manage button disabled state

  const handleRowClick = (
    _rowData: string[],
    rowMeta: { dataIndex: number; rowIndex: number }
  ) => {
    const clickTime = new Date().getTime();
    const isDoubleClick = clickTime - lastClickTime < 300; // Adjust the time as needed

    lastClickTime = clickTime;

    if (isDoubleClick) {
      navigate('/client/' + clients[rowMeta.dataIndex].id);
    }
  };

  const columns = [
    {
      name: 'actifs',
      label: 'Actifs',
      options: {
        filter: true,
        sort: true,
        filterList: selectedFilters.actifs ? [selectedFilters.actifs] : [],
      },
    },
    {
      name: 'emplacement',
      label: 'Emplacement',
      options: {
        filter: true,
        sort: true,
        filterList: selectedFilters.emplacement ? [selectedFilters.emplacement] : [],
      },
    },
    {
      name: 'poste',
      label: 'Poste',
      options: {
        filter: true,
        sort: true,
        filterList: selectedFilters.poste ? [selectedFilters.poste] : [],
      },
    },
    {
      name: 'type_client',
      label: 'Type Client',
      options: {
        filter: true,
        sort: true,
        filterList: selectedFilters.type_client ? [selectedFilters.type_client] : [],
      },
    },
  ];

  const options: Partial<MUIDataTableOptions> = {
    filterType: 'dropdown',
    responsive: 'simple',
    search: true,
    filter: true,
    tableBodyHeight: 'calc(100vh - 300px)',
    pagination: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [50, 100, 200],
    onRowClick: (
      rowData: string[],
      rowMeta: { dataIndex: number; rowIndex: number }
    ) => {
      handleRowClick(rowData, rowMeta);
    },
    print: false,
    download: false,
    selectableRows: 'none',

    onFilterChange: (
        _changedColumnIndex: string | MUIDataTableColumn | null,
        displayData: string[][]
      ) => {
        setSelectedFilters({
            actifs: displayData[0][0],
            emplacement: displayData[1][0],
            poste: displayData[2][0],
            type_client: displayData[3][0],
            });
      },

  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetch(window.name + 'api/clients/list'),
      fetch(window.name + 'api/clients/inactif'),
      fetch(window.name + `api/filter/getFiltersById?id_user=${id_user}`),
    ]).then((responses) =>
      Promise.all(responses.map((response) => response.json()))
        .then(([fetchedClients, fetchedInactif, fetchedFiltersList]) => {
        setClients(fetchedClients);
          setInactifClients(fetchedInactif);
          setCleanClients(fetchedClients);
          console.log(fetchedInactif);
          setFiltersList(fetchedFiltersList.filters);
        })
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => console.error(error))
    );
  }, [id_user]);

  useEffect(() => {
    setClients(showInactif ? inactifClients : cleanClients);
  }, [showInactif, inactifClients, cleanClients]);

  useEffect(() => {
    const areAllFiltersNoSelection = Object.values(selectedFilters).every(
      (filter) => filter === undefined || filter === 'All'
    );
    setIsButtonDisabled(areAllFiltersNoSelection);
    if (areAllFiltersNoSelection) {
      setClients(cleanClients);
    }
  }, [selectedFilters, cleanClients]);

  useEffect(() => {
    if (filtersList && filtersList.length !== 0) {
      // Filter the filters based on the 'from' property
      const pageFilters = filtersList.filter(filter => filter.from === 'clients');

      // Update the filtersGroupSelect state with the new filters
      const updatedFilterOptions = pageFilters.map(
        (filter: { id: number; label: string }) => ({
          value: filter.id,
          label: filter.label,
        })
      );

      setFiltersGroupSelect(updatedFilterOptions);
    }
  }, [filtersList]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  type CustomOptionProps = {
    option: { label: string; value: number };
    onDelete: (value: number) => void;
  };

  const CustomOption = ({ option, onDelete }: CustomOptionProps) => (
    <div className="flex justify-between">
      <span>{option.label}</span>
      <DeleteIcon
        className="ml-4"
        style={{ color: 'red', cursor: 'pointer' }}
        onClick={(e) => {
          e.stopPropagation(); // Stop the event propagation
          // Prompt the user for confirmation
          if (window.confirm('Êtes-vous sûr de vouloir supprimer ce filtre?')) {
            onDelete(option.value);
            if (
              currentFiltersGroup &&
              currentFiltersGroup.value === option.value
            ) {
              setCurrentFiltersGroup(undefined); // Reset the selected filter
            }
          }
        }}
      />
    </div>
  );

  const saveFilters = (label: string) => {
    const id_user = localStorage.getItem('id_user');
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
          const data = {
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
            },
            body: JSON.stringify(data),
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

                    // Reset the selected filters and show the cleanClients
                    setSelectedFilters({});
                    setClients(cleanClients);
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
    fetch(window.name + 'api/filter/deleteFilterById?id=' + filterId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: filterId }),
    })
      .then((response) => {
        if (response.ok) {
          // Filter deleted successfully, now update the filtersList
          const updatedFiltersList = filtersList.filter(
            (filter) => filter.id !== filterId
          );

          setFiltersList(updatedFiltersList);

          // Also update the filtersGroupSelect state
          const updatedFiltersGroupSelect = filtersGroupSelect.filter(
            (option) => option.value !== filterId
          );

          setFiltersGroupSelect(updatedFiltersGroupSelect);

          // Clear the input field or perform any other necessary actions
          toast.success('Le filtre sélectionné a été supprimé avec succès!');

          // Reset the filters here
          setSelectedFilters({});
          setCurrentFiltersGroup(undefined); // Reset the selected filter label to empty string
          setClients(cleanClients);
        } else {
          toast.error('Une erreur est survenue lors de la suppression du filtre.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

 const handleCloseModal = () => {
    setClients(cleanClients);
    setOpen(false);
};

return (
    <div className="w-11/12 mx-auto mt-10">
         <div className="flex float-left mt-4 ml-4">
        <ToggleButton
        selected={showInactif}
        value={showInactif}
        onChange={() => setShowInactif(!showInactif)}
        size="small"
        color="primary"
        >
        Voir Inactif
        </ToggleButton>
     </div>
      <div className="items-end justify-end flex pb-4">
      <Autocomplete
          className="w-1/6 mr-4"
          options={filtersGroupSelect}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          onChange={async (_, newValue) => {
            if (newValue) {

              try {
                const selectedLabel = newValue.label;
                setCurrentFiltersGroup(newValue);

                const response = await fetch(
                  window.name +
                    'api/filter/getFiltersByLabel?label=' +
                    selectedLabel
                );

                if (response.ok) {
                  const selectedFilterObject = await response.json();

                  const filteredClients = cleanClients.filter((client) => {
                    return Object.keys(selectedFilterObject).every((key) => {
                      const filterValue = selectedFilterObject[key] as string;
                      return (
                        filterValue === 'All' ||
                        client[key as keyof Client] === filterValue
                      );
                    });
                  });

                  setSelectedFilters(selectedFilterObject);
                  setClients(filteredClients);
                } else {
                  console.error('Failed to fetch filter data');
                }
              } catch (error) {
                console.error('Error:', error);
              }
            }
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
              <CustomOption option={option} onDelete={deleteFilter} />
            </li>
          )}
        />
        <Button
                disabled={isButtonDisabled} // Disable the button based on the state
                ref={saveButtonRef}
                onClick={() => {
                  setOpen(true);
                }}
              >
                Sauvegarder filtre(s)
              </Button>
      </div>
      <MUIDataTable
            title={showInactif ? 'Clients Inactifs' : 'Clients'}
            data={showInactif ? inactifClients : clients}
            columns={columns}
            options={options}
        />
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="min-w-fit max-w-fit min-h-fit max-h-fit bg-white m-auto mt-20">
          <AddGroupeFiltres
            handleClose={handleCloseModal}
            saveFilters={(label) => saveFilters(label)}
            selectedFilters={selectedFilters}
          />
        </div>
      </Modal>
    </div>
  );
};
export default ClientsList;

