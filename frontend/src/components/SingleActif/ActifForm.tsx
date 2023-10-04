import { Form, useForm } from '@mantine/form';
import { ActifFormValues, Actif_Type } from './type';
import {
  Button,
  Checkbox,
  Select,
  TextInput,
  Textarea,
  SelectItem,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { th } from 'date-fns/locale';

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
      est_en_entrepot: actif.est_en_entrepot || false,
      date_creation: actif.date_creation,
      date_retour: actif.date_retour,
      note: actif.note,
    },
    // validate: {
    //   numero_serie: (value: string | undefined) => null,
    //   nom: (value: string | undefined) => null,
    //   adresse_mac: (value: string | undefined) => null,
    //   modele: (value: string | undefined) =>
    //     value ? 'Veuillez entrer un modèle' : null,
    //   categorie: (value: string | undefined) =>
    //     value ? 'Veuillez entrer une catégorie' : null,
    //   assigne_a: (value: string | undefined) => null,
    //   emplacement: (value: string | undefined) =>
    //     value ? 'Veuillez entrer un emplacement' : null,
    //   statut: (value: string | undefined) =>
    //     value ? 'Veuillez entrer un statut' : null,
    //   proprietaire: (value: string | undefined) =>
    //     value ? 'Veuillez entrer un propriétaire' : null,
    //   utilisation: (value: string | undefined) =>
    //     value ? 'Veuillez entrer une utilisation' : null,
    //   date_creation: (value: string | undefined) => null,
    //   est_en_entrepot: (value: boolean | undefined) => null,
    //   date_retour: (value: string | undefined) => null,
    //   note: (value: string | undefined) => null,
    // },
  });

  const handleSauvegarde = async () => {
    try {
      // Map the form values to match the expected field names in your Laravel API
      const updatedData = {
        id_categorie: form.values.id_categorie,
        est_en_entrepot: form.values.est_en_entrepot,
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
        label="Nom :"
        className='input-label'
        value={form.values.nom}
        disabled
        />
      </div>

      <div className="input-container">
        <TextInput
          label ="Numéro de série :"
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
        <Select
          label="Modèle :"
          className="input-field"
          placeholder="Veuillez choisir un modèle"
          value={form.values.id_modele}
          defaultValue={'1'}
          onChange={(value) => {
            if (value) form.setFieldValue('id_modele', value);
            console.log("Valeur de modele: ", value);
          }}
          data={modeles}
        />
      </div>

      <div className="input-container">
        <Select
          label="Catégorie :"
          className="input-field"
          placeholder="Veuillez choisir une catégorie"
          value={form.values.id_categorie}
          onChange={(value) => {
            if (value) form.setFieldValue('id_categorie', value);
            console.log("Valeur de categorie: ",value);
          }}
          data={categories}
        />
      </div>

      <div className="input-container">
        <Select
         label="Assigné à :"
          className="input-field"
          placeholder="Veuillez choisir un locataire"
          value={form.values.id_assigne_a}
          onChange={(value) => {
            if (value) form.setFieldValue('id_assigne_a', value);
            console.log("Valeur de locataire: ",value);
          }}
          data={locataires}
        />
      </div>

      <div className="input-container">
        <Select
          label="Emplacement :"
          className="input-field"
          placeholder="Veuillez choisir un emplacement"
          value={form.values.id_emplacement}
          onChange={(value) => {
            if (value) form.setFieldValue('id_emplacement', value);
            console.log("Valeur de emplacement: ",value);
          }}
          data={emplacements}
        />
      </div>

        <div className="input-container">
        <Checkbox
            label="Est en entrepôt :"
            className="checkbox-field"
            checked={form.values.est_en_entrepot}
            onChange={(event) => {
            form.setFieldValue('est_en_entrepot', event.currentTarget.checked);
            console.log(`Valeur de est_en_entrepot: ${event.currentTarget.checked}`);
            }}
        />
        </div>

      <div className="input-container">
        <Select
          label="Statut :"
          className="input-field"
          placeholder="Veuillez choisir un statut"
          value={form.values.id_statut}
          onChange={(value) => {
            if (value) form.setFieldValue('id_statut', value);
            console.log("Valeur de statut: ",value);
          }}
          data={statuts}
        />
      </div>

      <div className="input-container">
        <Select
          label="Propriétaire :"
          className="input-field"
          placeholder="Veuillez choisir un propriétaire"
          value={form.values.id_proprietaire}
          onChange={(value) => {
            if (value) form.setFieldValue('id_proprietaire', value);
            console.log("Valeur de proprietaire: ",value);
          }}
          data={proprietaires}
        />
      </div>

      <div className="input-container">
        <Select
         label="Utilisation :"
          className="input-field"
          placeholder="Veuillez choisir une utilisation"
          value={form.values.id_utilisation}
          onChange={(value) => {
            if (value) form.setFieldValue('id_utilisation', value);
            console.log("Valeur de utilisation: ",value);
          }}
          data={utilisations}
        />
      </div>

      <div className="input-container">
        <TextInput
          label="Date de création :"
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
  <TextInput
    label="Date de retour :"
    className="input-field"
    value={form.values.date_retour}
    onChange={(event) => {
      form.setFieldValue('date_retour', event.currentTarget.value);
      console.log(`Valeur de date_retour: ${event.currentTarget.value}`);
    }}
  />
</div>

<div className="input-container">
  <Textarea
    label="Note :"
    className="note-size"
    value={form.values.note}
    onChange={(event) => {
      form.setFieldValue('note', event.currentTarget.value);
      console.log(`Valeur de note: ${event.currentTarget.value}`);
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
