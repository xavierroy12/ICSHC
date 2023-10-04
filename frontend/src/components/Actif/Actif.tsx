import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Actif.scss';
import { SelectItem } from '@mantine/core';
import { Actif_Type, LightType } from './type';
import ActifForm from './ActifForm';

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
          statuts,
          modeles,
          categories,
          localisations,
          locataires,
          utilisations,
          proprietaires,
          actif,
        ]) => {
          setStatuts(
            statuts.map((statut: LightType) => ({
              value: statut.id,
              label: statut.nom,
            }))
          );
          setModeles(
            modeles.map((modele: LightType) => ({
              value: modele.id,
              label: modele.nom,
            }))
          );
          setCategories(
            categories.map((categorie: LightType) => ({
              value: categorie.id,
              label: categorie.nom,
            }))
          );
          setEmplacements(
            localisations.map((localisation: LightType) => ({
              value: localisation.id,
              label: localisation.nom,
            }))
          );
          setLocataires(
            locataires.map((locataire: LightType) => ({
              value: locataire.id,
              label: locataire.nom,
            }))
          );
          setUtilisations(
            utilisations.map((utilisation: LightType) => ({
              value: utilisation.id,
              label: utilisation.nom,
            }))
          );
          setProprietaires(
            proprietaires.map((proprietaire: LightType) => ({
              value: proprietaire.id,
              label: proprietaire.nom,
            }))
          );
          setActif(actif);
          setLoading(false);
        }
      );
  }, [id]);

  return (
    <div className="">
      {loading ? (
        <div>Chargement en cours...</div>
      ) : (
        <Fragment>
          {actif && id && (
            <Fragment>
              <h1 className="my-8 mx-8">Actif - {id}</h1>
              <hr className="mb-8" />
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
            </Fragment>
          )}
          <hr className="mb-8" />
        </Fragment>
      )}
    </div>
  );
};

export default Actif;
