import { Fragment, useState, useEffect } from 'react';
import MUIDataTable, { MUIDataTableProps } from 'mui-datatables';
import { Button, Checkbox, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Modele = {
  id: number;
  nom: string;
  categorie: string;
  memoire_vive: string;
  processeur: string;
  stockage: string;
  taille: string;
  favoris: boolean;
};

const ModeleList = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [modeles, setModeles] = useState<Modele[]>([]);

  let lastClickTime = 0; // To track double-clicks

  const handleRowClick = (
    rowData: string[],
    rowMeta: { dataIndex: number; rowIndex: number }
  ) => {
    const clickTime = new Date().getTime();
    const isDoubleClick = clickTime - lastClickTime < 300; // Adjust the time as needed

    lastClickTime = clickTime;

    if (isDoubleClick) {
      navigate('/modele/' + modeles[rowMeta.dataIndex].id);
    }
  };
  const updateFavoris = (updatedModele: Modele) => {
    console.log(JSON.stringify(updatedModele));
    fetch('http://localhost:8000/api/modele/favoris/' + updatedModele.id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => console.error(error));
  };
  const columns = [
    { name: 'id', label: 'Id', options: { display: false } },
    { name: 'nom', header: 'Nom', enableColumnFilter: false },
    {
      name: 'categorie',
      label: 'Catégorie',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'memoire_vive',
      label: 'Mémoire vive',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'processeur',
      label: 'Processeur',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'stockage',
      label: 'Stockage',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'taille',
      label: 'Taille',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'favoris',
      label: 'Favoris',
      options: {
        customBodyRender: (value, tableMeta) => {
          console.log(value);
          return (
            <Checkbox
              checked={value}
              onChange={(e) => {
                const { rowIndex } = tableMeta;
                const updatedModeles = [...modeles];
                updatedModeles[rowIndex].favoris = e.target.checked;
                setModeles(updatedModeles);
                updateFavoris(updatedModeles[rowIndex]);
              }}
            />
          );
        },
      },
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetch('http://localhost:8000/api/modeles')]).then(
      (responses) =>
        Promise.all(responses.map((response) => response.json()))
          .then(([fetchedModele]) => {
            console.log('fetched', fetchedModele);
            setModeles(fetchedModele);
            console.log('updated', modeles);
          })
          .then(() => {
            setIsLoading(false);
          })
          .catch((error) => console.error(error))
    );
  }, []);

  const options = {
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
    customFooter: () => {
      return (
        <Fragment>
          <div className="float-right m-4 ">
            <Button
              className="ml-12"
              style={{ marginRight: '1rem' }}
              color="primary"
              size="medium"
              onClick={() => navigate('/modele')}
            >
              Ajouter
            </Button>
          </div>
        </Fragment>
      );
    },
    selectableRows: 'none',
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="w-11/12 mx-auto mt-10">
      <MUIDataTable
        title={'Modeles'}
        data={modeles}
        columns={columns}
        options={options as MUIDataTableProps['options']}
      />
    </div>
  );
};

export default ModeleList;
