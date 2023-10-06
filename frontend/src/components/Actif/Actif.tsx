import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress'; // Import Material-UI CircularProgress
import { Actif_Type, LightType, SelectItem } from './type';
import ActifForm from './ActifForm';
import { Typography } from '@mui/material';

// Import any other Material-UI components you might need.

const Actif = () => {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [statuts, setStatuts] = useState<SelectItem[]>([]);
  const [modeles, setModeles] = useState<SelectItem[]>([]);
  const [categories, setCategories] = useState<SelectItem[]>([]);
  const [emplacements, setEmplacements] = useState<SelectItem[]>([]);
  const [locataires, setLocataires] = useState<SelectItem[]>([]);
  const [utilisations, setUtilisations] = useState<SelectItem[]>([]);
  const [proprietaires, setProprietaires] = useState<SelectItem[]>([]);
  const [actif, setActif] = useState<Actif_Type>();

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8000/api/statuts/light'),
      fetch('http://localhost:8000/api/modeles/light'),
      fetch('http://localhost:8000/api/categories/light'),
      fetch('http://localhost:8000/api/emplacements/light'),
      fetch('http://localhost:8000/api/clients/light'),
      fetch('http://localhost:8000/api/utilisations/light'),
      fetch('http://localhost:8000/api/proprietaires/light'),
      fetch(`http://localhost:8000/api/actif/${id}`),
    ])
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then(
        ([
          fetchedStatuts,
          fetchedModeles,
          fetchedCategories,
          fetchedEmplacements,
          fetchedLocataires,
          fetchedUtilisations,
          fetchedProprietaires,
          fetchedActif,
        ]) => {
          setStatuts(
            fetchedStatuts.map((statut: LightType) => ({
              id: statut.id,
              label: statut.nom,
            }))
          );
          setModeles(
            fetchedModeles.map((modele: LightType) => ({
              id: modele.id,
              label: modele.nom,
            }))
          );
          setCategories(
            fetchedCategories.map((categorie: LightType) => ({
              id: categorie.id,
              label: categorie.nom,
            }))
          );
          setEmplacements(
            fetchedEmplacements.map((localisation: LightType) => ({
              id: localisation.id,
              label: localisation.nom,
            }))
          );
          setLocataires(
            fetchedLocataires.map((locataire: LightType) => ({
              id: locataire.id,
              label: locataire.nom,
            }))
          );
          setUtilisations(
            fetchedUtilisations.map((utilisation: LightType) => ({
              id: utilisation.id,
              label: utilisation.nom,
            }))
          );
          setProprietaires(
            fetchedProprietaires.map((proprietaire: LightType) => ({
              id: proprietaire.id,
              label: proprietaire.nom,
            }))
          );
          setActif(fetchedActif);
          setLoading(false);
        }
      );
  }, [id]);

  return (
    <div className="">
      {loading ? (
            <div className="fixed inset-0 flex items-center justify-center">
                <CircularProgress />
            </div> // Replace loading indicator with CircularProgress
      ) : (
        <div className="mx-auto mt-8">
          {actif && id && (
            <Fragment>
              <div className="mx-8 ">
                <Typography variant="h2" className="my-8 mx-auto">
                  Actif: {actif.nom}
                </Typography>
                <hr />
                <div className="p-4 my-4 bg-slate-100 w-2/3 mx-auto">
                  <ActifForm
                    id={id}
                    actif={actif}
                    statuts={statuts}
                    modeles={modeles}
                    categories={categories}
                    emplacements={emplacements}
                    locataires={locataires}
                    utilisations={utilisations}
                    proprietaires={proprietaires}
                  />
                </div>
              </div>
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
};

export default Actif;
