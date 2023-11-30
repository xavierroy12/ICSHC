import { useEffect, useRef, useState } from 'react';
import { Client } from './type';
import { FiltreGroup } from '../Filtres/type';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { CircularProgress, ToggleButton } from '@mui/material';

import List from '../List';
import CustomFilters from '../CustomFilters';
import { DataType } from '../CustomFilters/CustomFilters';

export type selectedFiltersType = {
  matricule?: string;
  nom?: string;
  actifs?: string;
  emplacement?: string;
  poste?: string;
  type_client?: string;
};
type currentFiltersGroupType = {
  value: number;
  label: string;
};

const ClientsList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const filter = location.state?.filter;

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
      navigate('/client/' + currentClients[rowMeta.dataIndex].id);
    }
  };

  const columns = [
    {
      name: 'matricule',
      label: 'Matricule',
      options: {
        filter: false,
        sort: true,
        filterList: selectedFilters.matricule
          ? [selectedFilters.matricule]
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
      name: 'actifs',
      label: 'Actifs',
      options: {
        filter: false,
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
        filterList: selectedFilters.emplacement
          ? [selectedFilters.emplacement]
          : [],
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
        filterList: selectedFilters.type_client
          ? [selectedFilters.type_client]
          : [],
      },
    },
  ];
  const resetData = () => {
    setSelectedFilters({});
    setCurrentFiltersGroup(undefined); // Reset the selected filter label to empty string
    setClients(cleanClients);
  };

  useEffect(() => {
    setIsLoading(true);

    const fetches = [
      fetch(window.name + 'api/clients/list'),
      fetch(window.name + 'api/clients/inactif'),
    ];

    if (id_user) {
      fetches.push(
        fetch(window.name + `api/filter/getFiltersById?id_user=${id_user}`)
      );
    }

    Promise.all(fetches)
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((data) => {
        const [fetchedClients, fetchedInactif, fetchedFilters] = data;

        if (filter) {
          const flatFilter = filter.map(
            (item: { matricule: string }) => item.matricule
          );
          const filteredClients = fetchedClients.filter(
            (client: { matricule: string }) =>
              flatFilter.includes(client.matricule)
          );
          const filteredInactif = fetchedInactif.filter(
            (client: { matricule: string }) =>
              flatFilter.includes(client.matricule)
          );
          setClients([...filteredClients, ...filteredInactif]);
        } else {
          setClients(fetchedClients);
          setCleanClients(fetchedClients);
          setInactifClients(fetchedInactif);
        }

        setFiltersList(fetchedFilters.filters);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, [id_user, filter]);

  useEffect(() => {
    if (filtersList && filtersList.length !== 0) {
      // Filter the filters based on the 'from' property
      const pageFilters = filtersList.filter(
        (filter) => filter.from === 'clients'
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
    setClients(cleanClients);
  }, [selectedFilters, cleanClients]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  const handleSelectedFiltersChange = (displayData: string[][]) => {
    setSelectedFilters({
      emplacement: displayData[3][0],
      poste: displayData[4][0],
      type_client: displayData[5][0],
    });
  };

  const currentClients = showInactif ? inactifClients : clients;
  return (
    <div className="flex flex-col w-11/12 mx-auto ">
      <div className=" flex mt-4 w-full">
        <div className="flex flex-row w-full">
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
          data={clients}
          setData={
            setClients as React.Dispatch<React.SetStateAction<DataType[]>>
          }
          filtersGroupSelect={filtersGroupSelect}
          setFiltersGroupSelect={setFiltersGroupSelect}
        />
      </div>
      <List
        data={currentClients}
        columns={columns}
        handleRowClick={handleRowClick}
        handleFilerChange={handleSelectedFiltersChange}
        title={showInactif ? 'Client(s) Inactif(s)' : 'Clients'}
      />
    </div>
  );
};
export default ClientsList;
