import { Typography } from '@mui/material';
import { Formik } from 'formik';
import { Fragment, useEffect, useState } from 'react';
import ActifAddForm, { light_Actif } from './ActifAddForm';
import { useNavigate } from 'react-router';
import { LightType, SelectItem } from '../Actif/type';

const ActifAdd = () => {
  const navigate = useNavigate();
  const [modeles, setModeles] = useState<SelectItem[]>([]);
  const [actifs, setActifs] = useState<light_Actif[]>([]);

  const initialValues = {
    numero_serie: '',
    adresse_mac: '',
    modele: '',
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
  }, []);

  const handleSubmit = () => {
    try {
      fetch(window.name + `api/actifs/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(actifs),
      })
        .then((response) => {
          if (response.ok) {
            alert('Données sauvegardées avec succès');
            navigate('/actifs');
          } else {
            console.error('Error saving data:', response.statusText);
            console.log('CA NE FONCTIONNE PAS ', actifs);
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
              Création d'actifs
            </Typography>
            <div className="flex justify-between w-full min-w-fit mt-4">
              <div className="my-4 w-full">
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                  {() => (
                    <ActifAddForm
                      modeles={modeles}
                      actifs={actifs}
                      setActifs={setActifs}
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
