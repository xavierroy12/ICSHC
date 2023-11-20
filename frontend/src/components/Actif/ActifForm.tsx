import { type SyntheticEvent } from 'react';
import { Form, Field, FormikValues } from 'formik';
import { SelectItem } from './type';
import { Grid, TextField, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import CustomSelect from '../CustomSelect';

type Props = {
  values: FormikValues;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean | undefined
  ) => void;
  dirty: boolean;
  statuts: SelectItem[];
  modeles: SelectItem[];
  categories: SelectItem[];
  emplacements: SelectItem[];
  locataires: SelectItem[];
  utilisations: SelectItem[];
  proprietaires: SelectItem[];
  handleReception: (values: FormikValues) => void;
  handleArchive: (values: FormikValues) => void;
};

const ActifForm = ({
  values,
  handleChange,
  dirty,
  setFieldValue,
  statuts,
  modeles,
  categories,
  emplacements,
  locataires,
  utilisations,
  proprietaires,
  handleReception,
  handleArchive,
}: Props) => {
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
            label="Numéro de commande"
            name="numero_commande"
            className="input-label "
            disabled
            sx={{ width: 300 }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Field
            as={TextField}
            label="Numéro de série"
            name="numero_serie"
            className="input-field"
            disabled
            sx={{ width: 300 }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Field
            as={TextField}
            label="Adresse MAC"
            name="adresse_mac"
            className="input-label "
            disabled
            sx={{ width: 300 }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Field
            className="input-field"
            name="modele"
            component={CustomSelect}
            options={modeles}
            label="Modèle"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            className="input-field"
            name="categorie"
            component={CustomSelect}
            options={categories}
            label="Catégorie"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Field
            className="input-field"
            name="statut"
            component={CustomSelect}
            options={statuts}
            label="Statut"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Field
            className="input-field"
            name="assigne_a"
            component={CustomSelect}
            options={locataires}
            needsId={true}
            label="Assigné à"
            isClearable={true}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Field
            className="input-field"
            name="emplacement"
            component={CustomSelect}
            options={emplacements}
            label="Emplacement"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Field
            type="checkbox"
            name="en_entrepot"
            id="en_entrepot"
            className="mt-5 ml-2"
            checked={values.en_entrepot}
            onChange={(event: SyntheticEvent) => {
              const target = event.target as HTMLInputElement;
              setFieldValue('en_entrepot', target.checked);
            }}
          />
          <label htmlFor="en_entrepot" className="ml-4">
            En entrepôt
          </label>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Field
            className="input-field"
            name="utilisation"
            component={CustomSelect}
            options={utilisations}
            label="Utilisation"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Field
            className="input-field"
            name="proprietaire"
            component={CustomSelect}
            options={proprietaires}
            label="Propriétaire"
          />
        </Grid>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid item xs={12} sm={6}>
            <Field
              component={DatePicker}
              label="Date de création"
              format="YYYY-MM-DD"
              name="date_creation"
              className="input-label "
              value={values.date_creation ? dayjs(values.date_creation) : null}
              disabled={!values.date_creation}
              sx={{ width: 300 }}
            />
          </Grid>
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid item xs={12} sm={6}>
            <Field
              component={DatePicker}
              label="Date de retour"
              format="YYYY-MM-DD"
              name="date_retour"
              value={values.date_retour ? dayjs(values.date_retour) : null}
              className="input-label "
              onChange={(value: Date) => {
                setFieldValue(
                  'date_retour',
                  value?.toISOString().substring(0, 10) || ''
                );
              }}
              sx={{ width: 300 }}
              slotProps={{
                field: { clearable: true },
              }}
            />
          </Grid>
        </LocalizationProvider>

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
            color="secondary"
            size="medium"
            type="submit"
            disabled={!dirty}
          >
            Sauvegarder
          </Button>
          <Button
            className="my-5 mx-5 flex float-right"
            variant="contained"
            style={{ marginRight: '1rem' }}
            color="primary"
            size="medium"
            onClick={() => handleReception(values)}
          >
            Réception
          </Button>

          <Button
            className="my-5 mx-5 flex float-left"
            style={{ marginRight: '1rem' }}
            variant="contained"
            color="error"
            size="medium"
            onClick={() => handleArchive(values)}
          >
            Archivé
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default ActifForm;
