import { CircularProgress } from '@mui/material';
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Client } from './type';

const ClienList = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  let lastClickTime = 0; // To track double-clicks

  useEffect(() => {
    setIsLoading(true);
    fetch(window.name + 'api/clients/list')
      .then((response) => response.json())
      .then((fetchedClients) => {
        setClients(fetchedClients);
        setIsLoading(false);
      });
  }, []);

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
          <MUIDataTable
            title={'Clients'}
            data={clients}
            columns={columns}
            options={options}
          />
        </div>
      )}
    </Fragment>
  );
};
export default ClienList;
