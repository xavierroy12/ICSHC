import {
  Box,
  Button,
  CircularProgress,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CommandeInformation from './CommandeInformation';
import CommandeModels from './CommandeModels';
import CommandeTableauActifs from './CommandeTableauActifs';
import {
  Commande_Type,
  Model_Type,
  LightType,
  SelectItem,
  Actif_Commande_Type,
} from './type';
import AddModelModal from './addModelModal';

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
                    {activeStep !== steps.length && (
                      <Button
                        onClick={handleComplete}
                        disabled={completed[activeStep]}
                      >
                        {completedSteps() === totalSteps() - 1
                          ? 'Recevoir'
                          : 'Compléter étape'}
                      </Button>
                    )}
                  </Box>
                </Fragment>
              </div>
            </Box>
          </div>
        </div>
      )}
      <AddModelModal
        setModeles={setModeles}
        setCategories={setCategories}
        open={open}
        setOpen={setOpen}
        currentModele={currentModele}
        categories={categories}
      />
    </Fragment>
  );
};
export default Commande;
