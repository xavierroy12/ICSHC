import { Grid, TextField, Button, FormControlLabel } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Field, FormikValues, Form } from 'formik';
import { Fragment, SyntheticEvent } from 'react';
import CustomSelect from '../CustomSelect';
import { SelectItem } from '../Actif/type';

type Props = {
  modeles: SelectItem[];
  categories: SelectItem[];
  statuts: SelectItem[];
  emplacements: SelectItem[];
  utilisations: SelectItem[];
  proprietaires: SelectItem[];
  values: FormikValues;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean | undefined
  ) => void;
  dirty: boolean;
  handleReception: (values: FormikValues) => void;
};

const ActifsForm = ({
  modeles,
  categories,
  statuts,
  emplacements,
  utilisations,
  proprietaires,
  values,
  handleChange,
  setFieldValue,
  dirty,
  handleReception,
}: Props) => {
  return (
    <Fragment>
      <Form>
        <Grid
          container
          spacing={3}
          className="max-w-screen-md p-4 bg-slate-100 w-full mx-auto"
        >
          <Grid item xs={12} sm={6}>
            <Field
              name="modele"
              component={CustomSelect}
              options={modeles}
              label="Modele"
              isClearable
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name="categorie"
              component={CustomSelect}
              options={categories}
              label="Categorie"
              isClearable
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="statut"
              component={CustomSelect}
              options={statuts}
              label="Statut"
              isClearable
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name="emplacement"
              component={CustomSelect}
              options={emplacements}
              label="Emplacement"
              isClearable
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Field
                  type="checkbox"
                  name="en_entrepot"
                  id="en_entrepot"
                  checked={values.en_entrepot}
                  onChange={(event: SyntheticEvent) => {
                    const target = event.target as HTMLInputElement;
                    setFieldValue('en_entrepot', target.checked);
                  }}
                  className="my-5 mx-5 flex float-right"
                />
              }
              label="En entrepot"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name="utilisation"
              component={CustomSelect}
              options={utilisations}
              label="Utilisation"
              isClearable
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name="proprietaire"
              component={CustomSelect}
              options={proprietaires}
              label="Proprietaire"
              isClearable
            />
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Field
                component={DatePicker}
                label="Date de retour"
                format="DD/MM/YYYY"
                name="date_retour"
                className="input-label "
                clearable
                sx={{ width: '100%' }}
                slotProps={{
                  field: { clearable: true },
                }}
                value={
                  values.date_retour ? dayjs(values.date_retour) : undefined
                }
                onChange={(value: Date) => {
                  setFieldValue(
                    'date_retour',
                    value?.toISOString().substring(0, 10) || ''
                  );
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <Field
              as={TextField}
              label="Note"
              id="note"
              name="note"
              multiline
              rows={4}
              value={values.note}
              onChange={handleChange}
              sx={{ width: '100%' }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              className="my-5 mx-5 flex float-right"
              variant="contained"
              style={{ marginRight: '1rem' }}
              color="primary"
              size="medium"
              type="submit"
              disabled={!dirty}
            >
              Sauvegarder
            </Button>
            <Button
              className="my-5 mx-5 flex float-right"
              style={{ marginRight: '1rem' }}
              variant="contained"
              color="primary"
              size="medium"
              onClick={() => {
                handleReception(values);
              }}
            >
              Réception
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Fragment>
  );
};
export default ActifsForm;
