import { Form, useForm, isNotEmpty } from '@mantine/form';
import { ActifFormValues, Actif_Type } from './type';
import {
  Button,
  Checkbox,
  TextInput,
  Textarea,
  SelectItem,
  NativeSelect,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { DateInput } from '@mantine/dates';

type Props = {
  id: string;
  actif: Actif_Type;
  statuts: SelectItem[];
  modeles: SelectItem[];
  categories: SelectItem[];
  emplacements: SelectItem[];
  locataires: SelectItem[];
  utilisations: SelectItem[];
  proprietaires: SelectItem[];
};
const ActifForm = ({
  id,
  actif,
  statuts,
  modeles,
  categories,
  emplacements,
  locataires,
  utilisations,
  proprietaires,
}: Props) => {
  const navigate = useNavigate();

  const form = useForm<ActifFormValues>({
    initialValues: {
      numero_commande: actif.numero_commande,
      numero_serie: actif.numero_serie,
      nom: actif.nom,
      adresse_mac: actif.adresse_mac,
      id_statut: actif.id_statut?.toString(),
      id_emplacement: actif.id_emplacement?.toString(),
      id_proprietaire: actif.id_proprietaire?.toString(),
      id_utilisation: actif.id_utilisation?.toString(),
      id_categorie: actif.id_categorie?.toString(),
      id_modele: actif.id_modele?.toString(),
      id_assigne_a: actif.id_client?.toString(),
      en_entrepot: actif.en_entrepot || false,
      date_creation: actif.date_creation,
      date_retour: actif.date_retour,
      note: actif.note,
    },
    validate: {
    numero_commande: isNotEmpty('Veuillez entrer un numéro de commande'),
      numero_serie: isNotEmpty('Veuillez entrer un numéro de série'),
      nom: isNotEmpty('Veuillez entrer un nom'),
      adresse_mac: isNotEmpty('Veuillez entrer une adresse MAC'),
      id_statut: isNotEmpty('Veuillez entrer un statut'),
      id_emplacement: isNotEmpty('Veuillez entrer un emplacement'),
      id_proprietaire: isNotEmpty('Veuillez entrer un propriétaire'),
      id_utilisation: isNotEmpty('Veuillez entrer une utilisation'),
      id_categorie: isNotEmpty('Veuillez entrer une catégorie'),
      id_modele: isNotEmpty('Veuillez entrer un modèle'),
      id_assigne_a: isNotEmpty('Veuillez entrer un locataire'),
    },
  });
  const handleSauvegarde = async () => {
    if (form.isDirty()) {
      try {
        // Map the form values to match the expected field names in your Laravel API
        console.log(form.values);
        const updatedData = {
          id_categorie: form.values.id_categorie,
          en_entrepot: form.values.en_entrepot,
          date_retour: form.values.date_retour,
          note: form.values.note,
          id_assigne_a: form.values.id_assigne_a,
          id_modele: form.values.id_modele,
          id_statut: form.values.id_statut,
          id_emplacement: form.values.id_emplacement,
          id_proprietaire: form.values.id_proprietaire,
          id_utilisation: form.values.id_utilisation,
        };

        // Make an API request to update the data in the database
        const response = await fetch(`http://localhost:8000/api/actif/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData), // Send the updated data with the mapped field names
        });

        // Check if the API request was successful
        if (response.ok) {
          // Display a success message to the user
          alert('Données sauvegardées avec succès');
          console.log('Données sauvegardées avec succès: ', updatedData);
          navigate('/actifs');
        } else {
          // Handle errors if the API request fails
          console.error('Error saving data:', response.statusText);
          console.log('CA NE FONCTIONNE PAS ', updatedData);
        }
      } catch (error) {
        // Handle errors if the API request fails
        console.error('Error saving data:', error);
      }
    }
  };


  const handleReception = () => {
    form.setFieldValue('buttonClicked', 'reception');
    console.log(form.values);
    console.log('reception');
  };

  const handleArchive = () => {
    form.setFieldValue('buttonClicked', 'archiver');
    console.log(form.values);
    console.log('archiver');
  };

  return (
    <Form form={form}>

    <div className="input-container">
        <TextInput
          label="Numéro de commande :"
          className="input-label "
          value={form.values.numero_commande}
          disabled
        />
      </div>


      <div className="input-container">
        <TextInput
          label="Nom :"
          className="input-label "
          value={form.values.nom}
          disabled
        />
      </div>

      <div className="input-container">
        <TextInput
          label="Numéro de série :"
          className="input-field"
          value={form.values.numero_serie}
          disabled
        />
      </div>

      <div className="input-container">
        <TextInput
          label="Adresse MAC :"
          className="input-field"
          value={form.values.adresse_mac}
          disabled
        />
      </div>

      <div className="input-container">
        <NativeSelect
          label="Modèle :"
          className="input-field"
          placeholder="Veuillez choisir un modèle"
          value={form.values.id_modele}
          defaultValue={form.values.id_modele}
          onChange={(value) => {
            form.setFieldValue('id_modele', value.target.value);
          }}
          data={modeles}
        />
      </div>

      <div className="input-container">
        <NativeSelect
          label="Catégorie :"
          className="input-field"
          placeholder="Veuillez choisir une catégorie"
          defaultValue={form.values.id_categorie}
          value={form.values.id_categorie}
          onChange={(value) => {
            form.setFieldValue('id_categorie', value.target.value);
          }}
          data={categories}
        />
      </div>

      <div className="input-container">

        <NativeSelect
          label="Assigné à :"
          className="input-field"
          placeholder="Veuillez choisir un locataire"
          value={form.values.id_assigne_a}
        defaultValue={form.values.id_assigne_a}
          onChange={(value) => {
            form.setFieldValue('id_assigne_a', value.target.value);
          }}
          data={locataires}
        />
      </div>

      <div className="input-container">
        <NativeSelect
          label="Emplacement :"
          className="input-field"
          placeholder="Veuillez choisir un emplacement"
          value={form.values.id_emplacement}
          onChange={(value) => {
            form.setFieldValue('id_emplacement', value.target.value);
          }}
          data={emplacements}
        />
      </div>

      <div className="input-container">
        <Checkbox
          label="Est en entrepôt :"
          className="checkbox-field"
          checked={form.values.en_entrepot}
          onChange={(event) => {
            form.setFieldValue('en_entrepot', event.currentTarget.checked);
          }}
        />
      </div>

      <div className="input-container">
        <NativeSelect
          label="Statut :"
          className="input-field"
          placeholder="Veuillez choisir un statut"
          value={form.values.id_statut}
          onChange={(value) => {
            form.setFieldValue('id_statut', value.target.value);
          }}
          data={statuts}
        />
      </div>

      <div className="input-container">
        <NativeSelect
          label="Propriétaire :"
          className="input-field"
          placeholder="Veuillez choisir un propriétaire"
          value={form.values.id_proprietaire}
          onChange={(value) => {
            form.setFieldValue('id_proprietaire', value.target.value);
          }}
          data={proprietaires}
        />
      </div>

      <div className="input-container">
        <NativeSelect
          label="Utilisation :"
          className="input-field"
          placeholder="Veuillez choisir une utilisation"
          value={form.values.id_utilisation}
          onChange={(value) => {
            form.setFieldValue('id_utilisation', value.target.value);
          }}
          data={utilisations}
        />
      </div>

      <div className="input-container">
        <DateInput
          label="Date de création :"
          className="input-field"
          value={
            form.values.date_creation
              ? new Date(form.values.date_creation)
              : undefined
          }
          disabled
        />
      </div>

      <div className="input-container">
        <DateInput
          label="Date de retour :"
          className="input-field"

          value={
            form.values.date_retour
              ? new Date(form.values.date_retour): undefined
          }
          /*
          onChange={(value) => {
            form.setFieldValue('date_retour', value?.toString());
            console.log(value);
          }}
          */
          disabled
        />
      </div>

      <div className="input-container">
        <Textarea
          label="Note :"
          className="note-size"
          value={form.values.note}
          onChange={(event) => {
            form.setFieldValue('note', event.currentTarget.value);
          }}
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
          disabled={!form.isDirty()}
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
  );
};

export default ActifForm;
