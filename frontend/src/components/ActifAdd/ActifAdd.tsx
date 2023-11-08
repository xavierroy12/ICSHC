import { Typography } from '@mui/material';
import { Formik, FormikValues } from 'formik';
import { Fragment, useEffect, useState } from 'react';
import ActifAddForm from './ActifAddForm';
import { useNavigate } from 'react-router';
import { LightType, SelectItem } from '../Actif/type';

const ActifAdd = () => {
  const navigate = useNavigate();
  const [modeles, setModeles] = useState<SelectItem[]>([]);

  const initialValues = {
    numero_commande: '',
    numero_serie: '',
    nom: '',
    adresse_mac: '',
    statut: '',
    emplacement: '',
    proprietaire: '',
    utilisation: '',
    categorie: '',
    modele: '',
    assigne_a: '',
    en_entrepot: true,
    date_creation: Date.now(),
    date_retour: '',
    note: '',
  };

  useEffect(() => {
    fetch(window.name + 'api/modeles/light')
      .then((response) => response.json())
      .then((data) => {
        setModeles(
          data.map((modele: LightType) => ({
            id: modele.id,
            label: modele.nom,
          }))
        );
      });
  });

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

    try {
      fetch(window.name + `api/actif`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
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
      <div className="mx-auto mt-8">
        <div className="min-w-fit">
          <div className="mx-8 ">
            <Typography variant="h2" className="my-8 mx-auto">
              Création d'actif
            </Typography>
            <div className="flex justify-between w-fit bg-slate-100 min-w-fit mt-4">
              <div className="p-4 my-4   mx-auto">
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                  {({ values, handleChange, dirty, setFieldValue }) => (
                    <ActifAddForm
                      handleChange={handleChange}
                      dirty={dirty}
                      setFieldValue={setFieldValue}
                      modeles={modeles}
                      actif={values}
                    />
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ActifAdd;
