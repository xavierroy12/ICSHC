import { SelectItem } from '../Actif/type';
import { Fragment, useState } from 'react';
import {
  Autocomplete,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Form } from 'formik';

type Props = {
  modeles: SelectItem[];
  actifs: light_Actif[];
  setActifs: React.Dispatch<React.SetStateAction<light_Actif[]>>;
};
export type light_Actif = {
  modele?: string;
  numero_serie?: string;
  adresse_mac?: string;
};

const ActifAddForm = ({ modeles, actifs, setActifs }: Props) => {
  const [currentModele, setCurrentLabel] = useState<SelectItem | null>(
    modeles[0] || null
  );
  const [amount, setAmount] = useState<number>(0);
  const [displayTable, setDisplayTable] = useState<boolean>(false);

  const generateTable = () => {
    if (!currentModele) return;
    if (amount < 0) return;
    const currentAmount = actifs.length;
    if (amount < currentAmount) {
      setActifs(actifs.slice(0, amount));
    } else {
      for (let i = currentAmount; i < amount; i++) {
        setActifs((actifs) => [
          ...actifs,
          {
            modele: currentModele?.label || '',
            numero_serie: '',
            adresse_mac: '',
          },
        ]);
      }
    }
    setDisplayTable(true);
  };

  return (
    <Form>
      <Fragment>
        <div className="w-[800px] p-6 bg-slate-100">
          <Typography variant="h6" className="my-8 mx-auto">
            Sélectionnez un modèle
          </Typography>
          <div className="flex w-full mt-5">
            <div className="w-full mr-10">
              <Autocomplete
                className="right-0 w-full"
                placeholder={'Modèle'}
                options={modeles}
                value={currentModele}
                onChange={(_event, value) => setCurrentLabel(value)}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField {...params} label={'Modele'} variant="outlined" />
                )}
              />
            </div>
            <div className="mr-10">
              <TextField
                label="Nombre"
                name="amount"
                value={amount}
                onChange={(event) =>
                  setAmount(parseInt(event.target.value) || 0)
                }
              />
            </div>
            <div className="my-auto">
              <Button
                variant="contained"
                color="primary"
                onClick={generateTable}
              >
                Générer
              </Button>
            </div>
          </div>
          {displayTable && (
            <Fragment>
              <div className="mt-10">
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 650, width: '100%' }}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Numéro de série</TableCell>
                        <TableCell align="right">Adresse MAC</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {actifs.map((row, index) => (
                        <TableRow
                          key={'actif' + index}
                          sx={{
                            '&:last-child td, &:last-child th': {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell align="left">
                            <TextField
                              value={row.numero_serie}
                              onChange={(event) => {
                                const updatedActifs = [...actifs];
                                updatedActifs[index].numero_serie =
                                  event.target.value;
                                setActifs(updatedActifs);
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <TextField
                              value={row.adresse_mac}
                              onChange={(event) => {
                                const updatedActifs = [...actifs];
                                updatedActifs[index].adresse_mac =
                                  event.target.value;
                                setActifs(updatedActifs);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div className="mt-5 flex justify-end">
                <Button variant="contained" color="primary" type="submit">
                  Sauvegarder
                </Button>
              </div>
            </Fragment>
          )}
        </div>
      </Fragment>
    </Form>
  );
};
export default ActifAddForm;
