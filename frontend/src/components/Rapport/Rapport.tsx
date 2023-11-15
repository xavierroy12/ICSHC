import { useEffect, useState } from 'react';
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables';
import {
  SelectChangeEvent,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const Rapport = () => {
  const [currentData, setCurrentData] = useState<object[]>([]);
  const [currentRapport, setCurrentRapport] = useState<string>('ActifsEcole');

  const columns = [
    { name: 'id', label: 'Id', options: { display: false } },
    { name: 'nom', label: 'Nom', enableColumnFilter: false },
    { name: 'nbActifs', label: "Nombre d'actif", enableColumnFilter: false },
  ];
  const options: Partial<MUIDataTableOptions> = {
    responsive: 'simple',
    search: true,
    filter: false,
    tableBodyHeight: 'calc(100vh - 300px)',
    pagination: false,
    print: true,
    download: true,
    downloadOptions: {
      filename: `rapport${currentRapport}.csv`,
      separator: ';',
    },
    selectableRows: 'none',
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCurrentRapport(event.target.value as string);
  };

  useEffect(() => {
    Promise.all([fetch(window.name + 'api/rapport/' + currentRapport)]).then(
      (responses) =>
        Promise.all(responses.map((response) => response.json()))
          .then(([fetchedData]) => {
            setCurrentData(fetchedData);
          })
          .catch((error) => console.error(error))
    );
  }, [currentRapport]);

  return (
    <div className=" m-10">
      <div className="mb-8 mt-20">
        <Typography variant="h4" className="my-8 ">
          Rapport
        </Typography>
      </div>
      <Box sx={{ minWidth: 120, width: 300 }}>
        <FormControl fullWidth>
          <InputLabel id="inputRapportLabel">Rapport</InputLabel>
          <Select
            fullWidth
            labelId="inputRapportLabel"
            id="inputRapportSelect"
            value={currentRapport}
            label="Rapport"
            onChange={handleChange}
            disabled={false}
          >
            <MenuItem value={'ActifsEcole'}>Actifs par École</MenuItem>
            <MenuItem value={'ActifsProprietaire'}>
              Actifs par Propriétaire
            </MenuItem>
            <MenuItem value={'ActifsType'}>Actifs par Type</MenuItem>

            <MenuItem value={'ActifsFinVieEcole'}>
              Actifs fin de vie par École
            </MenuItem>
            <MenuItem value={'ActifsFinVieProprietaire'}>
              Actifs fin de vie par Propriétaire
            </MenuItem>
            <MenuItem value={'ActifsFinVieType'}>
              Actifs fin de vie par Type
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      <div className="w-11/12 mx-auto mt-10">
        <MUIDataTable
          title={''}
          data={currentData}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
};

export default Rapport;
