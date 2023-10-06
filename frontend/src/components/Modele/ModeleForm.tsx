import { Grid, TextField, Button, Typography } from '@mui/material';
import { FormikValues, Formik, Field, Form } from 'formik';
import CustomSelect from '../CustomSelect';
import { SelectItem } from '../Actif/type';
import { Modele_Type } from './type';

type Props = {
  modele: Modele_Type;
  categories: SelectItem[];
  handleClose: (isClose: boolean) => void;
};

const ModeleForm = ({ modele, categories, handleClose }: Props) => {
  console.log(modele);
  const initialValues = {
    nom: modele?.nom,
    id_type_modele: modele?.id_type_modele,
    stockage: modele?.stockage,
    processeur: modele?.processeur,
    carte_graphique: modele?.carte_graphique,
    memoire_vive: modele?.memoire_vive,
    taille_ecran: modele?.taille_ecran,
    tactile: modele?.tactile,
    clavier: modele?.clavier,
    clavier_numerique: modele?.clavier_numerique,
  };

  const handleSubmit = (values: FormikValues) => {
    const updatedData = {
      id: modele.id,
      nom: values.nom,
      id_type_modele: values.id_type_modele,
      stockage: values.stockage,
      processeur: values.processeur,
      carte_graphique: values.carte_graphique,
      memoire_vive: values.memoire_vive,
      taille: values.taille,
      tactile: values.tactile,
      clavier: values.clavier,
      clavier_numerique: values.clavier_numerique,
    };
    console.log(values);
    handleClose(true);
  };
  return (
    <div className="w-1/2 bg-slate-100 m-auto mt-20 p-10">
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
                  label="stockage"
                  name="stockage"
                  sx={{ width: 300 }}
                  value={values.stockage}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label="processeur"
                  name="processeur"
                  sx={{ width: 300 }}
                  value={values.processeur}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label="carte_graphique"
                  name="carte_graphique"
                  sx={{ width: 300 }}
                  value={values.carte_graphique}
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
                  label="taille_ecran"
                  name="taille_ecran"
                  sx={{ width: 300 }}
                  value={values.taille_ecran}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label="Tactile"
                  name="tactile"
                  sx={{ width: 300 }}
                  value={values.tactile}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label="clavier"
                  name="clavier"
                  sx={{ width: 300 }}
                  value={values.clavier}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label="Clavier Numérique"
                  name="clavier_numerique"
                  sx={{ width: 300 }}
                  value={values.clavier_numerique}
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
      </Formik>
    </div>
  );
};
export default ModeleForm;
