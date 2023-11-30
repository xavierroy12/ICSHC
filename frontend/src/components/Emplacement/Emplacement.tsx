import { CircularProgress } from '@mui/material';
import { Formik, FormikErrors, FormikValues } from 'formik';
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
  const isNew = id === 'new';
  useEffect(() => {
    if (isNew) {
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
    est_proprietaire: emplacement?.est_proprietaire || isNew,
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

  const validate = (values: FormikValues) => {
    const errors: FormikErrors<FormikValues> = {};
    if (values.nom?.length > 64) errors.nom = 'Maximum 64 caractères';
    else if (!values.nom) errors.nom = 'Requis';
    if (values.numero_civique?.length > 255)
      errors.numero_civique = 'Maximum 255 caractères';
    else if (!values.numero_civique) errors.numero_civique = 'Requis';
    if (values.adresse?.length > 64) errors.adresse = 'Maximum 64 caractères';
    else if (!values.adresse) errors.adresse = 'Requis';
    if (values.matricule?.length > 3) errors.matricule = 'Maximum 3 caractères';
    else if (!values.matricule) errors.matricule = 'Requis';
      

    return errors;
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
            <Formik
              initialValues={initialValues}
              onSubmit={handleUpdate}
              validate={validate}
            >
              {({ values, dirty, setFieldValue, errors }) => (
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
                    errors={errors}
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
