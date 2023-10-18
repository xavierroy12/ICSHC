import { useEffect, useRef, useState } from 'react';
import { Actif } from './type';
import { FiltreGroup } from '../Filtres/type';
import { useNavigate } from 'react-router-dom';
import MUIDataTable, { MUIDataTableOptions, TableBodyRow } from 'mui-datatables';
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
        sort: true,
        filter: false,
      },
    },
    {
      name: 'nom',
      header: 'Nom',
      enableColumnFilter: false,
      options: {
        sort: true,
        filter: false,
      },
    },
    {
      name: 'modele',
      label: 'Modèle',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'categorie',
      label: 'Catégorie',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'statut',
      label: 'Statut',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'client',
      label: 'Assigné à',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'emplacement',
      label: 'Emplacement',
      options: {
        filter: true,
        sort: true,
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

    onFilterChange: (changedColumnIndex: any, displayData: any) => {
      setSelectedFilters({
        ...selectedFilters,
        displayData,
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
          console.log('Actifs:', fetchedActif);
          console.log('Archived Actifs:', fetchedArchived);
          console.log('Filter List:', fetchedFiltersList);
          setActifs(fetchedActif);
          setArchivedActifs(fetchedArchived);
          setFiltersList(fetchedFiltersList);
        })
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => console.error(error))
    );
  }, []);
  useEffect(() => {
    if (filtersList.length > 0) {
      setFiltersGroupSelect(
        filtersList.map((filter) => {
          return { value: filter.id, label: filter.label};
        })
      );
    }
  }, [filtersList]);

  //FIX THIS
  console.log('Filters Group Select:', filtersGroupSelect);

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

  const saveFilters = (label: string) => {

    const flatData = selectedFilters.displayData.flat();
    const urlParts = window.location.pathname.split('/');
    const from = urlParts[urlParts.length - 1];

    console.log("Set filters for: ", filtersList);

    // Create the data to send to the server
    const data = {
      filters: flatData,
      from: from,
      label: label,
    };

    if(label === ''){
        alert('No label entered!');
      return;
    }
    //if flatData is empty, don't send the request
    if (flatData.length === 0) {
      alert('No filters selected!');
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
          console.log('Selected filters saved to the database!');
          // You can add further actions here, like showing a success message.
        } else {
          console.error('Failed to save selected filters.');
          // Handle the error, show an error message, etc.
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

          <div className='flex'>
          <Autocomplete
          className='w-60'
            placeholder={'Mes filtres'}
            options={filtersGroupSelect}
            value={currentFiltersGroup}
            onChange={(_, newValue) => {
              setCurrentFiltersGroup(newValue);
            }}
            onInputChange={(_, newInputValue) => {
              setCurrentFiltersGroup(
                filtersGroupSelect.find((filter) => {
                  return filter.label === newInputValue;
                })
              );
            }}
            getOptionLabel={(option) => option.label || 'Aucun filtre'}
            renderInput={(params) => (
              <TextField
                {...params}
                label={'Groupes de filtres'}
                variant="outlined"
              />
            )}
          />
          </div>

          <Button
            disabled={Object.keys(selectedFilters).length === 0}
            ref={saveButtonRef}
            onClick={() => setOpen(true)}
          >
            Sauvegarder filtre(s)
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
