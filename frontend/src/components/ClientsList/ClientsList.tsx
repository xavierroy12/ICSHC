import { CircularProgress } from '@mui/material';
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Client } from './type';
import ToggleButton from '@mui/material/ToggleButton';
import { useLocation } from 'react-router-dom';

const ClienList = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [showInactif, setShowInactif] = useState(false);
  const [inactifClients, setInactifClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const location = useLocation();
  const filter = location.state?.filter;
  console.log(filter);

  let lastClickTime = 0; // To track double-clicks

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetch(window.name + 'api/clients/list'),
      fetch(window.name + 'api/clients/inactif')
    ])
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then(([fetchedClients, fetchedInactif]) => {
        if (filter) {
          const flatFilter = Array.isArray(filter[0]) ? filter.flat() : filter.map((item: { matricule: any; }) => item.matricule);
          const filteredClients = fetchedClients.filter((client: { matricule: any; }) => flatFilter.includes(client.matricule));
          const filteredInactif = fetchedInactif.filter((client: { matricule: any; }) => flatFilter.includes(client.matricule));
          setClients([...filteredClients, ...filteredInactif]);
        } else {
          setClients(fetchedClients);
          setInactifClients(fetchedInactif);
        }
        setIsLoading(false);
      });
  }, [filter]);

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
      name: 'matricule',
      label: 'Matricule',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'nom',
      label: 'Nom',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'actifs',
      label: 'Actifs',
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
    {
      name: 'poste',
      label: 'Poste',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'type_client',
      label: 'Type Client',
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
    onRowClick: (
      rowData: string[],
      rowMeta: { dataIndex: number; rowIndex: number }
    ) => {
      handleRowClick(rowData, rowMeta);
    },
    print: false,
    download: false,
    selectableRows: 'none',
  };
  return (
    <Fragment>
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="w-11/12 mx-auto mt-10">

    <div className="mt-14 mb-4 ml-4">
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
          <MUIDataTable
            title={'Clients'}
            data={showInactif ? inactifClients : clients}
            columns={columns}
            options={options}
          />
        </div>
      )}
    </Fragment>
  );
};
export default ClienList;
