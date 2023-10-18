import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
type Commande_Type = {
  numero_commande: string;
  etat: string;
  nb_actif: number;
  emplacement: string;
  date_commande: string;
};
const Commande = () => {
  const [open, setOpen] = useState(false);
  const { numero_commande } = useParams<{ numero_commande: string }>();
  const [commande, setCommande] = useState<Commande_Type>();
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    Promise.all([fetch(window.name + `api/commande/${numero_commande}`)]).then(
      (responses) =>
        Promise.all(responses.map((response) => response.json()))
          .then(([fetchedCommande]) => {
            console.log(fetchedCommande);
            setCommande(fetchedCommande);
          })
          .then(() => {
            setIsLoading(false);
          })
          .catch((error) => console.error(error))
    );
  }, [numero_commande]);
  return (
    <Fragment>
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="mx-auto mt-8">
          <div className="min-w-fit">
            <div className="mx-8">
              <Typography variant="h2" className="text-3xl font-semibold">
                Commande {numero_commande}
              </Typography>
              {commande && (
                <div className="flex justify-between w-fit bg-slate-100 min-w-fit mt-4">
                  <div className="p-4 my-4 mx-auto">
                    <Grid
                      container
                      spacing={3}
                      className="max-w-screen-md p-4 w-full mx-auto"
                    >
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Numero commande"
                          name="numero_commande"
                          className="input-label "
                          disabled
                          sx={{ width: 300 }}
                          value={commande.numero_commande}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="emplacement"
                          name="emplacement"
                          className="input-label "
                          disabled
                          sx={{ width: 300 }}
                          value={commande.emplacement}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="État"
                          name="etat"
                          className="input-label "
                          disabled
                          sx={{ width: 300 }}
                          value={commande.etat}
                        />
                      </Grid>{' '}
                      <Grid item xs={12} sm={6}>
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
                      <Grid item xs={12}>
                        <Button
                          className="my-5 mx-5 flex float-right"
                          variant="contained"
                          style={{ marginRight: '1rem' }}
                          color="primary"
                          size="medium"
                          onClick={() => setOpen(true)}
                        >
                          Réception
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default Commande;
