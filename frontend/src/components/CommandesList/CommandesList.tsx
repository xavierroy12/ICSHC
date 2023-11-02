import { CircularProgress } from '@mui/material';
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
type commande_type = {
  numero_commande: string;
  etat: string;
  nb_actif: number;
  emplacement: string;
  date_commande: string;
};
const CommandeList = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>();
  const [commandes, setCommandes] = useState<commande_type[]>([]);

  let lastClickTime = 0;

  const handleRowClick = (
    _rowData: string[],
    rowMeta: { dataIndex: number; rowIndex: number }
  ) => {
    const clickTime = new Date().getTime();
    const isDoubleClick = clickTime - lastClickTime < 300; // Adjust the time as needed

    lastClickTime = clickTime;

    if (isDoubleClick) {
      navigate('/commande/' + commandes[rowMeta.dataIndex].numero_commande);
    }
  };
  const columns = [
    {
      name: 'numero_commande',
      header: 'Numéro de commande',
      enableColumnFilter: false,
    },
    {
      name: 'etat',
      label: 'État',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'nb_actif',
      label: 'Nombre actif',
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
      name: 'date_commande',
      label: 'Date commande',
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    fetch(window.name + 'api/commandes/list')
      .then((response) => response.json())
      .then((fetchedCommandes) => {
        setCommandes(fetchedCommandes);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

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
    <div className="w-11/12 mx-auto mt-10">
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <Fragment>
          <MUIDataTable
            title={'Commandes'}
            data={commandes}
            columns={columns}
            options={options}
          />
        </Fragment>
      )}
    </div>
  );
};
export default CommandeList;
