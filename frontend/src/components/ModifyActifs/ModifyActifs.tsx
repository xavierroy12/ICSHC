import React, { useEffect, useState } from 'react';
import {
  Select,
  Checkbox,
  TextareaAutosize,
  Button,
  CircularProgress,
  FormControlLabel,
} from '@mui/material';
import { Field, Form, Formik, FormikValues, useFormik } from 'formik';
import { useLocation } from 'react-router-dom';
import SelectActifsList from '../SelectActifsList';
import CustomSelect from '../CustomSelect';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

type LightType = {
  id: number;
  nom: string;
};

type LightActif = {
  id: number;
  nom: string;
  numero_serie: string;
};

const ModifyActifs: React.FC = () => {
  const location = useLocation();
  const { selectedRows } = location.state as { selectedRows: string[] };
  const [loading, setLoading] = useState(true);
  const [statuts, setStatuts] = useState<LightType[]>([]);
  const [modeles, setModeles] = useState<LightType[]>([]);
  const [emplacements, setEmplacements] = useState<LightType[]>([]);
  const [locataires, setLocataires] = useState<LightType[]>([]);
  const [utilisations, setUtilisations] = useState<LightType[]>([]);
  const [proprietaires, setProprietaires] = useState<LightType[]>([]);
  const [categories, setCategories] = useState<LightType[]>([]);

  const [actifs, setActifs] = useState<LightActif[]>([]);
  const [selectedActifs, setSelectedActifs] = useState<LightActif[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8000/api/statuts/light'),
      fetch('http://localhost:8000/api/modeles/light'),
      fetch('http://localhost:8000/api/emplacements/light'),
      fetch('http://localhost:8000/api/clients/light'),
      fetch('http://localhost:8000/api/utilisations/light'),
      fetch('http://localhost:8000/api/proprietaires/light'),
      fetch('http://localhost:8000/api/categories/light'),
      fetch('http://localhost:8000/api/actifs/light'),
    ])
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then(
        ([
          statutsData,
          modelesData,
          emplacementsData,
          locatairesData,
          utilisationsData,
          proprietairesData,
          categoriesData,
          actifsData,
        ]) => {
          setStatuts(
            statutsData.map((statut: LightType) => ({
              id: statut.id,
              label: statut.nom,
            }))
          );
          setModeles(
            modelesData.map((modele: LightType) => ({
              id: modele.id,
              label: modele.nom,
            }))
          );
          setEmplacements(
            emplacementsData.map((emplacement: LightType) => ({
              id: emplacement.id,
              label: emplacement.nom,
            }))
          );
          setLocataires(
            locatairesData.map((locataire: LightType) => ({
              id: locataire.id,
              label: locataire.nom,
            }))
          );
          setUtilisations(
            utilisationsData.map((utilisation: LightType) => ({
              id: utilisation.id,
              label: utilisation.nom,
            }))
          );
          setProprietaires(
            proprietairesData.map((proprietaire: LightType) => ({
              id: proprietaire.id,
              label: proprietaire.nom,
            }))
          );
          setCategories(
            categoriesData.map((categorie: LightType) => ({
              id: categorie.id,
              label: categorie.nom,
            }))
          );
          setActifs(actifsData);
          console.log(actifsData);
          setSelectedActifs(
            selectedRows.map((selectedRow: string) => ({
              id: parseInt(selectedRow),
              nom: actifsData.find(
                (actif: LightActif) => actif.id.toString() === selectedRow
              )?.nom as string,
              numero_serie: actifsData.find(
                (actif: LightActif) => actif.id.toString() === selectedRow
              )?.numero_serie as string,
            }))
          );
          setLoading(false);
        }
      )
      .catch((error) => console.error(error));
  }, []);
  const initialValues = {
    emplacement: '',
    en_entrepot: false,
    categorie: '',
    utilisateur: '',
    statut: '',
    modele: '',
    utilisation: '',
    propriete: '',
    note: '',
  };
  const handleSubmit = (values: FormikValues) => {
    console.log(values);
  };
  if (loading) {
    return <CircularProgress className="m-auto mt-20" />;
  }

  return (
    <div className="flex h-fit">
      <div className="ml-12 mr-6 mt-20 w-2/3 h-full">
        <h1 className="text-3xl mb-8">Modifier des actifs</h1>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, handleChange, dirty }) => (
            <Form>
              <div className="input-container">
                <Field
                  className="input-field"
                  name="modele"
                  component={CustomSelect}
                  options={modeles}
                  label="Modele"
                />
              </div>
              <div className="input-container">
                <Field
                  className="input-field"
                  name="categorie"
                  component={CustomSelect}
                  options={categories}
                  label="Categorie"
                />
              </div>
              <div className="input-container">
                <Field
                  className="input-field"
                  name="statut"
                  component={CustomSelect}
                  options={statuts}
                  label="Statut"
                />
              </div>
              <div className="input-container">
                <Field
                  className="input-field"
                  name="assigne_a"
                  component={CustomSelect}
                  options={locataires}
                  label="Locataire"
                />
              </div>
              <div className="input-container">
                <Field
                  className="input-field"
                  name="emplacement"
                  component={CustomSelect}
                  options={emplacements}
                  label="Emplacement"
                />
              </div>
              <div>
                <Field
                  type="checkbox"
                  name="en_entrepot"
                  id="en_entrepot"
                  className="input-field"
                  checked={values.en_entrepot}
                  onChange={handleChange}
                />
                <label htmlFor="en_entrepot">En entrepot</label>
              </div>
              <div className="input-container">
                <Field
                  className="input-field"
                  name="utilisation"
                  component={CustomSelect}
                  options={utilisations}
                  label="Utilisation"
                />
              </div>
              <div className="input-container">
                <Field
                  className="input-field"
                  name="proprietaire"
                  component={CustomSelect}
                  options={proprietaires}
                  label="Proprietaire"
                />
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="input-container">
                  <Field
                    component={DatePicker}
                    label="Date de retour :"
                    format="DD/MM/YYYY"
                    name="date_retour"
                    className="input-label "
                  />
                </div>
              </LocalizationProvider>
              <div className="input-container">
                <label htmlFor="note">Note:</label>

                <Field
                  as={TextareaAutosize}
                  id="note"
                  name="note"
                  value={values.note}
                  onChange={handleChange}
                />
              </div>

              <div className="w-11/12">
                <Button
                  className="my-5 mx-5 flex float-right"
                  variant="contained"
                  color="primary"
                  size="medium"
                  type="submit"
                  disabled={!dirty}
                >
                  Sauvegarder
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <SelectActifsList
        selectedActifs={selectedActifs}
        setSelectedActifs={setSelectedActifs}
        actifs={actifs}
      />
    </div>
  );
};

export default ModifyActifs;
