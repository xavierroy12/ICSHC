import { Field, Form, FormikErrors, FormikValues } from 'formik';
import { SelectItem } from '../Actif/type';
import { Button, Grid, TextField } from '@mui/material';
import CustomSelect from '../CustomSelect';
import { AdminContext } from '../../App';
import { useContext } from 'react';

type Props = {
  dirty: boolean;
  emplacements: SelectItem[];
  roles: SelectItem[];
  isProfil: boolean;
  errors: FormikErrors<FormikValues>;
};

const ProfileUtilisateurForm = ({
  dirty,
  emplacements,
  roles,
  isProfil,
  errors,
}: Props) => {
  const isAdmin = useContext(AdminContext);

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
            disabled={!isAdmin}
            sx={{ width: 300 }}
            error={errors.nom ? true : false}
            helperText={errors.nom}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Field
            className="input-field"
            name="id_role"
            component={CustomSelect}
            options={roles}
            label="Roles"
            disabled={isProfil || !isAdmin}
            error={errors.id_role ? true : false}
            helperText={errors.id_role}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Field
            className="input-field"
            name="id_emplacement"
            component={CustomSelect}
            options={emplacements}
            label="Emplacement"
            error={errors.id_emplacement ? true : false}
            helperText={errors.id_emplacement}
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
export default ProfileUtilisateurForm;
