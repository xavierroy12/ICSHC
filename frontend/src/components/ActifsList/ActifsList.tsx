import { useEffect, useRef, useState } from 'react';
import { Actif } from './type';
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
  IconButton,
  Modal,
  TextField,
  ToggleButton,
} from '@mui/material';
import { LightActif } from '../ActifsListSelect/type';
import ActifsSelect from '../ActifsSelect/ActifsSelect';
import AddGroupeFiltres from '../AddGroupeFiltres';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';

type selectedFiltersType = {
  nom?: string;
  numero_serie?: string;
  modele?: string;
  categorie?: string;
  statut?: string;
  client?: string;
  emplacement?: string;
};
type currentFiltersGroupType = {
  value: number;
  label: string;
};

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
  const [selectedFilters, setSelectedFilters] = useState<selectedFiltersType>(
    {}
  );
  const [filtersList, setFiltersList] = useState<FiltreGroup[]>([]);
  const [filtersGroupSelect, setFiltersGroupSelect] = useState<
    { value: number; label: string }[]
  >([]);
  const [currentFiltersGroup, setCurrentFiltersGroup] =
    useState<currentFiltersGroupType>();

  const [showListSelect, setShowListSelect] = useState(false);
  const [selectedActifs, setSelectedActifs] = useState<LightActif[]>([]);
  let lastClickTime = 0; // To track double-clicks

  const id_user = localStorage.getItem('id_user');
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
        filterList: selectedFilters.numero_serie
          ? [selectedFilters.numero_serie]
          : [],
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
        filterList: selectedFilters.modele ? [selectedFilters.modele] : [],
      },
    },
    {
      name: 'categorie',
      label: 'Catégorie',
      options: {
        filter: true,
        sort: true,
        filterList: selectedFilters.categorie
          ? [selectedFilters.categorie]
          : [],
      },
    },
    {
      name: 'statut',
      label: 'Statut',
      options: {
        filter: true,
        sort: true,
        filterList: selectedFilters.statut ? [selectedFilters.statut] : [],
      },
    },
    {
      name: 'client',
      label: 'Assigné à',
      options: {
        filter: true,
        sort: true,
        filterList: selectedFilters.client ? [selectedFilters.client] : [],
      },
    },
    {
      name: 'emplacement',
      label: 'Emplacement',
      options: {
        filter: true,
        sort: true,
        filterList: selectedFilters.emplacement
          ? [selectedFilters.emplacement]
          : [],
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

    onFilterChange: (
      _changedColumnIndex: string | MUIDataTableColumn | null,
      displayData: string[][]
    ) => {
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
      fetch(window.name + `api/filter/getFiltersById?id_user=${id_user}`),
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
  }, [id_user]);
  useEffect(() => {
    if (filtersList.length !== 0) {
      // Filter the filters based on the 'from' property
      const pageFilters = filtersList.filter(filter => filter.from === 'actifs');

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

  useEffect(() => {
    const areAllFiltersNoSelection = Object.values(selectedFilters).every(
      (filter) => filter === undefined || filter === 'All'
    );
    setIsButtonDisabled(areAllFiltersNoSelection);
    setActifs(cleanActifs);
  }, [selectedFilters, cleanActifs]);

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
    const id_user = localStorage.getItem('id_user') || 'unknown'; // retrieve id_user from local storage, default to 'unknown';

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
              'X-User-Action-Id': id_user // send the user id in a custom header
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

                    // Apply the newly created filter
                    if (label) {
                      const selectedFilterObject = newFiltersData.filters.find(
                        (filter: { label: string }) => filter.label === label
                      );
                      if (selectedFilterObject) {
                        const filteredActifs = actifs.filter((actif) => {
                          return Object.keys(selectedFilterObject).every(
                            (key) => {
                              const filterValue = selectedFilterObject[
                                key
                              ] as string;
                              return (
                                filterValue === 'All' ||
                                actif[key as keyof Actif] === filterValue
                              );
                            }
                          );
                        });
                        setSelectedFilters(selectedFilterObject);
                        setActifs(filteredActifs);
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
          // Filter deleted successfully, now update the filtersList
          const updatedFiltersList = filtersList.filter(
            (filter) => filter.id !== filterId
          );

          setFiltersList(updatedFiltersList);

          // Clear the input field or perform any other necessary actions
          toast.success('Le filtre sélectionné a été supprimé avec succès!');

          // Reset the filters here
          setSelectedFilters({});
          setCurrentFiltersGroup(undefined); // Reset the selected filter label to empty string
          setActifs(cleanActifs);
        } else {
            toast.error('Une erreur est survenue lors de la supression du filtre');
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
      <div className="items-end justify-end flex pb-4">
        <Autocomplete
          className="w-1/6"
          options={filtersGroupSelect}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          onChange={async (_, newValue) => {
            if (newValue) {
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
        <div className="m-auto p-4 my-20 w-fit align-right bg-slate-400">
          <IconButton
            tabIndex={0}
            onClick={handleCloseModal}
            className="float-right"
          >
            <CloseIcon />
          </IconButton>
          <div className="p-12">
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
          </div>
        </div>
      </Modal>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="min-w-fit max-w-fit min-h-fit max-h-fit bg-slate-400 m-auto mt-20">
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
    </div>
  );
};

export default ActifsList;
