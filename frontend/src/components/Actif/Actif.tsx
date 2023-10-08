import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress'; // Import Material-UI CircularProgress
import { Actif_Type, LightType, SelectItem } from './type';
import ActifForm from './ActifForm';
import { Typography } from '@mui/material';
import { Formik, FormikValues } from 'formik';

const Actif = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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

  const initialValues = {
    numero_commande: actif?.numero_commande,
    numero_serie: actif?.numero_serie,
    nom: actif?.nom,
    adresse_mac: actif?.adresse_mac,
    statut: actif?.id_statut.toString(),
    emplacement: actif?.id_emplacement.toString(),
    proprietaire: actif?.id_proprietaire.toString(),
    utilisation: actif?.id_utilisation.toString(),
    categorie: actif?.id_categorie.toString(),
    modele: actif?.id_modele.toString(),
    assigne_a: actif?.id_client?.toString(),
    en_entrepot: actif?.en_entrepot || false,
    date_creation: actif?.date_creation,
    date_retour: actif?.date_retour,
    note: actif?.note,
  };

  const handleArchive = (values: FormikValues) => {
    const confirmed = window.confirm(
      'Attention! Si vous retirez un actif du trafic, il ne sera plus en fonction et accessible dans la liste des actifs. Êtes-vous certain de vouloir faire cette action?'
    );

    if (confirmed) {
      // Set the statut of the actif to "Archivé"
      const updatedActif = {
        nom: values.nom,
        numero_serie: values.numero_serie,
        id_categorie: values.categorie.id || values.categorie,
        en_entrepot: values.en_entrepot,
        date_retour: values.date_retour,
        note: values.note,
        id_assigne_a: values.assigne_a?.id || values.assigne_a || '',
        id_modele: values.modele.id || values.modele,
        id_statut: 5,
        id_emplacement: values.emplacement.id || values.emplacement,
        id_proprietaire: values.proprietaire.id || values.proprietaire,
        id_utilisation: values.utilisation.id || values.utilisation,
      };

      // Update the actif in the database
      // ...
      handleUpdate(updatedActif);

      // Navigate back to the actifs page
      navigate('/actifs');
    } else {
      // Cancel the action
    }
  };

  const handleSubmit = (values: FormikValues) => {
    // Map the form values to match the expected field names in your Laravel API
    const updatedData = {
      nom: values.nom,
      numero_serie: values.numero_serie,

      id_categorie: values.categorie.id || values.categorie,
      en_entrepot: values.en_entrepot,
      date_retour: values.date_retour,
      note: values.note,
      id_assigne_a: values.assigne_a?.id || values.assigne_a || '',
      id_modele: values.modele.id || values.modele,
      id_statut: values.statut.id || values.statut,
      id_emplacement: values.emplacement.id || values.emplacement,
      id_proprietaire: values.proprietaire.id || values.proprietaire,
      id_utilisation: values.utilisation.id || values.utilisation,
    };

    handleUpdate(updatedData);
  };

  const handleReception = (values: FormikValues) => {
    const statut = statuts.find((statut) => statut.label === 'Déployable');

    const updatedData = {
      nom: values.nom,
      numero_serie: values.numero_serie,

      id_categorie: values.categorie.id || values.categorie,
      en_entrepot: true,
      date_retour: values.date_retour,
      note: values.note,
      id_assigne_a: '',
      id_modele: values.modele.id || values.modele,
      id_statut: statut?.id,
      id_emplacement: values.emplacement.id || values.emplacement,
      id_proprietaire: values.proprietaire.id || values.proprietaire,
      id_utilisation: values.utilisation.id || values.utilisation,
    };
    handleUpdate(updatedData);
  };

  const handleUpdate = (values: FormikValues) => {
    try {
      fetch(`http://localhost:8000/api/actif/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (response.ok) {
            alert('Données sauvegardées avec succès');
            navigate('/actifs');
          } else {
            console.error('Error saving data:', response.statusText);
            console.log('CA NE FONCTIONNE PAS ', values);
          }
        })
        .catch((error) => {
          console.error('Error saving data:', error);
        });
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="mx-auto mt-8">
          {actif && id && (
            <div className="min-w-fit">
              <div className="mx-8 ">
                <Typography variant="h2" className="my-8 mx-auto">
                  Actif: {actif.nom}
                </Typography>
                <div className="flex justify-between w-fit bg-slate-100 min-w-fit mt-4">
                  <div className="p-4 my-4   mx-auto">
                    <Formik
                      initialValues={initialValues}
                      onSubmit={handleSubmit}
                    >
                      {({ values, handleChange, dirty, setFieldValue }) => (
                        <ActifForm
                          values={values}
                          handleChange={handleChange}
                          dirty={dirty}
                          setFieldValue={setFieldValue}
                          statuts={statuts}
                          modeles={modeles}
                          categories={categories}
                          emplacements={emplacements}
                          locataires={locataires}
                          utilisations={utilisations}
                          proprietaires={proprietaires}
                          handleReception={handleReception}
                          handleArchive={handleArchive}
                        />
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Actif;
