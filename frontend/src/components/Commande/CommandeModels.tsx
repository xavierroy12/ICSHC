import {
  Autocomplete,
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Commande_Type, Model_Type, SelectItem } from './type';

type Props = {
  modeleCommande: Model_Type[];
  setModeleCommande: React.Dispatch<
    React.SetStateAction<Model_Type[] | undefined>
  >;
  modeles: SelectItem[];
  addModele: (description_modele: string) => void;
  commande: Commande_Type;
  setCommande: React.Dispatch<React.SetStateAction<Commande_Type | undefined>>;
};
const CommandeModels = ({
  modeleCommande,
  setModeleCommande,
  modeles,
  addModele,
  commande,
  setCommande,
}: Props) => {
  return (
    <Box width={'100%'}>
      <div className="mx-auto my-8 w-10/12 h-[900px] max-h-[900px] overflow-scroll">
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650, width: '100%' }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell align="left">Description modèle</TableCell>
                <TableCell align="right">Modèle</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {modeleCommande &&
                modeleCommande.map((row, index) => (
                  <TableRow
                    key={row.modele + '_' + index}
                    sx={{
                      '&:last-child td, &:last-child th': {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.nombre}
                    </TableCell>
                    <TableCell align="left">{row.description_modele}</TableCell>
                    <TableCell align="right" width={'300px'}>
                      <div className="flex w-full">
                        <Autocomplete
                          className="right-0 w-full"
                          placeholder={'Modele'}
                          options={modeles}
                          value={modeles.find(
                            (modele) => modele.label === row.modele
                          )}
                          onChange={(_, newValue) => {
                            const updatedModeleCommande = [...modeleCommande];
                            const rowIndex = updatedModeleCommande.findIndex(
                              (item) => item.modele === row.modele
                            );
                            updatedModeleCommande[rowIndex].modele = newValue
                              ? newValue.label
                              : '';
                            setModeleCommande(updatedModeleCommande);
                            const updatedActifs = commande.actifs.map(
                              (actif) => {
                                if (
                                  actif.description_modele ===
                                  row.description_modele
                                ) {
                                  return {
                                    ...actif,
                                    modele: newValue ? newValue.label : '',
                                  };
                                }
                                return actif;
                              }
                            );
                            const updatedCommand = {
                              ...commande,
                              actifs: updatedActifs,
                            };
                            setCommande(updatedCommand);
                          }}
                          onInputChange={(_, newInputValue) => {
                            const updatedModeleCommande = [...modeleCommande];
                            const rowIndex = updatedModeleCommande.findIndex(
                              (item) => item.modele === row.modele
                            );
                            updatedModeleCommande[rowIndex].modele =
                              newInputValue ? newInputValue : '';
                            setModeleCommande(updatedModeleCommande);
                          }}
                          getOptionLabel={(option) => option.label}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={'Modele'}
                              variant="outlined"
                            />
                          )}
                        />
                        <IconButton
                          aria-label="Ajouter"
                          onClick={() => {
                            addModele(row.description_modele);
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Box>
  );
};
export default CommandeModels;
