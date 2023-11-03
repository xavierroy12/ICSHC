import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { Commande_Type } from './type';

type Props = {
  commande: Commande_Type;
  setCommande: React.Dispatch<React.SetStateAction<Commande_Type | undefined>>;
};

const CommandeTableauActifs = ({ commande, setCommande }: Props) => {
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
                <TableCell>Modèle</TableCell>
                <TableCell align="left">Numéro de série</TableCell>
                <TableCell align="right">Adresse MAC</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {commande.actifs &&
                commande.actifs
                  .sort((a, b) => a.modele.localeCompare(b.modele))
                  .map((row, index) => (
                    <TableRow
                      key={row.modele + '_' + index}
                      sx={{
                        '&:last-child td, &:last-child th': {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.modele}
                      </TableCell>
                      <TableCell align="left">
                        <TextField
                          defaultValue={row.numero_serie}
                          onChange={(event) => {
                            const updatedActifs = commande.actifs.map(
                              (actif) => {
                                if (actif.modele === row.modele) {
                                  return {
                                    ...actif,
                                    numero_serie: event.target.value,
                                  };
                                }
                                return actif;
                              }
                            );
                            const updatedCommand = commande;
                            updatedCommand.actifs = updatedActifs;
                            setCommande(updatedCommand);
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          defaultValue={row.adresse_mac}
                          onChange={(event) => {
                            const updatedActifs = commande.actifs.map(
                              (actif) => {
                                if (actif.modele === row.modele) {
                                  return {
                                    ...actif,
                                    adresse_mac: event.target.value,
                                  };
                                }
                                return actif;
                              }
                            );
                            const updatedCommand = commande;
                            updatedCommand.actifs = updatedActifs;
                            setCommande(updatedCommand);
                          }}
                        />
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

export default CommandeTableauActifs;
