import ModeleForm from './ModeleForm';
import { Fragment, useEffect, useRef, useState } from 'react';
import { LightType, SelectItem } from '../Actif/type';
import { CircularProgress } from '@mui/material';
import { Modele_Type } from './type';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, FormikValues } from 'formik';
import FormLayout from '../FormLayout';
import { toast } from 'react-toastify';
import Historique from '../Historique';

const Modele = () => {
  const [categories, setCategories] = useState<SelectItem[]>([]);
  const [modele, setModele] = useState<Modele_Type>();
  const [loading, setLoading] = useState(true);

  const id = useParams<{ id: string }>().id;
  useEffect(() => {
    Promise.all([
      fetch(window.name + 'api/categories/light'),
      fetch(window.name + `api/modele/${id}`),
    ])
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then(([fetchedCategories, fetchedModele]) => {
        setCategories(
          fetchedCategories.map((statut: LightType) => ({
            id: statut.id,
            label: statut.nom,
          }))
        );
        setModele(fetchedModele);
        setLoading(false);
      });
  }, [id]);

  const navigate = useNavigate();

  const initialValues = {
    id: modele?.id,
    nom: modele?.nom,
    id_type_modele: modele?.id_type_modele,
    stockage: modele?.stockage,
    processeur: modele?.processeur,
    favoris: modele?.favoris === 1 ? true : false,
    memoire_vive: modele?.memoire_vive,
    taille: modele?.taille,
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

  const handleSubmit = () => {
    const values = formValuesRef.current;
    if (!values) return;
    const id_user = localStorage.getItem('id_user') || 'unknown'; // retrieve id_user from local storage, default to 'unknown';
    const updatedData = {
      id: values?.id,
      nom: values.nom,
      id_type_modele: values.id_type_modele?.id || values.id_type_modele,
      stockage: values.stockage,
      processeur: values.processeur,
      memoire_vive: values.memoire_vive,
      favoris: values.favoris ? 1 : 0,
      taille: values.taille,
    };
    fetch(window.name + `api/modele/${values.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Action-Id': id_user, // send the user id in a custom header
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (response.ok) {
          toast.success('Données sauvegardées avec succès');
          navigate('/modeles');
        } else {
          toast.error('Une erreur est survenue');
        }
      })
      .catch(() => {
        toast.error('Une erreur est survenue');
      });
    handleClose();
  };
  const reloadData = () => {
    setTimeout(() => {
      fetch(window.name + 'api/categories/light')
        .then((response) => response.json())
        .then((data) => {
          setCategories(
            data.map((statut: LightType) => ({
              id: statut.id,
              label: statut.nom,
            }))
          );
        });
    }, 1000);
  };

  return (
    <Fragment>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="mx-auto mt-8">
          {modele && id && (
            <div className="flex flex-col sm:flex-row justify-evenly items-start">
              <Formik initialValues={initialValues} onSubmit={handleUpdate}>
                {({ values, dirty, setFieldValue }) => (
                  <FormLayout
                    title={'Modele: ' + modele.nom}
                    dirty={dirty}
                    handleConfirm={handleSubmit}
                    open={open}
                    handleClose={handleClose}
                  >
                    <ModeleForm
                      categories={categories}
                      values={values}
                      dirty={dirty}
                      setFieldValue={setFieldValue}
                      reloadData={reloadData}
                    />
                  </FormLayout>
                )}
              </Formik>
              <div className="w-full sm:mt-0 mt-24  mx-8">
                <Historique id={id} type="modele" />
              </div>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};
export default Modele;
