import { useEffect, useRef, useState } from 'react';
import { Actif } from './type';
import { useNavigate } from 'react-router-dom';
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables';
import { Button, CircularProgress, Modal, ToggleButton } from '@mui/material';
import { LightActif } from '../ActifsListSelect/type';
import ActifsSelect from '../ActifsSelect/ActifsSelect';

const ActifsList = () => {
  const navigate = useNavigate();

  const [showarchived, setShowArchived] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [actifs, setActifs] = useState<Actif[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [archivedActifs, setArchivedActifs] = useState<Actif[]>([]);

  // New state to store selected filters
  const [selectedFilters, setSelectedFilters] = useState<any>({});

  const [showListSelect, setShowListSelect] = useState(false);
  const [selectedActifs, setSelectedActifs] = useState<LightActif[]>([]);
  let lastClickTime = 0; // To track double-clicks
  const ref = useRef(null);

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
      },
    },
    { name: 'nom', header: 'Nom', enableColumnFilter: false },
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


    onFilterChange: (
        changedColumnIndex: any,
        displayData: any
      ) => {
        // Log the dropdown index (changedColumnIndex)
        console.log('Dropdown Name:', changedColumnIndex);

        // Store the selected filters in state
        setSelectedFilters({
          ...selectedFilters, displayData,
        });
      },

  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetch(window.name + 'api/actifs'),
      fetch(window.name + 'api/actifs/archived'),
    ]).then((responses) =>
      Promise.all(responses.map((response) => response.json()))
        .then(([fetchedActif, fetchedArchived]) => {
          setActifs(fetchedActif);
          setArchivedActifs(fetchedArchived);
        })
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => console.error(error)));
  }, []);

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

  const saveSelectedFilters = () => {
    // Manually flatten the array of arrays
    const flatData = selectedFilters.displayData.flat();
    console.log('Display data flat:', flatData);

    // Convert the flattenedFilters array to a JSON object
    const formattedFiltersJSON = JSON.stringify({
      filters: flatData,
    });
    console.log('Formatted filters JSON:', formattedFiltersJSON);

    // Send the JSON data to the server to save in the database
    fetch(window.name + 'api/filter/saveFilters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formattedFiltersJSON,
    })
      .then((response) => {
        if (response.ok) {
            alert('Selected filters saved!');
          console.log('Selected filters saved to the database.');
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




  const handleCloseModal = () => {
    setShowListSelect(false);
    setSelectedActifs([]);
  };

  return (
    <div className="w-11/12 mx-auto mt-10">
      {/* Button to save selected filters */}
      <Button onClick={saveSelectedFilters}>Sauvegarder les filtres sélectionnés</Button>

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
    </div>
  );
};

export default ActifsList;
