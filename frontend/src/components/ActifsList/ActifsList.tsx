import { Fragment, useEffect, useRef, useState } from 'react';
import { Actif } from './type';
import { FiltreGroup } from '../Filtres/type';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  ToggleButton,
} from '@mui/material';
import { LightActif } from '../ActifsListSelect/type';
import ActifsSelect from '../ActifsSelect/ActifsSelect';
import CloseIcon from '@mui/icons-material/Close';
import List from '../List';
import CustomFilters from '../CustomFilters';
import { DataType } from '../CustomFilters/CustomFilters';

export type selectedFiltersType = {
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

  const [currentFiltersGroup, setCurrentFiltersGroup] =
    useState<currentFiltersGroupType>();

  const [showListSelect, setShowListSelect] = useState(false);
  const [selectedActifs, setSelectedActifs] = useState<LightActif[]>([]);
  let lastClickTime = 0; // To track double-clicks

  const id_user = localStorage.getItem('id_user');
  const ref = useRef(null);
  const saveButtonRef = useRef(null);
  const [filtersGroupSelect, setFiltersGroupSelect] = useState<
    { value: number; label: string }[]
  >([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State to manage button disabled state

  const localDarkMode = window.localStorage.getItem('darkMode');
  const modalBgColor =
    localDarkMode === 'true' ? 'bg-slate-600' : 'bg-slate-100';

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
  const handleSetSelectedRows = (allRowsSelected: { dataIndex: number }[]) => {
    const selectedIds = allRowsSelected.map(
      (row: { dataIndex: number }) => actifs[row.dataIndex].id
    );
    setSelectedRows(selectedIds);
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
  const resetData = () => {
    setSelectedFilters({});
    setCurrentFiltersGroup(undefined); // Reset the selected filter label to empty string
    setActifs(cleanActifs);
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
      const pageFilters = filtersList.filter(
        (filter) => filter.from === 'actifs'
      );

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

  // Pass the saveFilters function to AddGroupeFiltres
  const handleCloseModal = () => {
    setShowListSelect(false);
    setSelectedActifs([]);
  };

  const currentActif = showarchived ? archivedActifs : actifs;
  const lightActifs = currentActif.map((actif: Actif) => ({
    id: parseInt(actif.id),
    nom: actif.nom,
    numero_serie: actif.numero_serie,
  })) as LightActif[];

  const handleSelectedFiltersChange = (displayData: string[][]) => {
    setSelectedFilters({
      modele: displayData[2][0],
      categorie: displayData[3][0],
      statut: displayData[4][0],
      client: displayData[5][0],
      emplacement: displayData[6][0],
    });
  };

  return (
    <Fragment>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
      ) : (
        <div className="flex flex-col w-11/12 mx-auto ">
          <div className=" flex mt-4 w-full">
            <div className="flex flex-row w-full">
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
            <CustomFilters
              filtersList={filtersList}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              currentFiltersGroup={currentFiltersGroup}
              setCurrentFiltersGroup={setCurrentFiltersGroup}
              resetData={resetData}
              saveButtonRef={saveButtonRef}
              isButtonDisabled={isButtonDisabled}
              setFiltersList={setFiltersList}
              data={actifs}
              setData={
                setActifs as React.Dispatch<React.SetStateAction<DataType[]>>
              }
              filtersGroupSelect={filtersGroupSelect}
              setFiltersGroupSelect={setFiltersGroupSelect}
            />
          </div>
          <div className="mt-10 w-full">
            <List
              data={currentActif}
              columns={columns}
              setSelectedRows={handleSetSelectedRows}
              handleFilerChange={handleSelectedFiltersChange}
              handleRowClick={handleRowClick}
              title={showarchived ? 'Actifs archivés' : 'Actifs'}
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
              className="m-auto p-4 w-fit h-fit align-right"
              ref={ref}
              open={showListSelect}
              onClose={handleCloseModal}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <div
                className={'m-auto p-4 py-10 w-fit align-right ' + modalBgColor}
              >
                <IconButton
                  tabIndex={0}
                  onClick={handleCloseModal}
                  className="float-right"
                >
                  <CloseIcon />
                </IconButton>
                <Box className="m-auto p-4 mt-10 w-fit align-right ">
                  <ActifsSelect
                    ref={ref}
                    selectedActifs={selectedActifs}
                    setSelectedActifs={setSelectedActifs}
                    actifs={lightActifs}
                    handleSubmit={handleSubmit}
                  />
                </Box>
              </div>
            </Modal>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ActifsList;
