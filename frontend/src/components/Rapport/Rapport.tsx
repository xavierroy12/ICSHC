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

type ColumnsType = {
  name: string;
  label: string;
  options?: {
    display: boolean;
  };
};

const Rapport = () => {
  const [currentData, setCurrentData] = useState<object[]>([]);
  const [currentRapport, setCurrentRapport] = useState<string>('ActifsEcole');

  const [currentColumns, setCurrentColumns] = useState<ColumnsType[]>();

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
            console.log(fetchedData);
            const newColumns = Object.keys(fetchedData[0]).map((key) => ({
              name: key,
              label: key,
            }));

            setCurrentColumns(newColumns);
          })
          .catch((error) => console.error(error))
    );
  }, [currentRapport]);

  return (
    <div className=" m-10">
      <div className="mb-8 mt-20">
        <div className="w-11/12 mx-auto">
          <Typography variant="h4">Rapport</Typography>
          <div className="mt-10">
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
                  <MenuItem value={'Actifs'}>Actifs</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <div className="mt-10">
              {currentColumns && currentData && (
                <MUIDataTable
                  title={''}
                  data={currentData}
                  columns={currentColumns}
                  options={options}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rapport;
