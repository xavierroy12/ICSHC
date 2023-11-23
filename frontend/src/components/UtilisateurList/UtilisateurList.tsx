import { CircularProgress } from '@mui/material';
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
type utilisateur_type = {
  id: number;
  nom: string;
};
const UtilisateurList = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>();
  const [utilisateurs, setUtilisateurs] = useState<utilisateur_type[]>([]);

  let lastClickTime = 0;

  const handleRowClick = (
    _rowData: string[],
    rowMeta: { dataIndex: number; rowIndex: number }
  ) => {
    const clickTime = new Date().getTime();
    const isDoubleClick = clickTime - lastClickTime < 300; // Adjust the time as needed

    lastClickTime = clickTime;

    if (isDoubleClick) {
      navigate('/utilisateur/' + utilisateurs[rowMeta.dataIndex].id);
    }
  };
  const columns = [
    { name: 'id', label: 'Id', options: { display: false } },
    { name: 'nom', label: 'Nom', enableColumnFilter: false },
    {
      name: 'emplacement',
      label: 'Emplacement',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'role',
      label: 'Rôle',
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    fetch(window.name + 'api/utilisateurs/list')
      .then((response) => response.json())
      .then((fetchedUtilisateurs) => {
        setUtilisateurs(fetchedUtilisateurs);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const options: Partial<MUIDataTableOptions> = {
    textLabels: {
        body: {
          noMatch: "Désolé, aucun résultat n'a été généré pour la recherche...",
        },
    },
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
            title={'Utilisateurs'}
            data={utilisateurs}
            columns={columns}
            options={options}
          />
        </Fragment>
      )}
    </div>
  );
};

export default UtilisateurList;
