import { Button, Grid, TextField } from '@mui/material';
import { Field, Form } from 'formik';

interface Props {
  dirty: boolean;
}

const EmplacementForm = ({ dirty }: Props) => {
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            as={TextField}
            label="Matricule"
            name="matricule"
            className="input-label "
            sx={{ width: 300 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            as={TextField}
            label="Numéro civique"
            name="numero_civique"
            className="input-label "
            sx={{ width: 300 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            as={TextField}
            label="Adresse"
            name="adresse"
            className="input-label "
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
  );
};

export default EmplacementForm;
