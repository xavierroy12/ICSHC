import { type SyntheticEvent } from 'react';
import { Formik, Form, Field, FormikValues } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Actif_Type, SelectItem } from './type';
import { Grid, TextField, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import CustomSelect from '../CustomSelect';

type Props = {
  id: string;
  actif: Actif_Type;
  statuts: SelectItem[];
  modeles: SelectItem[];
  categories: SelectItem[];
  emplacements: SelectItem[];
  locataires: SelectItem[];
  utilisations: SelectItem[];
  proprietaires: SelectItem[];
};

const ActifForm = ({
  id,
  actif,
  statuts,
  modeles,
  categories,
  emplacements,
  locataires,
  utilisations,
  proprietaires,
}: Props) => {
  const navigate = useNavigate();

  const initialValues = {
    numero_commande: actif.numero_commande,
    numero_serie: actif.numero_serie,
    nom: actif.nom,
    adresse_mac: actif.adresse_mac,
    statut: actif.id_statut.toString(),
    emplacement: actif.id_emplacement.toString(),
    proprietaire: actif.id_proprietaire.toString(),
    utilisation: actif.id_utilisation.toString(),
    categorie: actif.id_categorie.toString(),
    modele: actif.id_modele.toString(),
    assigne_a: actif.id_client?.toString(),
    en_entrepot: actif.en_entrepot || false,
    date_creation: actif.date_creation,
    date_retour: actif.date_retour,
    note: actif.note,
  };

  const handleSubmit = (values: FormikValues) => {
    // Map the form values to match the expected field names in your Laravel API
    const updatedData = {
      id_categorie: values.categorie.id || values.categorie,
      en_entrepot: values.en_entrepot,
      date_retour: values.date_retour,
      note: values.note,
      id_assigne_a: values.assigne_a?.id || values.assigne_a || '',
      id_modele: values.modele.id || values.modele,
      id_statut: values.statut.id || values.statut,
      id_emplacement: values.emplacement.id || values.emplacement,
      id_proprietaire: values.proprietaire.id || values.proprietaire,
      id_utilisation: values.utilisation.id || values.utilisation,
    };

    handleUpdate(updatedData);
  };

  const handleReception = (values: FormikValues) => {
    const updatedData = {
      id_categorie: values.categorie.id || values.categorie,
      en_entrepot: true,
      date_retour: values.date_retour,
      note: values.note,
      id_assigne_a: '',
      id_modele: values.modele.id || values.modele,
      id_statut: 1,
      id_emplacement: values.emplacement.id || values.emplacement,
      id_proprietaire: values.proprietaire.id || values.proprietaire,
      id_utilisation: values.utilisation.id || values.utilisation,
    };
    handleUpdate(updatedData);
  };

  const handleUpdate = (values: FormikValues) => {
    try {
      fetch(`http://localhost:8000/api/actif/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (response.ok) {
            alert('Données sauvegardées avec succès');
            console.log('Données sauvegardées avec succès: ', values);
            navigate('/actifs');
          } else {
            console.error('Error saving data:', response.statusText);
            console.log('CA NE FONCTIONNE PAS ', values);
          }
        })
        .catch((error) => {
          console.error('Error saving data:', error);
        });
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleChange, dirty, setFieldValue }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Field
                as={TextField}
                label="Nom"
                name="nom"
                className="input-label "
                disabled
                sx={{ width: 300 }}
              />
            </Grid>

            <Grid item xs={6}>
              <Field
                as={TextField}
                label="Numéro de commande"
                name="numero_commande"
                className="input-label "
                disabled
                sx={{ width: 300 }}
              />
            </Grid>

            <Grid item xs={6}>
              <Field
                as={TextField}
                label="Numéro de série"
                name="numero_serie"
                className="input-field"
                disabled
                sx={{ width: 300 }}
              />
            </Grid>

            <Grid item xs={6}>
              <Field
                as={TextField}
                label="Adresse MAC"
                name="adresse_mac"
                className="input-label "
                disabled
                sx={{ width: 300 }}
              />
            </Grid>

            <Grid item xs={6}>
              <Field
                className="input-field"
                name="modele"
                component={CustomSelect}
                options={modeles}
                label="Modèle"
              />
            </Grid>

            <Grid item xs={6}>
              <Field
                className="input-field"
                name="categorie"
                component={CustomSelect}
                options={categories}
                label="Catégorie"
              />
            </Grid>

            <Grid item xs={6}>
              <Field
                className="input-field"
                name="statut"
                component={CustomSelect}
                options={statuts}
                label="Statut"
              />
            </Grid>

            <Grid item xs={6}>
              <Field
                className="input-field"
                name="assigne_a"
                component={CustomSelect}
                options={locataires}
                label="Assigné à"
                isClearable={true}
              />
            </Grid>

            <Grid item xs={6}>
              <Field
                className="input-field"
                name="emplacement"
                component={CustomSelect}
                options={emplacements}
                label="Emplacement"
              />
            </Grid>

            <Grid item xs={6}>
              <Field
                type="checkbox"
                name="en_entrepot"
                id="en_entrepot"
                className="mt-5 ml-2"
                checked={values.en_entrepot}
                onChange={(event: SyntheticEvent) => {
                  const target = event.target as HTMLInputElement;
                  setFieldValue('en_entrepot', target.checked);
                }}
              />
              <label htmlFor="en_entrepot" className="ml-4">
                En entrepôt
              </label>
            </Grid>

            <Grid item xs={6}>
              <Field
                className="input-field"
                name="utilisation"
                component={CustomSelect}
                options={utilisations}
                label="Utilisation"
              />
            </Grid>

            <Grid item xs={6}>
              <Field
                className="input-field"
                name="proprietaire"
                component={CustomSelect}
                options={proprietaires}
                label="Propriétaire"
              />
            </Grid>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid item xs={6}>
                <Field
                  component={DatePicker}
                  label="Date de création"
                  format="YYYY-MM-DD"
                  name="date_creation"
                  className="input-label "
                  value={
                    values.date_creation ? dayjs(values.date_creation) : null
                  }
                  disabled={!values.date_creation}
                  sx={{ width: 300 }}
                />
              </Grid>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid item xs={6}>
                <Field
                  component={DatePicker}
                  label="Date de retour"
                  format="YYYY-MM-DD"
                  name="date_retour"
                  value={values.date_retour ? dayjs(values.date_retour) : null}
                  className="input-label "
                  onChange={(date: Dayjs | null) => {
                    console.log(date?.format('YYYY-MM-DD'));
                    handleChange(date?.format('YYYY-MM-DD'));
                  }}
                  sx={{ width: 300 }}
                  slotProps={{
                    field: { clearable: true },
                  }}
                />
              </Grid>
            </LocalizationProvider>

            <Grid item xs={12}>
              <Field
                as={TextField}
                label="Note"
                id="note"
                name="note"
                multiline
                rows={4}
                defaultValue=""
                value={values.note}
                onChange={handleChange}
                sx={{ width: '100%' }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                className="my-5 mx-5 flex float-right"
                variant="contained"
                color="secondary"
                size="medium"
                type="submit"
                disabled={!dirty}
              >
                Sauvegarder
              </Button>
              <Button
                className="my-5 mx-5 flex float-right"
                variant="contained"
                color="primary"
                size="medium"
                onClick={() => handleReception(values)}
              >
                Réception
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default ActifForm;
