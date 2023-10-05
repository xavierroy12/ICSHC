import { useEffect, useState, useMemo } from 'react';
import { Actif } from './type';

import { useNavigate } from 'react-router-dom';
import MUIDataTable, { MUIDataTableProps } from 'mui-datatables';
import { Button } from '@mui/material';

const Actifs = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>();
  const [actifs, setActifs] = useState<Actif[]>([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    {
      name: 'numero_serie',
      helabelader: 'Numéro de série',
      options: {
        sort: true,
      },
    },
    { name: 'nom', header: 'Nom', enableColumnFilter: false },
    {
      name: 'modele',
      label: 'Modèle',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'categorie',
      label: 'Catégorie',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'statut',
      label: 'Statut',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'proprietaire',
      label: 'Propriétaire',
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
  ];
  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    search: true,
    filter: true,
    tableBodyHeight: '400px',
    onRowsSelect: (currentRowsSelected, allRowsSelected) => {
      setSelectedRows(allRowsSelected.map((row) => row.dataIndex));
    },
  };

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:8000/api/actifs')
      .then((response) => response.json())
      .then((values) => {
        setActifs(values);
      })
      .then(() => setIsLoading(false))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="w-11/12 mx-auto mt-10">
      <div>
        <MUIDataTable
          title={'Actifs'}
          data={actifs}
          columns={columns}
          options={options as MUIDataTableProps['options']}
        />
      </div>
      <Button
        className="mr-8"
        color="primary"
        size="medium"
        onClick={() => navigate('/actif')}
      >
        Ajouter
      </Button>
      <Button
        color="secondary"
        size="medium"
        disabled={selectedRows.length === 0}
        onClick={() => {
          if (selectedRows.length === 1) {
            navigate('/actif/' + selectedRows[0]);
          } else {
            navigate('/actifs/modify', { state: { selectedRows } });
          }
        }}
      >
        Modifier
      </Button>
    </div>
  );
};

export default Actifs;
