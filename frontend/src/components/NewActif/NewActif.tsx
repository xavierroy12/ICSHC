import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Actif.scss';
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
    [key: string]: string | boolean | undefined;
    numero_serie?: string;
    nom?: string;
    adresse_mac?: string;
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
          console.log("Données de 'actif' avant l'envoi du form:", actif);
          setActif(actif);
          setLoading(false);
        }
      );
  }, [id]);

  useEffect(() => {
    if (actif && !form.values.numero_serie) {
      // Add condition to prevent infinite loop
      // Initialize the form with actif data
      form.setValues({
        numero_serie: actif.numero_serie,
        nom: actif.nom,
        adresse_mac: actif.adresse_mac,
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

  const handleSauvegarde = async () => {
    try {
      // Map the form values to match the expected field names in your Laravel API
      const updatedData = {
        en_entrepot: form.values.est_en_entrepot,
        date_retour: form.values.date_retour,
        note: form.values.note,
        id_modele_commande: form.values.modele, // Map the 'modele' field to 'id_modele_commande'
        id_statut: form.values.statut, // Map the 'statut' field to 'id_statut'
        id_emplacement: form.values.emplacement, // Map the 'emplacement' field to 'id_emplacement'
        id_proprietaire: form.values.proprietaire, // Map the 'proprietaire' field to 'id_proprietaire'
        id_utilisation: form.values.utilisation, // Map the 'utilisation' field to 'id_utilisation'
      };

      // Make an API request to update the data in the database
      await fetch(`http://localhost:8000/api/actif/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData), // Send the updated data with the mapped field names
      });

      // Display a success message to the user
      console.log('Data saved successfully');
      console.log(updatedData);
      alert('Données sauvegardées avec succès');
      window.location.href = 'http://localhost:5173/actifs';

    } catch (error) {
      // Handle errors if the API request fails
      console.error('Error saving data:', error);
    }
  };

  const handleReception = () => {
    form.setFieldValue('buttonClicked', 'reception');
    console.log(form.values)
    console.log("reception")
  };

  const handleArchive = () => {
    form.setFieldValue('buttonClicked', 'archiver');
    console.log(form.values)
    console.log("archiver")
  };

  return (
    <div className="">
      {loading ? (
        <div>Chargement en cours...</div>
      ) : (
        <>
          <h1 className="my-8 mx-8">Actif - {id}</h1>
          <hr className="mb-8" />
          <Form form={form}>

          <div className="input-container">
              <label className="input-label">Nom :</label>
              <TextInput
                className="input-field"
                value={form.values.nom || ''}
                disabled
              />
            </div>

            <div className="input-container">
              <label className="input-label">Numéro de série :</label>
              <TextInput
                className="input-field"
                value={form.values.numero_serie || ''}
                disabled
              />
            </div>

            <div className="input-container">
              <label className="input-label">Adresse MAC :</label>
              <TextInput
                className="input-field"
                value={form.values.adresse_mac || ''}
                disabled
              />
            </div>

            <div className="input-container">
              <label className="input-label">Modèle :</label>
              <Select
                className="input-field"
                placeholder="Veuiilez choisir un modèle"
                value={form.values.modele || ''}
                onChange={(value) =>
                  form.setFieldValue('modele', value ?? undefined)
                }
                data={modeles}
              />
            </div>

            <div className="input-container">
              <label className="input-label">Catégorie :</label>
              <Select
                className="input-field"
                placeholder="Veuiilez choisir une catégorie"
                value={form.values.categorie || ''}
                onChange={(value) =>
                  form.setFieldValue('categorie', value ?? undefined)
                }
                data={categories}
              />
            </div>

            <div className="input-container">
              <label className="input-label">Assigné à :</label>
              <Select
                className="input-field"
                placeholder="Veuiilez choisir un locataire"
                value={form.values.assigne_a || ''}
                onChange={(value) =>
                  form.setFieldValue('assigne_a', value ?? undefined)
                }
                data={locataires}
              />
            </div>

            <div className="input-container">
              <label className="input-label">Emplacement :</label>
              <Select
                className="input-field"
                placeholder="Veuiilez choisir un emplacement"
                value={form.values.emplacement || ''}
                onChange={(value) =>
                  form.setFieldValue('emplacement', value ?? undefined)
                }
                data={emplacements}
              />
            </div>

            <div className="input-container">
              <label className="input-label checkbox-label">
                En entrepôt :
              </label>
                <Checkbox
                    className="mt-2 checkbox-field"
                    checked={form.values.est_en_entrepot || false}
                    onChange={(event) =>
                    form.setFieldValue('est_en_entrepot', event.currentTarget.checked)
                    }
                />
            </div>

            <div className="input-container">
              <label className="input-label">Statut :</label>
              <Select
                className="input-field"
                placeholder="Veuiilez choisir un statut"
                value={form.values.statut || ''}
                onChange={(value) =>
                  form.setFieldValue('statut', value ?? undefined)
                }
                data={statuts}
              />
            </div>

            <div className="input-container">
              <label className="input-label">Propriétaire :</label>
              <Select
                className="input-field"
                placeholder="Veuiilez choisir un propriétaire"
                value={form.values.proprietaire || ''}
                onChange={(value) =>
                  form.setFieldValue('proprietaire', value ?? undefined)
                }
                data={proprietaires}
              />
            </div>

            <div className="input-container">
              <label className="input-label">Utilisation :</label>
              <Select
                className="input-field"
                placeholder="Veuiilez choisir une utilisation"
                value={form.values.utilisation || ''}
                onChange={(value) =>
                  form.setFieldValue('utilisation', value ?? undefined)
                }
                data={utilisations}
              />
            </div>

            <div className="input-container">
              <label className="input-label">Date de création :</label>
              <TextInput
                className="input-field"
                value={
                  form.values.date_creation
                    ? new Date(form.values.date_creation)
                        .toISOString()
                        .substring(0, 10)
                    : ''
                }
                disabled
              />
            </div>

            <div className="input-container">
              <label className="input-label">Date de retour :</label>
              <TextInput
                className="input-field"
                value={form.values.date_retour || ''}
                onChange={(event) =>
                  form.setFieldValue('date_retour', event.currentTarget.value)
                }
              />
            </div>

            <div className="input-container">
              <label className="input-label">Note :</label>
              <Textarea
                className="note-size"
                value={form.values.note || ''}
                onChange={(event) =>
                  form.setFieldValue('note', event.currentTarget.value)
                }
              />
            </div>

            <div className="w-11/12">
              <Button
                className="my-5 mx-5 flex float-right"
                color="green"
                variant="outline"
                size="md"
                type="submit"
                onClick={handleSauvegarde}
              >
                Sauvegarder
              </Button>
            </div>

            <div className="w-11/12">
              <Button
                className="my-5 mx-5 flex float-right"
                color="blue"
                variant="outline"
                size="md"
                type="submit"
                onClick={handleReception}
              >
                Réception
              </Button>
            </div>

            <div className="w-11/12">
              <Button
                className=" my-5 mx-5 flex float-right"
                color="red"
                variant="outline"
                size="md"
                type="submit"
                onClick={handleArchive}
              >
                Archiver
              </Button>
            </div>

          </Form>
        </>
      )}
    </div>
  );
};

export default NewActif;
