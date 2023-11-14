import { CircularProgress, Typography } from '@mui/material';
import { Formik, FormikValues } from 'formik';
import { Fragment, useEffect, useState } from 'react';
import EmplacementForm from './EmplacementForm';
import { useNavigate, useParams } from 'react-router-dom';

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
            <div className="min-w-fit">
              <div className="mx-8 ">
                <Typography variant="h2" className="my-8 mx-auto">
                  {emplacement?.nom || 'Nouveau emplacement'}
                </Typography>
                <div className="flex justify-between w-fit bg-slate-100 min-w-fit mt-4">
                  <div className="p-4 my-4   mx-auto">
                    <Formik
                      initialValues={initialValues}
                      onSubmit={handleSubmit}
                    >
                      {({ dirty }) => <EmplacementForm dirty={dirty} />}
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

export default Emplacement;
