import {
  Grid,
  TextField,
  Button,
  Checkbox,
  Modal,
  IconButton,
} from '@mui/material';
import { FormikValues, Field, Form, FormikErrors } from 'formik';
import CustomSelect from '../CustomSelect';
import { SelectItem } from '../Actif/type';
import { SyntheticEvent, useState } from 'react';
import AddCategorie from '../AddCategorie';
import AddIcon from '@mui/icons-material/Add';

type Props = {
  categories: SelectItem[];
  values: FormikValues;
  dirty: boolean;
  onFormSubmit: (values: FormikValues) => void;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean | undefined
  ) => void;
  reloadData: () => void;
  errors: FormikErrors<FormikValues>;
};

const ModeleFormAdd = ({
  categories,
  values,
  dirty,
  setFieldValue,
  reloadData,
  errors,
  onFormSubmit,
}: Props) => {
  const [open, setOpen] = useState(false);
  const localDarkMode = window.localStorage.getItem('darkMode');
  const modalBgColor =
    localDarkMode === 'true' ? 'bg-slate-600' : 'bg-slate-100';
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onFormSubmit(values);
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
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
              error={errors.nom ? true : false}
              helperText={errors.nom}
              autoComplete="off" // Add this line

            />
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="flex">
              <Field
                name="id_type_modele"
                component={CustomSelect}
                options={categories}
                label="Catégorie"
                className="mr-8"
                error={errors.id_type_modele ? true : false}
                helperText={errors.id_type_modele}
              />

              <IconButton
                color="secondary"
                size="medium"
                onClick={() => setOpen(true)}
              >
                <AddIcon />
              </IconButton>
            </div>
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
      <Modal open={open} onClose={() => setOpen(false)}>
        <div
          className={
            'min-w-fit max-w-fit min-h-fit max-h-fit bg-white m-auto mt-20' +
            modalBgColor
          }
        >
          <AddCategorie
            handleClose={() => setOpen(false)}
            reloadData={reloadData}
          />
        </div>
      </Modal>
    </div>
  );
};
export default ModeleFormAdd;