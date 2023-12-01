import { Modal, Typography } from '@mui/material';
import { Formik, FormikErrors, FormikValues } from 'formik';
import ModeleForm from '../Modele/ModeleForm';
import { LightType, SelectItem } from './type';
import { toast } from 'react-toastify';

type Props = {
  setModeles: React.Dispatch<React.SetStateAction<SelectItem[]>>;
  setCategories: React.Dispatch<React.SetStateAction<SelectItem[]>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentModele: string;
  categories: SelectItem[];
};

const AddModelModal = ({
  setModeles,
  setCategories,
  open,
  setOpen,
  currentModele,
  categories,
}: Props) => {
  const initialValues = {
    nom: '',
    id_type_modele: '',
    stockage: '',
    processeur: '',
    favoris: false,
    memoire_vive: '',
    taille: '',
  };

  const handleSubmitModele = (values: FormikValues) => {
    const id_user = localStorage.getItem('id_user') || 'unknown'; // retrieve id_user from local storage, default to 'unknown';

    const updatedData = {
      nom: values.nom,
      id_type_modele: values.id_type_modele?.id || values.id_type_modele,
      stockage: values.stockage,
      processeur: values.processeur,
      memoire_vive: values.memoire_vive,
      favoris: values.favoris ? 1 : 0,
      taille: values.taille,
    };
    fetch(window.name + 'api/modele', {
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
        } else {
          toast.error('Une erreur est survenue');
        }
      })
      .catch(() => {
        toast.error('Une erreur est survenue');
      });
    reloadModeles();
  };

  const reloadModeles = () => {
    setTimeout(() => {
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
    }, 1000);
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
  const localDarkMode = window.localStorage.getItem('darkMode');
  const modalBgColor =
    localDarkMode === 'true' ? 'bg-slate-600' : 'bg-slate-100';
  const validate = (values: FormikValues) => {
    const errors: FormikErrors<FormikValues> = {};

    if (values.nom.length > 32)
      errors.nom = 'Le nom ne doit pas dépasser 32 caractères';
    else if (!values.nom) errors.nom = 'Requis';
    if (!values.id_type_modele) {
      errors.id_type_modele = 'Requis';
    }

    return errors;
  };
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className={'flex  ' + modalBgColor}>
        <div className=" m-10 p-8">
          <div className="mb-8">
            <Typography variant="h4">Nouveau Model</Typography>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmitModele}
            validate={validate}
          >
            {({ values, dirty, setFieldValue, errors }) => (
              <div className="max-w-fit p-4">
                <ModeleForm
                  categories={categories}
                  values={values}
                  dirty={dirty}
                  setFieldValue={setFieldValue}
                  reloadData={reloadData}
                  errors={errors}
                />
              </div>
            )}
          </Formik>
          <div>
            <div className="mb-8 mt-20">
              <Typography variant="h4">Description Model</Typography>
            </div>
            {currentModele}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddModelModal;
