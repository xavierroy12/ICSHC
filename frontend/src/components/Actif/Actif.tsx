import { Fragment, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress'; // Import Material-UI CircularProgress
import { Actif_Type, LightType, SelectItem } from './type';
import ActifForm from './ActifForm';
import { Formik, FormikValues } from 'formik';
import FormLayout from '../FormLayout';
import { toast } from 'react-toastify';
import Historique from '../Historique';

const Actif = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [sendingType, setSendingType] = useState<string>(''); // 'reception' | 'archive' | 'update'
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
      fetch(window.name + 'api/statuts/light'),
      fetch(window.name + 'api/modeles/light'),
      fetch(window.name + 'api/emplacements/light'),
      fetch(window.name + 'api/clients/light'),
      fetch(window.name + 'api/utilisations/light'),
      fetch(window.name + 'api/proprietaires/light'),
      fetch(window.name + `api/actif/${id}`),
    ])
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then(
        ([
          fetchedStatuts,
          fetchedModeles,
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
          console.log(fetchedActif);
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
    categorie: actif?.categorie,
    modele: actif?.id_modele.toString(),
    assigne_a: actif?.id_client?.toString(),
    en_entrepot: actif?.en_entrepot || false,
    date_creation: actif?.date_creation,
    date_retour: actif?.date_retour,
    note: actif?.note,
  };

  const formValuesRef = useRef<FormikValues | null>(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleUpdate = (values: FormikValues) => {
    formValuesRef.current = values;
    handleOpen();
  };

  const handleConfirm = () => {
    const values = formValuesRef.current;
    if (!values) return;
    let statut = null;
    switch (sendingType) {
      case 'reception':
        statut =
          statuts.find((statut) => statut.label === 'Déployable')?.id || '';
        break;
      case 'archive':
        statut = statuts.find((statut) => statut.label === 'Archivé')?.id || '';
        break;
      default:
        statut = values.statut.id || values.statut;
    }
    const updatedData = {
      nom: values.nom,
      numero_serie: values.numero_serie,
      numero_commande: values.numero_commande,
      addresse_mac: values.adresse_mac,
      id_categorie: values.categorie,
      en_entrepot: values.en_entrepot,
      date_retour: values.date_retour,
      date_creation: values.date_creation,
      note: values.note,
      id_assigne_a: values.assigne_a?.id || values.assigne_a || '',
      id_modele: values.modele.id || values.modele,
      id_statut: statut,
      id_emplacement: values.emplacement.id || values.emplacement,
      id_proprietaire: values.proprietaire.id || values.proprietaire,
      id_utilisation: values.utilisation.id || values.utilisation,
    };

    sendData(updatedData);

    handleClose();
  };
  const sendData = (values: FormikValues) => {
    const id_user = localStorage.getItem('id_user') || 'unknown'; // retrieve id_user from local storage, default to 'unknown';
    try {
      fetch(window.name + `api/actif/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Action-Id': id_user, // send the user id in a custom header
        },
        body: JSON.stringify(values),
      }).then((response) => {
        if (response.ok) {
          toast.success('Données sauvegardées avec succès');
          navigate('/actifs');
        } else {
          toast.error('Une erreur est survenue');
        }
      });
    } catch (error) {
      toast.error('Une erreur est survenue');
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
            <div className="flex flex-col sm:flex-row justify-evenly items-start">
              <Formik initialValues={initialValues} onSubmit={handleUpdate}>
                {({ values, handleChange, dirty, setFieldValue }) => (
                  <FormLayout
                    title="Modifier un actif"
                    dirty={dirty}
                    handleConfirm={handleConfirm}
                    open={open}
                    handleClose={handleClose}
                  >
                    <ActifForm
                      values={values}
                      handleChange={handleChange}
                      dirty={dirty}
                      setFieldValue={setFieldValue}
                      statuts={statuts}
                      modeles={modeles}
                      emplacements={emplacements}
                      locataires={locataires}
                      utilisations={utilisations}
                      proprietaires={proprietaires}
                      setSendingType={setSendingType}
                    />
                  </FormLayout>
                )}
              </Formik>
              <div className="w-full sm:mt-0 mt-24  mx-8">
                <Historique id={id} type="actif" />
              </div>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Actif;
