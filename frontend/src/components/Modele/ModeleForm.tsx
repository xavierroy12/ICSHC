import { Grid, TextField, Button, Checkbox } from '@mui/material';
import { FormikValues, Field, Form } from 'formik';
import CustomSelect from '../CustomSelect';
import { SelectItem } from '../Actif/type';
import { SyntheticEvent } from 'react';

type Props = {
  categories: SelectItem[];
  values: FormikValues;
  dirty: boolean;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean | undefined
  ) => void;
};

const ModeleForm = ({ categories, values, dirty, setFieldValue }: Props) => {
  return (
    <Form>
      <Grid
        container
        spacing={3}
        className="max-w-screen-md p-4 w-full mx-auto"
      >
        <Grid item xs={12} md={6}>
          <Field
            as={TextField}
            label="Nom"
            name="nom"
            sx={{ width: 300 }}
            value={values.nom}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field
            name="id_type_modele"
            component={CustomSelect}
            options={categories}
            label="Catégorie"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field
            as={TextField}
            label="Stockage"
            name="stockage"
            sx={{ width: 300 }}
            value={values.stockage}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field
            as={TextField}
            label="Processeur"
            name="processeur"
            sx={{ width: 300 }}
            value={values.processeur}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field
            as={TextField}
            label="Memoire Vive"
            name="memoire_vive"
            sx={{ width: 300 }}
            value={values.memoire_vive}
          />
        </Grid>
        <Grid item xs={12} md={6}>
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
              console.log(target.checked);
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
  );
};
export default ModeleForm;
