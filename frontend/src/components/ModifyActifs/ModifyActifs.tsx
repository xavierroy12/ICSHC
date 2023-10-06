import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import SelectActifsList from '../SelectActifsList';
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

const ModifyActifs = () => {
  const location = useLocation();
  const { selectedRows } = location.state;

  const [loading, setLoading] = useState(true);
  const [statuts, setStatuts] = useState<SelectItem[]>([]);
  const [modeles, setModeles] = useState<SelectItem[]>([]);
  const [emplacements, setEmplacements] = useState<SelectItem[]>([]);
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
            selectedRows.map((selectedRow) =>
              actifsData.find((actif: LightActif) => actif.id === selectedRow)
            )
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
        <div className="mb-8">
          <Typography variant="h4">Modifier des actifs</Typography>
        </div>
        <hr />

        <div className="p-4 my-4 bg-slate-100 w-full mx-auto h-full">
          <ModifyActifsForm
            selectedRows={selectedRows}
            statuts={statuts}
            modeles={modeles}
            categories={categories}
            emplacements={emplacements}
            utilisations={utilisations}
            proprietaires={proprietaires}
          />
        </div>
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
