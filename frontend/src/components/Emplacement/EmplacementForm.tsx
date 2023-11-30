import { Button, Checkbox, Grid, TextField } from '@mui/material';
import { Field, Form, FormikErrors, FormikValues } from 'formik';
import { SyntheticEvent } from 'react';

interface Props {
  values: FormikValues;
  dirty: boolean;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean | undefined
  ) => void;
  errors: FormikErrors<FormikValues>;
}

const EmplacementForm = ({ values, dirty, setFieldValue, errors }: Props) => {
  return (
    <Form>
      <Grid
        container
        spacing={3}
        className="max-w-screen-md p-4 w-full mx-auto"
      >
        <Grid item xs={12} sm={6}>
          <Field
            as={TextField}
            label="Nom"
            name="nom"
            className="input-label "
            sx={{ width: 300 }}
            error={errors.nom ? true : false}
            helperText={errors.nom}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            as={TextField}
            label="Matricule"
            name="matricule"
            className="input-label "
            sx={{ width: 300 }}
            error={errors.matricule ? true : false}
            helperText={errors.matricule}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            as={TextField}
            label="Numéro civique"
            name="numero_civique"
            className="input-label "
            sx={{ width: 300 }}
            error={errors.numero_civique ? true : false}
            helperText={errors.numero_civique}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            as={TextField}
            label="Adresse"
            name="adresse"
            className="input-label "
            sx={{ width: 300 }}
            error={errors.adresse ? true : false}
            helperText={errors.adresse}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label htmlFor="favoris" className="ml-4">
            Propriétaire
          </label>
          <Field
            as={Checkbox}
            checked={values.est_proprietaire}
            name="favoris"
            onChange={(event: SyntheticEvent) => {
              const target = event.target as HTMLInputElement;
              setFieldValue('est_proprietaire', target.checked);
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            className="my-5 mx-5 flex float-right"
            variant="contained"
            color="secondary"
            size="medium"
            type="submit"
            disabled={!dirty || Object.keys(errors).length > 0}
          >
            Sauvegarder
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default EmplacementForm;
