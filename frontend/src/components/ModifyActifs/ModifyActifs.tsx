import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Button, CircularProgress, Grid, TextField } from '@mui/material';
import { Field, Form, Formik, FormikValues } from 'formik';
import { useLocation } from 'react-router-dom';
import SelectActifsList from '../SelectActifsList';
import CustomSelect from '../CustomSelect';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import ModifyActifsForm from './ModifyActifsForm';
import { SelectItem } from '../Actif/type';

type LightType = {
  id: number;
  nom: string;
};

export type LightActif = {
  id: number;
  nom: string;
  numero_serie: string;
};

const ModifyActifs: React.FC = () => {
  const location = useLocation();
  const { selectedRows } = location.state as { selectedRows: string[] };
  const [loading, setLoading] = useState(true);
  const [statuts, setStatuts] = useState<SelectItem[]>([]);
  const [modeles, setModeles] = useState<SelectItem[]>([]);
  const [emplacements, setEmplacements] = useState<SelectItem[]>([]);
  const [locataires, setLocataires] = useState<SelectItem[]>([]);
  const [utilisations, setUtilisations] = useState<SelectItem[]>([]);
  const [proprietaires, setProprietaires] = useState<SelectItem[]>([]);
  const [categories, setCategories] = useState<SelectItem[]>([]);

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

  if (loading) {
    return <CircularProgress className="m-auto mt-20" />;
  }

  return (
    <div className="flex h-fit">
      <div className="ml-12 mr-6 mt-20 w-2/3 h-full">
        <h1 className="text-3xl mb-8">Modifier des actifs</h1>
        <ModifyActifsForm
          selectedRows={selectedRows}
          statuts={statuts}
          modeles={modeles}
          categories={categories}
          emplacements={emplacements}
          locataires={locataires}
          utilisations={utilisations}
          proprietaires={proprietaires}
        />
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
