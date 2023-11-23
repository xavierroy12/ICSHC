import { CircularProgress } from '@mui/material';
import { Formik, FormikValues } from 'formik';
import { Fragment, useEffect, useRef, useState } from 'react';
import EmplacementForm from './EmplacementForm';
import { useNavigate, useParams } from 'react-router-dom';
import FormLayout from '../FormLayout';
import { toast } from 'react-toastify';

type Emplacement_Type = {
  id: number;
  matricule: string;
  nom: string;
  adresse: string;
  numero_civique: string;
  est_proprietaire: boolean;
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
    est_proprietaire: emplacement?.est_proprietaire,
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

    fetch(window.name + `api/emplacement/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((response) => {
      if (response.ok) {
        toast.success('Données sauvegardées avec succès');
        navigate('/emplacements');
      } else {
        toast.error('Une erreur est survenue');
      }
    });
    handleClose();
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
            <Formik initialValues={initialValues} onSubmit={handleUpdate}>
              {({ values, dirty, setFieldValue }) => (
                <FormLayout
                  title={emplacement?.nom || 'Nouveau emplacement'}
                  dirty={dirty}
                  handleConfirm={handleSubmit}
                  open={open}
                  handleClose={handleClose}
                >
                  <EmplacementForm
                    values={values}
                    dirty={dirty}
                    setFieldValue={setFieldValue}
                  />
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
