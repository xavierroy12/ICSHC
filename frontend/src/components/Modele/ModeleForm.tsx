import { Grid, TextField, Button, Typography, Checkbox } from '@mui/material';
import { FormikValues, Formik, Field, Form } from 'formik';
import CustomSelect from '../CustomSelect';
import { SelectItem } from '../Actif/type';
import { Modele_Type } from './type';
import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  modele: Modele_Type;
  categories: SelectItem[];
};

const ModeleForm = ({ modele, categories }: Props) => {
  const navigate = useNavigate();

  const initialValues = {
    nom: modele?.nom,
    id_type_modele: modele?.id_type_modele,
    stockage: modele?.stockage,
    processeur: modele?.processeur,
    favoris: modele?.favoris,
    memoire_vive: modele?.memoire_vive,
    taille: modele?.taille,
  };

  const handleSubmit = (values: FormikValues) => {
    const updatedData = {
      id: modele.id,
      nom: values.nom,
      id_type_modele: values.id_type_modele?.id || values.id_type_modele,
      stockage: values.stockage,
      processeur: values.processeur,
      memoire_vive: values.memoire_vive,
      favoris: values.favoris,
      taille: values.taille,
    };
    console.log('updatedData: ', updatedData);
    console.log('values: ', values);
    fetch(window.name + `/api/modele/${modele.id}`, {
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
          navigate('/modeles');
        } else {
          console.error('Error saving data:', response.statusText);
          console.log('CA NE FONCTIONNE PAS ', values);
        }
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
  };
  return (
    <div className="w-min bg-slate-100 m-auto mt-20 p-10">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, dirty, setFieldValue }) => (
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
                  name="taille"
                  sx={{ width: 300 }}
                  value={values.taille}
                />
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="favoris" className="ml-4">
                  Favoris
                </label>
                <Field
                  as={Checkbox}
                  checked={values.favoris}
                  name="favoris"
                  onChange={(event: SyntheticEvent) => {
                    const target = event.target as HTMLInputElement;
                    setFieldValue('favoris', target.checked);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
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
