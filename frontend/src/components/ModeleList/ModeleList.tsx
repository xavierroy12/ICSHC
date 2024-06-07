import { Fragment, useState, useEffect } from 'react';
import { Button, Checkbox, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Modele } from './type';
import List from '../List';
import { toast } from 'react-toastify';

const ModeleList = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [modeles, setModeles] = useState<Modele[]>([]);
  const id_user = localStorage.getItem('id_user') || 'unknown'; // retrieve id_user from local storage, default to 'unknown';

  let lastClickTime = 0; // To track double-clicks

  const handleRowClick = (
    _rowData: string[],
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
    fetch(window.name + 'api/modele/favoris/' + updatedModele.id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Action-Id': id_user, // send the user id in a custom header
      },
    })
      .then((response) => response.json())
      .then(() => {
        toast.success('Données sauvegardées avec succès');
      })
      .catch(() => toast.error('Une erreur est survenue'));
  };
  const columns = [
    { name: 'id', label: 'Id', options: { display: false } },
    { name: 'nom', label: 'Nom', enableColumnFilter: false },
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
        customBodyRender: (
          value: boolean | undefined,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          tableMeta: { rowIndex: any }
        ) => {
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
    Promise.all([fetch(window.name + 'api/modeles')]).then((responses) =>
      Promise.all(responses.map((response) => response.json()))
        .then(([fetchedModele]) => {
          setModeles(fetchedModele);
        })
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => console.error(error))
    );
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="w-11/12 mx-auto mt-10">
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="mt-10 w-full">
          <List
            data={modeles}
            columns={columns}
            handleRowClick={handleRowClick}
            title={'Modeles'}
          />
          <Fragment>
            <div className="float-right m-4 ">
              <Button
                className="ml-12"
                style={{ marginRight: '1rem' }}
                color="primary"
                size="medium"
                onClick={() => navigate('/modele/new')}
              >
                Ajouter
              </Button>
            </div>
          </Fragment>
        </div>
      )}
    </div>
  );
};

export default ModeleList;
