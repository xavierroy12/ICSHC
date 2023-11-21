import { Box, Grid, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Commande_Type } from './type';
import { AdminContext } from '../../App';
import { useContext } from 'react';

type Props = {
  commande: Commande_Type;
};

const CommandeInformation = ({ commande }: Props) => {
  const isAdmin = useContext(AdminContext);

  return (
    <Box width={'100%'}>
      <Grid
        container
        spacing={3}
        className="max-w-screen-md p-4 w-full mx-auto"
        width={'w-full'}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            label="Numero commande"
            name="numero_commande"
            className="input-label"
            disabled={!isAdmin}
            sx={{ width: 300 }}
            value={commande.numero_commande}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="emplacement"
            name="emplacement"
            className="input-label "
            disabled={!isAdmin}
            sx={{ width: 300 }}
            value={commande.emplacement}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="État"
            name="etat"
            className="input-label "
            disabled={!isAdmin}
            sx={{ width: 300 }}
            value={commande.etat}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nombre actif"
            name="nb_actif"
            className="input-label "
            disabled={!isAdmin}
            sx={{ width: 300 }}
            value={commande.nb_actif}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date de commande"
              format="YYYY-MM-DD"
              className="input-label "
              value={
                commande.date_commande ? dayjs(commande.date_commande) : null
              }
              disabled={!isAdmin}
              sx={{ width: 300 }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Box>
  );
};
export default CommandeInformation;
