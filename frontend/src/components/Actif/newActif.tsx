import { Button, Checkbox, Select, SelectItem } from '@mantine/core';
import { Form, useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Actif_Type } from './type';

type LightType = {
  id: number;
  nom: string;
};

const Actif = () => {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [statuts, setStatuts] = useState<SelectItem[]>([]);
  const [modeles, setModeles] = useState<SelectItem[]>([]);
  const [emplacements, setEmplacements] = useState<SelectItem[]>([]);
  const [locataires, setLocataires] = useState<SelectItem[]>([]);
  const [utilisations, setUtilisations] = useState<SelectItem[]>([]);
  const [proprietaires, setProprietaires] = useState<SelectItem[]>([]);
  const [actif, setActif] = useState<Actif_Type>();
  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8000/api/statuts/light'),
      fetch('http://localhost:8000/api/modeles/light'),
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

  const form = useForm({
    initialValues: {
      numeroSerie: actif?.numero_serie,
      nom: actif?.nom,
      adresseMac: actif?.adresse_mac,
      modele: actif?.modele,
      categorie: actif?.categorie,
      assigne_a: actif?.assigne_a,
      emplacement: actif?.emplacement,
      statut: actif?.statut,
    },
  });
  const handleSubmit = () => {
    console.log(form.values);
  };

  return (
    <div>
      <h1>Actif</h1>
      <Form form={form} onSubmit={handleSubmit}>
        <Select
          className="mb-8"
          required
          transitionProps={{
            transition: 'pop-top-left',
            duration: 80,
            timingFunction: 'ease',
          }}
          error={form.errors.statut && 'Ce champ est requis'}
          searchable
          label="Emplacement"
          placeholder="Sélectionner une option"
          value={form.getInputProps('emplacement').value}
          onChange={(value) => form.setFieldValue('emplacement', value || '')}
          data={emplacements}
        />
        <Checkbox
          className="mb-8"
          label="Est en entropôt"
          checked={form.getInputProps('entrepot').value}
          onChange={(value) =>
            form.setFieldValue('estEnEntropot', value.currentTarget.checked)
          }
        />
        <div className="w-11/12 mx-auto">
          <Button
            className="flex float-right"
            color="green"
            variant="outline"
            size="md"
            type="submit"
          >
            Sauvegarder
          </Button>
        </div>
      </Form>
    </div>
  );
};
