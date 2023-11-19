import { CircularProgress } from '@mui/material';
import { Formik, FormikValues } from 'formik';
import { Fragment, useEffect, useState } from 'react';
import EmplacementForm from './EmplacementForm';
import { useNavigate, useParams } from 'react-router-dom';
import FormLayout from '../FormLayout';

type Emplacement_Type = {
  id: number;
  matricule: string;
  nom: string;
  adresse: string;
  numero_civique: string;
};

const Emplacement = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [emplacement, setEmplacement] = useState<Emplacement_Type>();

  useEffect(() => {
    if (id === 'new') {
      setLoading(false);
      return;
    }
    fetch(window.name + `api/emplacement/${id}`)
      .then((response) => response.json())
      .then((fetchedEmplacement) => {
        console.log(fetchedEmplacement);
        setEmplacement(fetchedEmplacement);
        setLoading(false);
      });
  }, [id]);

  const initialValues = {
    id: emplacement?.id,
    nom: emplacement?.nom,
    adresse: emplacement?.adresse,
    matricule: emplacement?.matricule,
    numero_civique: emplacement?.numero_civique,
  };

  const handleSubmit = (values: FormikValues) => {
    fetch(window.name + `api/emplacement/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then(() => navigate('/emplacements'));
  };

  return (
    <Fragment>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="mx-auto mt-8">
          {id && (
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ dirty }) => (
                <FormLayout
                  title={emplacement?.nom || 'Nouveau emplacement'}
                  dirty={dirty}
                >
                  <EmplacementForm dirty={dirty} />
                </FormLayout>
              )}
            </Formik>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Emplacement;
