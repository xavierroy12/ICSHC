import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import List from '../List';
export type Utilisateur = {
  id: number;
  nom: string;
};
const UtilisateurList = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>();
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);

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

  return (
    <div className="w-11/12 mx-auto mt-10">
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="mt-10 w-full">
          <List
            data={utilisateurs}
            columns={columns}
            handleRowClick={handleRowClick}
            title={'Utilisateurs'}
          />
        </div>
      )}
    </div>
  );
};

export default UtilisateurList;
