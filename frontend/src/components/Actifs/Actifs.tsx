import { useEffect, useRef, useState } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import SelectActifsList from '../ActifsListSelect';
import ActifsForm from './ActifsForm';
import { SelectItem } from '../Actif/type';
import { Formik, FormikValues } from 'formik';
import { LightActif, LightType } from './type';
import FormLayout from '../FormLayout';
import { toast } from 'react-toastify';

const Actifs = () => {
  const location = useLocation();
  const current_id_emplacement = window.localStorage.getItem('id_emplacement');

  const { selectedRows } = location.state;
  const [sendingType, setSendingType] = useState<string>(''); // 'reception' | 'update'

  const [loading, setLoading] = useState(true);
  const [statuts, setStatuts] = useState<SelectItem[]>([]);
  const [modeles, setModeles] = useState<SelectItem[]>([]);
  const [emplacements, setEmplacements] = useState<SelectItem[]>([]);
  const [utilisations, setUtilisations] = useState<SelectItem[]>([]);
  const [proprietaires, setProprietaires] = useState<SelectItem[]>([]);
  const [categories, setCategories] = useState<SelectItem[]>([]);

  const [actifs, setActifs] = useState<LightActif[]>([]);
  const [selectedActifs, setSelectedActifs] = useState<LightActif[]>([]);

  const navigate = useNavigate();
  useEffect(() => {
    Promise.all([
      fetch(window.name + 'api/statuts/light'),
      fetch(window.name + 'api/modeles/light'),
      fetch(window.name + 'api/emplacements/light'),
      fetch(window.name + 'api/utilisations/light'),
      fetch(window.name + 'api/proprietaires/light'),
      fetch(window.name + 'api/categories/light'),
      fetch(window.name + 'api/actifs/light'),
    ])
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then(
        ([
          statutsData,
          modelesData,
          emplacementsData,
          utilisationsData,
          proprietairesData,
          categoriesData,
          actifsData,
        ]) => {
          setStatuts(
            statutsData.map((statut: LightType) => ({
              id: statut.id,
              label: statut.nom,
            }))
          );
          setModeles(
            modelesData.map((modele: LightType) => ({
              id: modele.id,
              label: modele.nom,
            }))
          );
          setEmplacements(
            emplacementsData.map((emplacement: LightType) => ({
              id: emplacement.id,
              label: emplacement.nom,
            }))
          );
          setUtilisations(
            utilisationsData.map((utilisation: LightType) => ({
              id: utilisation.id,
              label: utilisation.nom,
            }))
          );
          setProprietaires(
            proprietairesData.map((proprietaire: LightType) => ({
              id: proprietaire.id,
              label: proprietaire.nom,
            }))
          );
          setCategories(
            categoriesData.map((categorie: LightType) => ({
              id: categorie.id,
              label: categorie.nom,
            }))
          );
          setActifs(actifsData);
          setSelectedActifs(
            selectedRows.map((selectedRow: number) =>
              actifsData.find((actif: LightActif) => actif.id === selectedRow)
            )
          );
          setLoading(false);
        }
      )
      .catch((error) => console.error(error));
  }, [selectedRows]);

  const initialValues = {
    modele: '',
    categorie: '',
    statut: '',
    assigne_a: '',
    emplacement: '',
    en_entrepot: false,
    utilisation: '',
    proprietaire: '',
    date_retour: '',
    note: '',
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
      id_modele: values.modele.id || values.modele,
      id_statut: values.statut.id || values.statut,
      id_emplacement: values.emplacement.id || values.emplacement,
      id_proprietaire: values.proprietaire.id || values.proprietaire,
      id_utilisation: values.utilisation.id || values.utilisation,
      desassignation: false,
    };
    switch (sendingType) {
      case 'reception':
        updatedData.id_statut =
          statuts.find((statut) => statut.label === 'Déployable')?.id || '';
        updatedData.date_retour = '';
        updatedData.en_entrepot = true;
        updatedData.id_emplacement = current_id_emplacement;
        updatedData.desassignation = true;
        break;
    }
    sendData(updatedData);

    handleClose();
  };

  const sendData = (values: FormikValues) => {
    const id_user = localStorage.getItem('id_user') || 'unknown'; // retrieve id_user from local storage, default to 'unknown';
    const ids: number[] = selectedActifs.map((actif) => actif.id);
    fetch(window.name + `api/actifs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Action-Id': id_user, // send the user id in a custom header
      },

      body: JSON.stringify({ values, ids }), // Send the updated data with the mapped field names
    }).then((response) => {
      if (response.ok) {
        // Display a success message to the user
        toast.success('Données sauvegardées avec succès');
        navigate('/actifs');
      } else {
        // Handle errors if the API request fails
        toast.error('Une erreur est survenue');
      }
    });
  };

  return (
    <div className="flex flex-col md:flex-row">
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="md:w-2/3 md:ml-20 md:mr-6 mt-8 min-w-fit h-full">
            <Formik initialValues={initialValues} onSubmit={handleUpdate}>
              {({ values, handleChange, dirty, setFieldValue }) => (
                <FormLayout
                  title="Ajouter des actifs"
                  dirty={dirty}
                  handleConfirm={handleConfirm}
                  open={open}
                  handleClose={handleClose}
                >
                  <ActifsForm
                    statuts={statuts}
                    modeles={modeles}
                    categories={categories}
                    emplacements={emplacements}
                    utilisations={utilisations}
                    proprietaires={proprietaires}
                    values={values}
                    handleChange={handleChange}
                    dirty={dirty}
                    setFieldValue={setFieldValue}
                    setSendingType={setSendingType}
                  />
                </FormLayout>
              )}
            </Formik>
          </div>
          <div className="md:w-1/3  md:mr-20">
            <div className="w-full my-12">
              <div className="mb-8">
                <Typography variant="h4" className="mx-auto">
                  Actifs sélectionnés
                </Typography>
              </div>
              <div className="w-full mx-auto bg-slate-100 dark:bg-slate-800 h-full overflow-hidden">
                <SelectActifsList
                  selectedActifs={selectedActifs}
                  setSelectedActifs={setSelectedActifs}
                  actifs={actifs}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Actifs;
