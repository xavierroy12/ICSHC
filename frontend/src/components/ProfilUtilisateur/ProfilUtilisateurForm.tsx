import { Field, Form } from 'formik';
import { SelectItem } from '../Actif/type';
import { Button, Grid, TextField } from '@mui/material';
import CustomSelect from '../CustomSelect';

type Props = {
  dirty: boolean;
  emplacements: SelectItem[];
  roles: SelectItem[];
  isProfil: boolean;
};

const ProfileUtilisateurForm = ({
  dirty,
  emplacements,
  roles,
  isProfil,
}: Props) => {
  return (
    <Form>
      <Grid
        container
        spacing={3}
        className="max-w-screen-md p-4 w-full mx-auto"
      >
        <Grid item xs={12} sm={12}>
          <Field
            as={TextField}
            label="Nom"
            name="nom"
            className="input-label "
            disabled
            sx={{ width: 300 }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Field
            className="input-field"
            name="id_role"
            component={CustomSelect}
            options={roles}
            label="Roles"
            disabled={isProfil}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Field
            className="input-field"
            name="id_emplacement"
            component={CustomSelect}
            options={emplacements}
            label="Emplacement"
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
export default ProfileUtilisateurForm;
