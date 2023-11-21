import { useEffect, useState } from 'react';
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
  const { selectedRows } = location.state;

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

  const handleUpdate = (values: FormikValues) => {
    fetch(window.name + `api/actifs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values), // Send the updated data with the mapped field names
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

  const handleSubmit = (values: FormikValues) => {
    // Map the form values to match the expected field names in your Laravel API
    const updatedData = {
      ids: selectedRows,
      modele: values.modele?.id,
      categorie: values.categorie?.id,
      statut: values.statut?.id,
      desasignation: false,
      emplacement: values.emplacement?.id,
      en_entrepot: values.en_entrepot,
      utilisation: values.utilisation?.id,
      proprietaire: values.proprietaire?.id,
      date_retour: values.date_retour,
      note: values.note,
    };
    handleUpdate(updatedData);
  };

  const handleReception = (values: FormikValues) => {
    const statut = statuts.find((statut) => statut.label === 'Déployable');
    const updatedData = {
      ids: selectedRows,
      modele: values.modele?.id,
      categorie: values.categorie?.id,
      statut: statut?.id,
      desasignation: true,
      emplacement: values.emplacement?.id,
      en_entrepot: values.en_entrepot,
      utilisation: values.utilisation?.id,
      proprietaire: values.proprietaire?.id,
      date_retour: values.date_retour,
      note: values.note,
    };
    handleUpdate(updatedData);
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
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ values, handleChange, dirty, setFieldValue }) => (
                <FormLayout title="Ajouter des actifs" dirty={dirty}>
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
                    handleReception={handleReception}
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
              <div className=" bg-slate-100 dark:bg-slate-800 w-full mx-auto h-full overflow-hidden">
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
