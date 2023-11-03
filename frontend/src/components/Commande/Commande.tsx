import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ModeleForm from '../Modele/ModeleForm';
import { Formik, FormikValues } from 'formik';
import CommandeInformation from './CommandeInformation';
import CommandeModels from './CommandeModels';
import CommandeTableauActifs from './CommandeTableauActifs';
import { Commande_Type, Model_Type,LightType, SelectItem, Actif_Commande_Type } from './type';



const steps = ['Information', 'Modèle', 'Article'];

const Commande = () => {
  const { numero_commande } = useParams<{ numero_commande: string }>();

  const [open, setOpen] = useState(false);
  const [currentModele, setCurrentModele] = useState('');
  const [categories, setCategories] = useState<SelectItem[]>([]);
  const [commande, setCommande] = useState<Commande_Type>();
  const [modeles, setModeles] = useState<SelectItem[]>([]);
  const [modeleCommande, setModeleCommande] = useState<Model_Type[]>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const navigate = useNavigate();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    if (allStepsCompleted()) handleSubmit();
    let newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((_step, i) => !(i in completed))
        : activeStep + 1;
    if (newActiveStep > 2) newActiveStep = 0;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    if (activeStep === 1) {
      let hasModel = true;
      modeleCommande?.forEach((modele) => {
        if (modele.modele === '') hasModel = false;
      });
      if (!hasModel) return;
    }
    if (activeStep === 2) {
      let hasSerial = true;
      commande?.actifs.forEach((actif) => {
        if (actif.numero_serie === '') hasSerial = false;
        if (actif.adresse_mac === '') hasSerial = false;
      });
      if (!hasSerial) return;
    }
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const addModele = (description_modele: string) => {
    setOpen(true);
    setCurrentModele(description_modele);
  };

  useEffect(() => {
    Promise.all([
      fetch(window.name + `api/commande/${numero_commande}`),
      fetch(window.name + 'api/modeles/light'),
      fetch(window.name + 'api/categories/light'),
    ]).then((responses) =>
      Promise.all(responses.map((response) => response.json()))
        .then(([fetchedCommande, fetchedModeles, fetchedCategories]) => {
          setCommande(fetchedCommande);
          setModeles(
            fetchedModeles.map((modele: LightType) => ({
              id: modele.id,
              label: modele.nom,
            }))
          );
          setCategories(
            fetchedCategories.map((statut: LightType) => ({
              id: statut.id,
              label: statut.nom,
            }))
          );
          const temps = [] as Model_Type[];
          fetchedCommande.actifs.forEach((actif: Actif_Commande_Type) => {
            const current = temps.findIndex(
              (temp) => temp.description_modele === actif.description_modele
            );
            if (current === -1)
              temps.push({
                nombre: 1,
                modele: actif.modele,
                description_modele: actif.description_modele,
              });
            else temps[current].nombre++;
          });
          setModeleCommande(temps);
        })
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => console.error(error))
    );
  }, [numero_commande]);

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
    const updatedData = {
      nom: values.nom,
      id_type_modele: values.id_type_modele?.id || values.id_type_modele,
      stockage: values.stockage,
      processeur: values.processeur,
      memoire_vive: values.memoire_vive,
      favoris: values.favoris ? 1 : 0,
      taille: values.taille,
    };
    console.log('updatedData', updatedData);
    fetch(window.name + 'api/modele', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        console.log('response', response);
        if (response.ok) {
          alert('Données sauvegardées avec succès');
          console.log('Données sauvegardées avec succès: ', values);
        } else {
          console.error('Error saving data:', response.statusText);
          console.log('CA NE FONCTIONNE PAS ', values);
        }
      })
      .catch((error) => {
        console.error('Error saving data:', error);
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

  const handleSubmit = () => {
    const updatedActifs = commande?.actifs.map((actif) => {
      const modele = modeleCommande?.find(
        (modele) => modele.description_modele === actif.description_modele
      );
      return {
        id: actif.id,
        adresse_mac: actif.adresse_mac,
        numero_serie: actif.numero_serie,
        modele: modele?.modele,
      };
    });

    fetch(window.name + `api/commande/reception/${commande?.numero_commande}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedActifs),
    })
      .then((response) => {
        if (response.ok) {
          alert('Données sauvegardées avec succès');
          navigate('/commandes');
        } else {
          console.error('Error saving data:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
  };

  return (
    <Fragment>
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="mx-auto mt-8">
          <div className="min-w-fit">
            <div className="mx-8">
              <Typography variant="h2" className="text-3xl font-semibold">
                Commande: {numero_commande}
              </Typography>
            </div>

            <Box sx={{ width: '100%' }}>
              <Stepper nonLinear activeStep={activeStep}>
                <Step key="step1" completed={completed[1]}>
                  <StepLabel>Section 1</StepLabel>
                </Step>
                <Step key="step2" completed={completed[2]}>
                  <StepLabel>Section 2</StepLabel>
                </Step>
                <Step key="step3" completed={completed[3]}>
                  <StepLabel>Section 3</StepLabel>
                </Step>
              </Stepper>
              <div>
                <Fragment>
                  {commande && (
                    <Fragment>
                      {activeStep === 0 && (
                        <CommandeInformation commande={commande} />
                      )}
                      {activeStep === 1 && modeleCommande && (
                        <CommandeModels
                          modeleCommande={modeleCommande}
                          setModeleCommande={setModeleCommande}
                          modeles={modeles}
                          addModele={addModele}
                          commande={commande}
                          setCommande={setCommande}
                        />
                      )}
                      {activeStep === 2 && (
                        <CommandeTableauActifs
                          commande={commande}
                          setCommande={setCommande}
                        />
                      )}
                    </Fragment>
                  )}
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Retour
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button
                      onClick={handleNext}
                      sx={{ mr: 1 }}
                      disabled={activeStep === 2}
                    >
                      Prochaine étape
                    </Button>
                    {activeStep !== steps.length &&
                      (completed[activeStep] ? (
                        <Typography
                          variant="caption"
                          sx={{ display: 'inline-block' }}
                        >
                          Étape {activeStep + 1} complétée
                        </Typography>
                      ) : (
                        <Button onClick={handleComplete}>
                          {completedSteps() === totalSteps() - 1
                            ? 'Finir'
                            : 'Compléter étape'}
                        </Button>
                      ))}
                  </Box>
                </Fragment>
              </div>
            </Box>
          </div>
        </div>
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex ">
          <div className=" bg-slate-100 m-10 p-8">
            <div className="mb-8">
              <Typography variant="h4">Nouveau Model</Typography>
            </div>
            <Formik initialValues={initialValues} onSubmit={handleSubmitModele}>
              {({ values, dirty, setFieldValue }) => (
                <div className="max-w-fit bg-slate-100 p-4">
                  <ModeleForm
                    categories={categories}
                    values={values}
                    dirty={dirty}
                    setFieldValue={setFieldValue}
                    reloadData={reloadData}
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
    </Fragment>
  );
};
export default Commande;
