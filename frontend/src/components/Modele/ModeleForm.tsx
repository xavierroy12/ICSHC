import {
  Grid,
  TextField,
  Button,
  Checkbox,
  Modal,
  IconButton,
} from '@mui/material';
import { FormikValues, Field, Form } from 'formik';
import CustomSelect from '../CustomSelect';
import { SelectItem } from '../Actif/type';
import { SyntheticEvent, useState } from 'react';
import AddCategorie from '../AddCategorie';
import AddIcon from '@mui/icons-material/Add';

type Props = {
  categories: SelectItem[];
  values: FormikValues;
  dirty: boolean;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean | undefined
  ) => void;
  reloadData: () => void;
};

const ModeleForm = ({
  categories,
  values,
  dirty,
  setFieldValue,
  reloadData,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
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
            <div className="flex">
              <Field
                name="id_type_modele"
                component={CustomSelect}
                options={categories}
                label="Catégorie"
                className="mr-8"
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
              disabled={!dirty}
            >
              Sauvegarder
            </Button>
          </Grid>
        </Grid>
      </Form>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="min-w-fit max-w-fit min-h-fit max-h-fit bg-white m-auto mt-20">
          <AddCategorie
            handleClose={() => setOpen(false)}
            reloadData={reloadData}
          />
        </div>
      </Modal>
    </div>
  );
};
export default ModeleForm;
