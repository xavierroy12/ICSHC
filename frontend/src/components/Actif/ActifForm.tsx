import { useContext, type SyntheticEvent } from 'react';
import { Form, Field, FormikValues, FormikErrors } from 'formik';
import { SelectItem } from './type';
import { Grid, TextField, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import CustomSelect from '../CustomSelect';
import { AdminContext } from '../../App';
import { useFormikContext } from 'formik';

type Props = {
  id: number; // Add this line

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
  emplacements: SelectItem[];
  locataires: SelectItem[];
  utilisations: SelectItem[];
  proprietaires: SelectItem[];
  sourceFinanciere: SelectItem[];
  setSendingType: (type: string) => void;
  errors: FormikErrors<FormikValues>;
};

const ActifForm = ({
  id,
  values,
  handleChange,
  dirty,
  setFieldValue,
  statuts,
  modeles,
  emplacements,
  locataires,
  utilisations,
  proprietaires,
  sourceFinanciere,
  setSendingType,
  errors,
}: Props) => {
  const { submitForm } = useFormikContext<FormikValues>();

  const isAdmin = useContext(AdminContext);
  const handleReception = async () => {
    setSendingType('reception');
    await submitForm();
  };
  const handleArchive = async () => {
    setSendingType('archive');
    await submitForm();
  };
  console.log(errors);
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
            className="input-label"
            sx={{ width: 300 }}
            error={errors.nom ? true : false}
            helperText={errors.nom}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Field
            as={TextField}
            label="Numéro de commande"
            name="numero_commande"
            className="input-label"
            disabled={!isAdmin}
            sx={{ width: 300 }}
            error={errors.numero_commande ? true : false}
            helperText={errors.numero_commande}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Field
            as={TextField}
            label="Numéro de série"
            name="numero_serie"
            className="input-field"
            disabled={!isAdmin}
            sx={{ width: 300 }}
            error={errors.numero_serie ? true : false}
            helperText={errors.numero_serie}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Field
            as={TextField}
            label="Adresse MAC"
            name="adresse_mac"
            className="input-label "
            disabled={!isAdmin}
            sx={{ width: 300 }}
            error={errors.adresse_mac ? true : false}
            helperText={errors.adresse_mac}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Field
            className="input-field"
            name="modele"
            component={CustomSelect}
            options={modeles}
            label="Modèle"
            error={errors.modele ? true : false}
            helperText={errors.modele}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            as={TextField}
            name="categorie"
            label="Catégorie"
            disabled
            sx={{ width: 300 }}
            error={errors.categorie ? true : false}
            helperText={errors.categorie}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Field
            className="input-field"
            name="statut"
            component={CustomSelect}
            options={statuts}
            label="Statut"
            error={errors.statut ? true : false}
            helperText={errors.statut}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Field
            className="input-field"
            name="assigne_a"
            component={CustomSelect}
            options={locataires}
            label="Assigné à"
            isClearable={true}
            error={errors.assigne_a ? true : false}
            helperText={errors.assigne_a}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Field
            className="input-field"
            name="emplacement"
            component={CustomSelect}
            options={emplacements}
            label="Emplacement"
            error={errors.emplacement ? true : false}
            helperText={errors.emplacement}
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
            error={errors.en_entrepot ? true : false}
            helperText={errors.en_entrepot}
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
            error={errors.utilisation ? true : false}
            helperText={errors.utilisation}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Field
            className="input-field"
            name="proprietaire"
            component={CustomSelect}
            options={proprietaires}
            label="Propriétaire"
            error={errors.proprietaire ? true : false}
            helperText={errors.proprietaire}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Field
            className="input-field"
            name="sourceFinanciere"
            component={CustomSelect}
            options={sourceFinanciere}
            label="Source financière"
            error={errors.sourceFinanciere ? true : false}
            helperText={errors.sourceFinanciere}
          />
        </Grid>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid item xs={12} sm={6}>
            <Field
              component={DatePicker}
              label="Date de création"
              format="YYYY-MM-DD"
              name="date_creation"
              value={values.date_creation ? dayjs(values.date_creation) : null}
              disabled={!isAdmin}
              sx={{ width: 300 }}
              onChange={(value: Date) => {
                setFieldValue(
                  'date_creation',
                  value?.toISOString().substring(0, 10) || ''
                );
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined',
                  error: errors.date_creation ? true : false,
                  helperText: errors.date_creation,
                },
              }}
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
              clearable
              slotProps={{
                textField: {
                  field: { clearable: true },
                  fullWidth: true,
                  variant: 'outlined',
                  error: errors.date_retour ? true : false,
                  helperText: errors.date_retour,
                },
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
            error={errors.note ? true : false}
            helperText={errors.note}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              window.open('https://inventaireapi.csshc.gouv.qc.ca/label/' + id, '_blank');
            }}
          >
            Générer étiquette
          </Button>
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
          <Button
            className="my-5 mx-5 flex float-right"
            variant="contained"
            style={{ marginRight: '1rem' }}
            color="primary"
            size="medium"
            onClick={() => handleReception()}
            disabled={Object.keys(errors).length > 0}
          >
            Réception
          </Button>
          <Button
            className="my-5 mx-5 flex float-left"
            style={{ marginRight: '1rem' }}
            variant="contained"
            color="error"
            size="medium"
            onClick={() => handleArchive()}
            disabled={Object.keys(errors).length > 0}
          >
            Archivé
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default ActifForm;
