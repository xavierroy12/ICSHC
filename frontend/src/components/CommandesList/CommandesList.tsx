import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import List from '../List';

export type Commande = {
  numero_commande: string;
  tic_facturation: string; //Somewhere over here :D
  etat: string;
  nb_actif: number;
  emplacement: string;
  date_commande: string;
};
const CommandeList = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>();
  const [commandes, setCommandes] = useState<Commande[]>([]);

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
      name: 'tic_facturation',
      label: 'Numéro de commande',
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

  return (
    <div className="w-11/12 mx-auto mt-10">
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="mt-10 w-full">
          <List
            data={commandes}
            columns={columns}
            handleRowClick={handleRowClick}
            title={'Commandes'}
          />
        </div>
      )}
    </div>
  );
};
export default CommandeList;
