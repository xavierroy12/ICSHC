import { Fragment, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Actif } from '../ActifsList/type';
import { CircularProgress, Grid, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ActifsSelect from '../ActifsSelect/ActifsSelect';
import { LightActif } from '../Actifs/type';
import FormLayout from '../FormLayout';
import { toast } from 'react-toastify';

type Emplacement_Type = {
  id: number;
  nom: string;
  numero_civique: number;
  adresse: string;
  created_at: string | null;
  updated_at: string | null;
};

type Poste_Type = {
  id: number;
  nom: string;
  created_at: string | null;
  updated_at: string | null;
};

type Type_Client_Type = {
  id: number;
  nom: string;
  created_at: string | null;
  updated_at: string | null;
};

type Client_Type = {
  id: number;
  nom: string;
  actifs: Actif[];
  matricule: string;
  emplacement: Emplacement_Type;
  poste: Poste_Type;
  type_client: Type_Client_Type;
  id_poste: number;
  id_type_client: number;
  id_emplacement: number;
  created_at: string | null;
  updated_at: string | null;
};

const Client = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedActifs, setSelectedActifs] = useState<LightActif[]>([]);
  const [actifs, setActifs] = useState<Actif[]>([]);
  const [client, setClient] = useState<Client_Type>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const ref = useRef(null);

  useEffect(() => {
    Promise.all([
      fetch(window.name + 'api/actifs'),
      fetch(window.name + `api/client/${id}`),
    ]).then((responses) =>
      Promise.all(responses.map((response) => response.json()))
        .then(([fetchedActif, fetchedClient]) => {
          setActifs(fetchedActif);
          setClient(fetchedClient);
          if (fetchedClient.actifs)
            setSelectedActifs(
              fetchedClient.actifs.map((actif: Actif) => ({
                id: actif.id,
                nom: actif.nom,
                numero_serie: actif.numero_serie,
              }))
            );
        })
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => console.error(error))
    );
  }, [id]);
  const handleSubmit = () => {
    const selectedRows = selectedActifs.map((actif) => actif.id);
    console.log(selectedRows);
    fetch(window.name + `api/client/actifs/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ actifs: selectedRows }),
    })
      .then((response) => response.json())
      .then(() => {
        toast.success('Données sauvegardées avec succès');
      })
      .catch(() => {
        toast.error('Une erreur est survenue');
      });
  };

  return (
    <Fragment>
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="mx-auto mt-8">
          {client && (
            <FormLayout title={client.nom} dirty={false}>
              <div className="flex justify-between w-fit bg-slate-100 dark:bg-slate-800 min-w-fit mt-4">
                <div className="p-4 my-4   mx-auto">
                  <Grid
                    container
                    spacing={3}
                    className="max-w-screen-md p-4 w-full mx-auto"
                  >
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Nom"
                        name="nom"
                        className="input-label "
                        disabled
                        sx={{ width: 300 }}
                        value={client.nom}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Matricule"
                        name="matricule"
                        className="input-label "
                        disabled
                        sx={{ width: 300 }}
                        value={client.matricule}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="emplacement"
                        name="emplacement"
                        className="input-label "
                        disabled
                        sx={{ width: 300 }}
                        value={client.emplacement.nom}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="poste"
                        name="poste"
                        className="input-label "
                        disabled
                        sx={{ width: 300 }}
                        value={client.poste.nom}
                      />
                    </Grid>{' '}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Type Client"
                        name="type_client"
                        className="input-label "
                        disabled
                        sx={{ width: 300 }}
                        value={client.type_client.nom}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Date de création"
                          format="YYYY-MM-DD"
                          className="input-label "
                          value={
                            client.updated_at ? dayjs(client.updated_at) : null
                          }
                          disabled
                          sx={{ width: 300 }}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <ActifsSelect
                        ref={ref}
                        selectedActifs={selectedActifs}
                        setSelectedActifs={setSelectedActifs}
                        actifs={actifs.map((actif: Actif) => ({
                          id: parseInt(actif.id),
                          nom: actif.nom,
                          numero_serie: actif.numero_serie,
                        }))}
                        handleSubmit={handleSubmit}
                        buttonLabel="Sauvegarder"
                      />
                    </Grid>
                  </Grid>
                </div>
              </div>
            </FormLayout>
          )}
        </div>
      )}
    </Fragment>
  );
};
export default Client;
