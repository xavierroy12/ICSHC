import { useEffect, useRef, useState } from 'react';
import { Actif } from './type';
import { FiltreGroup } from '../Filtres/type';
import { useNavigate } from 'react-router-dom';
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Autocomplete,
  Button,
  CircularProgress,
  Modal,
  TextField,
  ToggleButton,
} from '@mui/material';
import { LightActif } from '../ActifsListSelect/type';
import ActifsSelect from '../ActifsSelect/ActifsSelect';
import AddGroupeFiltres from '../AddGroupeFiltres';

const ActifsList = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showarchived, setShowArchived] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>();

  const [actifs, setActifs] = useState<Actif[]>([]);
  const [cleanActifs, setCleanActifs] = useState<Actif[]>([]);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [archivedActifs, setArchivedActifs] = useState<Actif[]>([]);

  // New state to store selected filters
  const [selectedFilters, setSelectedFilters] = useState<any>({});
  const [filtersList, setFiltersList] = useState<FiltreGroup[]>([]);
  const [filtersGroupSelect, setFiltersGroupSelect] = useState<{ value: number; label: string }[]>([]);
  const [currentFiltersGroup, setCurrentFiltersGroup] = useState<any>({});

  const [showListSelect, setShowListSelect] = useState(false);
  const [selectedActifs, setSelectedActifs] = useState<LightActif[]>([]);
  let lastClickTime = 0; // To track double-clicks

  const ref = useRef(null);
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
      navigate('/actif/' + actifs[rowMeta.dataIndex].id);
    }
  };

  const columns = [
    {
      name: 'numero_serie',
      label: 'Numéro de série',
      options: {
        filter: false,
        sort: true,
        filterList: selectedFilters.numero_serie ? [selectedFilters.numero_serie]: [],
      },
    },
    {
      name: 'nom',
      label: 'Nom',
      options: {
        filter: false,
        sort: true,
        filterList: selectedFilters.nom ? [selectedFilters.nom] : [],
      },
    },
    {
      name: 'modele',
      label: 'Modèle',
      options: {
        filter: true,
        sort: true,
        filterList: selectedFilters.modele ? [selectedFilters.modele] : [], // Apply filter if 'client' is selected
      },
    },
    {
      name: 'categorie',
      label: 'Catégorie',
      options: {
        filter: true,
        sort: true,
        filterList: selectedFilters.categorie ? [selectedFilters.categorie]: [],
      },
    },
    {
      name: 'statut',
      label: 'Statut',
      options: {
        filter: true,
        sort: true,
        filterList: selectedFilters.statut ? [selectedFilters.statut] : [], // Apply filter if 'client' is selected
      },
    },
    {
      name: 'client',
      label: 'Assigné à',
      options: {
        filter: true,
        sort: true,
        filterList: selectedFilters.client ? [selectedFilters.client] : [], // Apply filter if 'client' is selected
      },
    },
    {
      name: 'emplacement',
      label: 'Emplacement',
      options: {
        filter: true,
        sort: true,
        filterList: selectedFilters.emplacement
          ? [selectedFilters.emplacement]: [],
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
    selectableRowsHeader: false,
    selectToolbarPlacement: 'none',
    onRowSelectionChange: (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _currentRowsSelected,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      allRowsSelected
    ) => {
      const selectedIds = allRowsSelected.map(
        (row) => actifs[row.dataIndex].id
      );
      setSelectedRows(selectedIds);
    },
    onRowClick: handleRowClick,
    print: false,
    download: false,

    onFilterChange: (changedColumnIndex: any, displayData: string[][]) => {
      setSelectedFilters({
        modele: displayData[2][0],
        categorie: displayData[3][0],
        statut: displayData[4][0],
        client: displayData[5][0],
        emplacement: displayData[6][0],
      });
    },
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetch(window.name + 'api/actifs'),
      fetch(window.name + 'api/actifs/archived'),
      fetch(window.name + 'api/filter/getFilters'),
    ]).then((responses) =>
      Promise.all(responses.map((response) => response.json()))
        .then(([fetchedActif, fetchedArchived, fetchedFiltersList]) => {
          setActifs(fetchedActif);
          setCleanActifs(fetchedActif);
          setArchivedActifs(fetchedArchived);
          setFiltersList(fetchedFiltersList.filters);
        })
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => console.error(error))
    );
  }, []);
  useEffect(() => {
    if (filtersList.length !== 0) {
      setFiltersGroupSelect(
        filtersList.map((filter) => {
          return { value: filter.id, label: filter.label };
        })
      );
    }
  }, [filtersList]);

  useEffect(() => {
    const areAllFiltersNoSelection = Object.values(selectedFilters).every(
      (filter) => filter === undefined || filter === 'All'
    );
    setIsButtonDisabled(areAllFiltersNoSelection);
    console.log('Button is disabled:', areAllFiltersNoSelection);
    setActifs(cleanActifs);
  }, [selectedFilters]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  const handleSubmit = () => {
    setShowListSelect(false);
    const selectedRows = selectedActifs.map((actif) => actif.id);
    if (selectedRows.length === 1) {
      navigate('/actif/' + selectedRows[0]);
    } else {
      navigate('/actifs/modify', {
        state: {
          selectedRows,
        },
      });
    }
  };

type CustomOptionProps = {
    option: { label: string, value: number },
    onDelete: (value: number) => void
}

const CustomOption = ({ option, onDelete }: CustomOptionProps) => (
    <div className="flex justify-between">
      <span>{option.label}</span>
      <DeleteIcon
        className='ml-2'
        style={{color: 'red', cursor: 'pointer' }}
        onClick={() => {
          // Prompt the user for confirmation
          if (window.confirm('Êtes-vous sûr de vouloir supprimer ce filtre?')) {
            onDelete(option.value);
          }
        }}
      />
    </div>
  );


  const saveFilters = (label: string) => {
    const urlParts = window.location.pathname.split('/');
    const from = urlParts[urlParts.length - 1];

    // Create the data to send to the server
    const data = {
      filters: selectedFilters,
      from: from,
      label: label,
    };

    if (currentFiltersGroup === '' || currentFiltersGroup.length === 0) {
      alert('No filter group were selected...');
      return;
    }

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
          alert('Selected filters saved!');
          setOpen(false);

          // After the filters are saved successfully, fetch the updated filter list
          fetch(window.name + 'api/filter/getFilters')
            .then((response) => response.json())
            .then((newFiltersData) => {
              setFiltersList(newFiltersData.filters);

              // Update the filtersGroupSelect state with the new filters
              const updatedFilterOptions = newFiltersData.filters.map(
                (filter: { id: any; label: any }) => ({
                  value: filter.id,
                  label: filter.label,
                })
              );

              // Add the newly added filter to the options
              if (label) {
                updatedFilterOptions.push({ value: label, label });
              }

              setFiltersGroupSelect(updatedFilterOptions);
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
  };

// Function to handle the deletion of a specific filter
const deleteFilter = (filterId: number) => {
    // Send a POST request to delete the filter
    fetch(window.name + 'api/filter/deleteFilterById', {
      method: 'POST', // Use POST method
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: filterId }),
    })
      .then((response) => {
        if (response.ok) {
          // Filter deleted successfully, now update the filtersList
          const updatedFiltersList = filtersList.filter((filter) => filter.id !== filterId);
          setFiltersList(updatedFiltersList);
          setSelectedFilters({});
          setCurrentFiltersGroup(null); // Clear the currently selected filter group
          //clear the input field

        } else {
          console.error('Failed to delete filter.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // Pass the saveFilters function to AddGroupeFiltres
  const handleCloseModal = () => {
    setShowListSelect(false);
    setSelectedActifs([]);
  };

  return (
    <div className="w-11/12 mx-auto mt-10">
      <div className="items-end justify-end flex pb-4">
        <Autocomplete
          className="w-1/6"
          options={filtersGroupSelect}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          onChange={async (_, newValue) => {
            if (newValue) {
              try {
                const selectedLabel = newValue.label;
                setCurrentFiltersGroup(selectedLabel); // Set the currently selected filter group label

                const response = await fetch(
                  window.name +
                    'api/filter/getFiltersByLabel?label=' +
                    selectedLabel
                );

                if (response.ok) {
                  const selectedFilterObject = await response.json();

                  // Filtrer vos données (actifs) en fonction des filtres sélectionnés
                  const filteredActifs = actifs.filter((actif) => {
                    // Vérifiez si l'actif correspond à tous les filtres sélectionnés
                    return Object.keys(selectedFilterObject).every((key) => {
                      const filterValue = selectedFilterObject[key] as string;

                      // Comparez la valeur de l'actif avec la valeur du filtre
                      return (
                        filterValue === 'All' ||
                        actif[key as keyof Actif] === filterValue
                      );
                    });
                  });

                  // Mettez à jour les filtres sélectionnés et les données actives
                  setSelectedFilters(selectedFilterObject);
                  setActifs(filteredActifs);
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
        title={showarchived ? 'Actifs archivés' : 'Actifs'}
        data={showarchived ? archivedActifs : actifs}
        columns={columns}
        options={options}
      />
      <div>
        <div className="flex float-left mt-4 ml-4">
          <ToggleButton
            selected={showarchived}
            value={showarchived}
            onChange={() => setShowArchived(!showarchived)}
            size="small"
            color="primary"
          >
            Voir Archiver
          </ToggleButton>
          <Button
            className="ml-12"
            style={{ marginRight: '1rem' }}
            color="primary"
            size="medium"
            onClick={() => setShowListSelect(true)}
          >
            Sélectionner
          </Button>
        </div>
        <div className="float-right m-4">
          <Button
            className="ml-12"
            style={{ marginRight: '1rem' }}
            color="primary"
            size="medium"
            onClick={() => navigate('/actif')}
          >
            Ajouter
          </Button>
          <Button
            color="secondary"
            size="medium"
            style={{ marginRight: '1rem' }}
            disabled={selectedRows.length === 0}
            onClick={() => {
              if (selectedRows.length === 1) {
                navigate('/actif/' + selectedRows[0]);
              } else {
                navigate('/actifs/modify', {
                  state: {
                    selectedRows,
                  },
                });
              }
            }}
          >
            Modifier
          </Button>
        </div>
      </div>
      <Modal
        ref={ref}
        open={showListSelect}
        onClose={handleCloseModal}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <ActifsSelect
          ref={ref}
          selectedActifs={selectedActifs}
          setSelectedActifs={setSelectedActifs}
          actifs={actifs.map((actif: Actif) => ({
            id: parseInt(actif.id),
            nom: actif.nom,
            numero_serie: actif.numero_serie,
          }))}
          handleSubmit={handleSubmit}
        />
      </Modal>

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

export default ActifsList;
