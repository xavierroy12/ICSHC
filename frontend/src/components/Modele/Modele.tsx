import ModeleForm from './ModeleForm';
import { useEffect, useState } from 'react';
import { LightType, SelectItem } from '../Actif/type';
import { CircularProgress } from '@mui/material';
import { Modele_Type } from './type';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, FormikValues } from 'formik';
import FormLayout from '../FormLayout';

const Modele = () => {
  const [categories, setCategories] = useState<SelectItem[]>([]);
  const [modele, setModele] = useState<Modele_Type>();

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

  const handleSubmit = (values: FormikValues) => {
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
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (response.ok) {
          alert('Données sauvegardées avec succès');
          console.log('Données sauvegardées avec succès: ', values);
          navigate('/modeles');
        } else {
          console.error('Error saving data:', response.statusText);
          console.log('CA NE FONCTIONNE PAS ', values);
        }
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
  };
  const reloadData = () => {
    console.log('reloadData');
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
    <div className="mt-8">
      {!modele ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, dirty, setFieldValue }) => (
            <FormLayout title={'Modele: ' + modele.nom} dirty={dirty}>
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
      )}
    </div>
  );
};
export default Modele;
