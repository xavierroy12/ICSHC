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
  console.log(actif);
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
      est_en_entrepot: actif.est_en_entrepot,
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
        en_entrepot: form.values.est_en_entrepot,
        date_retour: form.values.date_retour,
        note: form.values.note,
        id_client: form.values.id_assigne_a, // Map the 'assigne_a' field to 'id_client'
        id_modele: form.values.id_modele, // Map the 'modele' field to 'id_modele_commande'
        id_statut: form.values.id_statut, // Map the 'statut' field to 'id_statut'
        id_emplacement: form.values.id_emplacement, // Map the 'emplacement' field to 'id_emplacement'
        id_proprietaire: form.values.id_proprietaire, // Map the 'proprietaire' field to 'id_proprietaire'
        id_utilisation: form.values.id_utilisation, // Map the 'utilisation' field to 'id_utilisation'
      };

      // Make an API request to update the data in the database
      await fetch(`http://localhost:8000/api/actif/${id}`, {
        method: 'POST',
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
        <label className="input-label">Nom :</label>
        <TextInput className="input-field" value={form.values.nom} disabled />
      </div>

      <div className="input-container">
        <label className="input-label">Numéro de série :</label>
        <TextInput
          className="input-field"
          value={form.values.numero_serie}
          disabled
        />
      </div>

      <div className="input-container">
        <label className="input-label">Adresse MAC :</label>
        <TextInput
          className="input-field"
          value={form.values.adresse_mac}
          disabled
        />
      </div>

      <div className="input-container">
        <label className="input-label">Modèle :</label>
        <Select
          className="input-field"
          placeholder="Veuiilez choisir un modèle"
          value={form.values.id_modele}
          defaultValue={'1'}
          onChange={(value) => {
            if (value) form.setFieldValue('id_modele', value);
          }}
          data={modeles}
        />
      </div>

      <div className="input-container">
        <label className="input-label">Catégorie :</label>
        <Select
          className="input-field"
          placeholder="Veuiilez choisir une catégorie"
          value={form.values.id_categorie}
          onChange={(value) => {
            console.log(value);
            if (value) form.setFieldValue('id_categorie', value);
          }}
          data={categories}
        />
      </div>

      <div className="input-container">
        <label className="input-label">Assigné à :</label>
        <Select
          className="input-field"
          placeholder="Veuiilez choisir un locataire"
          value={form.values.id_assigne_a}
          onChange={(value) => {
            if (value) form.setFieldValue('id_assigne_a', value);
          }}
          data={locataires}
        />
      </div>

      <div className="input-container">
        <label className="input-label">Emplacement :</label>
        <Select
          className="input-field"
          placeholder="Veuiilez choisir un emplacement"
          value={form.values.id_emplacement}
          onChange={(value) => {
            if (value) form.setFieldValue('id_emplacement', value);
          }}
          data={emplacements}
        />
      </div>

      <div className="input-container">
        <label className="input-label checkbox-label">En entrepôt :</label>
        <Checkbox
          className="mt-2 checkbox-field"
          checked={form.values.est_en_entrepot}
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
          value={form.values.id_statut}
          onChange={(value) => {
            if (value) form.setFieldValue('id_statut', value);
          }}
          data={statuts}
        />
      </div>

      <div className="input-container">
        <label className="input-label">Propriétaire :</label>
        <Select
          className="input-field"
          placeholder="Veuiilez choisir un propriétaire"
          value={form.values.id_proprietaire}
          onChange={(value) => {
            if (value) form.setFieldValue('id_proprietaire', value);
          }}
          data={proprietaires}
        />
      </div>

      <div className="input-container">
        <label className="input-label">Utilisation :</label>
        <Select
          className="input-field"
          placeholder="Veuiilez choisir une utilisation"
          value={form.values.id_utilisation}
          onChange={(value) => {
            if (value) form.setFieldValue('id_utilisation', value);
          }}
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
          value={form.values.date_retour}
          onChange={(event) =>
            form.setFieldValue('date_retour', event.currentTarget.value)
          }
        />
      </div>

      <div className="input-container">
        <label className="input-label">Note :</label>
        <Textarea
          className="note-size"
          value={form.values.note}
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
  );
};

export default ActifForm;
