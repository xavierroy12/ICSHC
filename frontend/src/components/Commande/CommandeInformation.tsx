import { Box, Grid, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Commande_Type } from './type';
import { Fragment } from 'react';
import Historique from '../Historique';

type Props = {
  commande: Commande_Type;
};

const CommandeInformation = ({ commande }: Props) => {
  return (
    <Fragment>
      <div className="flex flex-col sm:flex-row justify-evenly items-start w-full">
        <Box width={'100%'}>
          <div className="mb-8">
            <Typography variant="h4" className="mx-auto">
              Informations
            </Typography>
          </div>
          <Grid
            container
            spacing={3}
            className="max-w-screen-md p-4 mx-auto"
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            <Grid item xs={12} sm={12}>
              <TextField
                label="Numero commande"
                name="numero_commande"
                className="input-label"
                disabled
                sx={{ width: 300 }}
                value={commande.numero_commande}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="emplacement"
                name="emplacement"
                className="input-label "
                disabled
                sx={{ width: 300 }}
                value={commande.emplacement}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="État"
                name="etat"
                className="input-label "
                disabled
                sx={{ width: 300 }}
                value={commande.etat}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Nombre actif"
                name="nb_actif"
                className="input-label "
                disabled
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
                    commande.date_commande
                      ? dayjs(commande.date_commande)
                      : null
                  }
                  disabled
                  sx={{ width: 300 }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Box>
        <Box width={'100%'}>
          <div className="w-full sm:mt-0 mt-24  mx-8">
            <Historique id={commande.numero_commande} type="commande" />
          </div>
        </Box>
      </div>
    </Fragment>
  );
};
export default CommandeInformation;
