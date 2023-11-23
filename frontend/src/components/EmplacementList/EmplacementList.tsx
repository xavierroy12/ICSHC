import { Button, CircularProgress } from '@mui/material';
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

type Emplacement = {
  id: number;
  matricule: string;
  nom: string;
  adresse: string;
};
const EmplacementList = () => {
  const [emplacements, setEmplacements] = useState<Emplacement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  let lastClickTime = 0; // To track double-clicks

  useEffect(() => {
    setIsLoading(true);
    fetch(window.name + 'api/emplacements/list')
      .then((response) => response.json())
      .then((fetchedEmplacements) => {
        setEmplacements(fetchedEmplacements);
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
      navigate('/emplacement/' + emplacements[rowMeta.dataIndex].id);
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
      name: 'adresse',
      label: 'Adresse',
      options: {
        filter: false,
        sort: true,
      },
    },
  ];

  const options: Partial<MUIDataTableOptions> = {
    textLabels: {
        body: {
          noMatch: "Désolé, aucun résultat n'a été généré pour la recherche...",
        },
    },
    filterType: 'dropdown',
    responsive: 'simple',
    search: true,
    filter: false,
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
            title={'Emplacements'}
            data={emplacements}
            columns={columns}
            options={options}
          />
        </div>
      )}
      <div>
        <div className="float-right m-4">
          <Button
            className="ml-12"
            style={{ marginRight: '1rem' }}
            color="primary"
            size="medium"
            onClick={() => navigate('/emplacement/new')}
          >
            Ajouter
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default EmplacementList;
