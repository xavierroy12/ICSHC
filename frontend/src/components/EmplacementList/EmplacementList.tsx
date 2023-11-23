import { Button, CircularProgress } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import List from '../List';

export type Emplacement = {
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
  return (
    <Fragment>
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="w-11/12 mx-auto mt-10">
          <div className="mt-10 w-full">
            <List
              data={emplacements}
              columns={columns}
              handleRowClick={handleRowClick}
              title={'Emplacements'}
            />
          </div>
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
