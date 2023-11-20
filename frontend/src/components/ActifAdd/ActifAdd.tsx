import { Formik } from 'formik';
import { Fragment, useEffect, useState } from 'react';
import ActifAddForm, { light_Actif } from './ActifAddForm';
import { useNavigate } from 'react-router';
import { LightType, SelectItem } from '../Actif/type';
import FormLayout from '../FormLayout';
import { toast } from 'react-toastify';

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
      <div className="mx-auto mt-8">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ dirty }) => (
            <FormLayout title="Ajouter des actifs" dirty={dirty}>
              <div className="w-fit">
                <ActifAddForm
                  modeles={modeles}
                  actifs={actifs}
                  setActifs={setActifs}
                />
              </div>
            </FormLayout>
          )}
        </Formik>
      </div>
    </Fragment>
  );
};

export default ActifAdd;
