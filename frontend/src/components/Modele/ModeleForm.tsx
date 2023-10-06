import { Grid, TextField, Button, Typography } from '@mui/material';
import { FormikValues, Formik, Field, Form } from 'formik';
import CustomSelect from '../CustomSelect';
import { SelectItem } from '../Actif/type';
import { Modele_Type } from './type';

type Props = {
  modele: Modele_Type;
  categories: SelectItem[];
  handleClose: () => void;
};

const ModeleForm = ({ modele, categories, handleClose }: Props) => {
  const initialValues = {
    nom: modele?.nom,
    id_type_modele: modele?.id_type_modele,
    stockage: modele?.stockage,
    processeur: modele?.processeur,

    memoire_vive: modele?.memoire_vive,
    taille: modele?.taille,

  };

  const handleSubmit = (values: FormikValues) => {
    const updatedData = {
      id: modele.id,
      nom: values.nom,
      id_type_modele: values.id_type_modele?.id,
      stockage: values.stockage,
      processeur: values.processeur,
      memoire_vive: values.memoire_vive,
      taille: values.taille,
    };
    fetch(`http://localhost:8000/api/model/${modele.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (response.ok) {
          alert('Données sauvegardées avec succès');
          console.log('Données sauvegardées avec succès: ', values);
        } else {
          console.error('Error saving data:', response.statusText);
          console.log('CA NE FONCTIONNE PAS ', values);
        }
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
    handleClose(true);
  };
  return (
    <div className="w-min bg-slate-100 m-auto mt-20 p-10">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, dirty }) => (
          <Form>
            <div className="mb-8">
              <Typography variant="h4" className="my-8 ">
                Modele: {modele.nom}
              </Typography>
            </div>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label="Nom"
                  name="nom"
                  sx={{ width: 300 }}
                  value={values.nom}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="id_type_modele"
                  component={CustomSelect}
                  options={categories}
                  label="Catégorie"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label="Stockage"
                  name="stockage"
                  sx={{ width: 300 }}
                  value={values.stockage}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label="Processeur"
                  name="processeur"
                  sx={{ width: 300 }}
                  value={values.processeur}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label="Memoire Vive"
                  name="memoire_vive"
                  sx={{ width: 300 }}
                  value={values.memoire_vive}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label="Taille écran"
                  name="taille_ecran"
                  sx={{ width: 300 }}
                  value={values.taille}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="error"
                  size="medium"
                  style={{ marginRight: '1rem' }}
                  onClick={handleClose}
                >
                  Fermer
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="medium"
                  type="submit"
                  disabled={!dirty}
                >
                  Sauvegarder
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default ModeleForm;
