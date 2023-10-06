import { Grid, TextField, Button } from '@mui/material';
import { FormikValues, Formik, Field, Form } from 'formik';
import CustomSelect from '../CustomSelect';
import { SelectItem } from '../Actif/type';
import { Modele_Type } from './Modele';

type Props = { modele: Modele_Type; categories: SelectItem[] };

const ModeleForm = ({ modele, categories }: Props) => {
  const initialValues = {
    nom: modele?.nom,
    categorie: modele?.categorie,
    stockage: modele?.stockage,
    processeur: modele?.processeur,
    carte_graphique: modele?.carte_graphique,
    memoire: modele?.memoire,
    taille_ecran: modele?.taille_ecran,
    tactile: modele?.tactile,
    clavier: modele?.clavier,
    clavier_numerique: modele?.clavier_numerique,
  };

  const handleSubmit = (values: FormikValues) => {
    console.log(values);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ dirty }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Field
                as={TextField}
                label="Nom"
                name="nom"
                disabled
                sx={{ width: 300 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                className="input-field"
                name="categorie"
                component={CustomSelect}
                options={categories}
                label="Catégorie"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                label="stockage"
                name="stockage"
                disabled
                sx={{ width: 300 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                label="processeur"
                name="processeur"
                disabled
                sx={{ width: 300 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                label="carte_graphique"
                name="carte_graphique"
                disabled
                sx={{ width: 300 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                label="memoire"
                name="memoire"
                disabled
                sx={{ width: 300 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                label="taille_ecran"
                name="taille_ecran"
                disabled
                sx={{ width: 300 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                label="tactile"
                name="tactile"
                disabled
                sx={{ width: 300 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                label="clavier"
                name="clavier"
                disabled
                sx={{ width: 300 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                label="clavier_numerique"
                name="clavier_numerique"
                disabled
                sx={{ width: 300 }}
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
            </Grid>
          </Grid>
        </Form>
      )}
      ;
    </Formik>
  );
};
export default ModeleForm;
