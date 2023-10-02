import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  TextInput,
  Textarea,
  Checkbox,
  Select,
  SelectItem,
} from '@mantine/core';
import { Form, useForm } from '@mantine/form';
import { Actif_Type } from './type';

type LightType = {
  id: number;
  nom: string;
};

interface ActifFormValues {
  numeroSerie?: string;
  nom?: string;
  adresseMac?: string;
  modele?: string;
  categorie?: string;
  assigne_a?: string;
  emplacement?: string;
  statut?: string;
  proprietaire?: string;
  utilisation?: string;
  est_en_entrepot?: boolean;
  date_creation?: string;
  date_retour?: string;
  note?: string;
}

const NewActif = () => {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [statuts, setStatuts] = useState<SelectItem[]>([]);
  const [modeles, setModeles] = useState<SelectItem[]>([]);
  const [categories, setCategories] = useState<SelectItem[]>([]);
  const [emplacements, setEmplacements] = useState<SelectItem[]>([]);
  const [locataires, setLocataires] = useState<SelectItem[]>([]);
  const [utilisations, setUtilisations] = useState<SelectItem[]>([]);
  const [proprietaires, setProprietaires] = useState<SelectItem[]>([]);
  const [actif, setActif] = useState<Actif_Type | null>(null);

  // Initialize the form context after fetching actif data
  const form = useForm<ActifFormValues>();

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

  useEffect(() => {
    if (actif && !form.values.numeroSerie) { // Add condition to prevent infinite loop
      // Initialize the form with actif data
      form.setValues({
        numeroSerie: actif.numero_serie,
        nom: actif.nom,
        adresseMac: actif.adresse_mac,
        modele: actif.modele,
        categorie: actif.categorie,
        assigne_a: actif.assigne_a,
        emplacement: actif.emplacement,
        statut: actif.statut,
        proprietaire: actif.proprietaire,
        utilisation: actif.utilisation,
        est_en_entrepot: actif.est_en_entrepot,
        date_creation: actif.date_creation,
        date_retour: actif.date_retour,
        note: actif.note,
      });
    }
  }, [actif, form]);

  const handleSubmit = () => {
    console.log("Données du formulaire:", form.values);
  };

  return (
    <div>
      {loading ? (
        <div>Chargement en cours...</div>
      ) : (
        <>
          <h1>Actif</h1>
          <Form form={form} onSubmit={() => handleSubmit()}>
            <TextInput
              className="mb-8"
              label="Numéro de série :"
              placeholder={actif?.numero_serie}
              value={form.values.numeroSerie || ''}
              readOnly
            />

            <TextInput
              className="mb-8"
              label="Nom :"
              placeholder={actif?.nom}
              value={form.values.nom || ''}
              onChange={(event) => form.setFieldValue('nom', event.currentTarget.value)}
              readOnly
            />

            <TextInput
              className="mb-8"
              label="Adresse MAC :"
              placeholder={actif?.adresse_mac}
              value={form.values.adresseMac || ''}
              onChange={(event) => form.setFieldValue('adresseMac', event.currentTarget.value)}
              readOnly
            />

            <Select
              className="mb-8"
              label="Modèle :"
              placeholder="Veuiilez choisir un modèle"
              value={form.values.modele || ''}
              onChange={(value) => form.setFieldValue('modele', value ?? undefined)}
              data={modeles}
            />


            <Select
              className="mb-8"
              label="Catégorie :"
              placeholder="Veuiilez choisir une catégorie"
              value={form.values.categorie || ''}
              onChange={(value) => form.setFieldValue('categorie', value ?? undefined)}
              data={categories}
            />

            <Select
              className="mb-8"
              label="Assigné à :"
              placeholder="Veuiilez choisir un locataire"
              value={form.values.assigne_a || ''}
              onChange={(value) => form.setFieldValue('assigne_a', value ?? undefined)}
              data={locataires}
            />

            <Select
              className="mb-8"
              label="Emplacement :"
              placeholder="Veuiilez choisir un emplacement"
              value={form.values.emplacement || ''}
              onChange={(value) => form.setFieldValue('emplacement', value ?? undefined)}
              data={emplacements}
            />

            <div className="flex checkbox-container mb-8">
            <label className="flex checkbox-label">Est en entrepôt :</label>
            <Checkbox
                className="ml-2 flex checkbox-input"
                checked={form.values.est_en_entrepot || false}
                onChange={(event) => form.setFieldValue('est_en_entrepot', event.currentTarget.checked)}
            />
            </div>

            <Select
              className="mb-8"
              label="Statut :"
              placeholder="Veuiilez choisir un statut"
              value={form.values.statut || ''}
              onChange={(value) => form.setFieldValue('statut', value ?? undefined)}
              data={statuts}
            />

            <Select
              className="mb-8"
              label="Propriétaire :"
              placeholder="Veuiilez choisir un propriétaire"
              value={form.values.proprietaire || ''}
              onChange={(value) => form.setFieldValue('proprietaire', value ?? undefined)}
              data={proprietaires}
            />

            <Select
              className="mb-8"
              label="Utilisation :"
              placeholder="Veuiilez choisir une utilisation"
              value={form.values.utilisation || ''}
              onChange={(value) => form.setFieldValue('utilisation', value ?? undefined)}
              data={utilisations}
            />

            <TextInput
                className="mb-8"
                label="Date de création :"
                placeholder={actif?.date_creation}
                value={form.values.date_creation ? new Date(form.values.date_creation).toISOString().substring(0, 10) : ''}
                onChange={(event) => form.setFieldValue('date_creation', event.currentTarget.value)}
                readOnly
            />


            <TextInput
              className="mb-8"
              label="Date de retour :"
              placeholder={actif?.date_retour}
              value={form.values.date_retour || ''}
              onChange={(event) => form.setFieldValue('date_retour', event.currentTarget.value)}
              readOnly
            />


            <Textarea
              className="mb-8"
              label="Note :"
              placeholder={actif?.note}
              value={form.values.note || ''}
              onChange={(event) => form.setFieldValue('note', event.currentTarget.value)}
              readOnly
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
        </>
      )}
    </div>
  );
};

export default NewActif;
