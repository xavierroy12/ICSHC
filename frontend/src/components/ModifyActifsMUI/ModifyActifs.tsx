import React, { useEffect, useState } from 'react';
import {
  Select,
  Checkbox,
  TextareaAutosize,
  Button,
  CircularProgress,
  FormControlLabel,
} from '@mui/material';
import { useFormik } from 'formik';
import { useLocation } from 'react-router-dom';
import SelectActifsList from '../SelectActifsListMUI';

type LightType = {
  id: number;
  nom: string;
};

type LightActif = {
  id: string;
  nom: string;
  numero_serie: string;
};

const ModifyActifs: React.FC = () => {
  const location = useLocation();
  const { selectedRows } = location.state as { selectedRows: string[] };
  const [loading, setLoading] = useState(true);
  const [statuts, setStatuts] = useState<{ value: number; label: string }[]>(
    []
  );
  const [modeles, setModeles] = useState<{ value: number; label: string }[]>(
    []
  );
  const [localisations, setLocalisations] = useState<
    {
      value: number;
      label: string;
    }[]
  >([]);
  const [locataires, setLocataires] = useState<
    { value: number; label: string }[]
  >([]);
  const [utilisations, setUtilisations] = useState<
    {
      value: number;
      label: string;
    }[]
  >([]);
  const [proprietaires, setProprietaires] = useState<
    {
      value: number;
      label: string;
    }[]
  >([]);

  const [emplacement, setEmplacement] = useState<string>('');
  const [estEnEntrepot, setEstEnEntrepot] = useState<boolean>(false);
  const [utilisateur, setUtilisateur] = useState<string>('');
  const [statut, setStatut] = useState<string>('');
  const [modele, setModele] = useState<string>('');
  const [utilisation, setUtilisation] = useState<string>('');
  const [propriete, setPropriete] = useState<string>('');
  const [note, setNote] = useState<string>('');

  const [actifs, setActifs] = useState<LightActif[]>([]);
  const [selectedActifs, setSelectedActifs] = useState<LightActif[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8000/api/statuts/light'),
      fetch('http://localhost:8000/api/modeles/light'),
      fetch('http://localhost:8000/api/emplacements/light'),
      fetch('http://localhost:8000/api/clients/light'),
      fetch('http://localhost:8000/api/utilisations/light'),
      fetch('http://localhost:8000/api/proprietaires/light'),
      fetch('http://localhost:8000/api/actifs/light'),
    ])
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then(
        ([
          statutsData,
          modelesData,
          localisationsData,
          locatairesData,
          utilisationsData,
          proprietairesData,
          actifsData,
        ]) => {
          setStatuts(
            statutsData.map((statut: LightType) => ({
              value: statut.id,
              label: statut.nom,
            }))
          );
          setModeles(
            modelesData.map((modele: LightType) => ({
              value: modele.id,
              label: modele.nom,
            }))
          );
          setLocalisations(
            localisationsData.map((localisation: LightType) => ({
              value: localisation.id,
              label: localisation.nom,
            }))
          );
          setLocataires(
            locatairesData.map((locataire: LightType) => ({
              value: locataire.id,
              label: locataire.nom,
            }))
          );
          setUtilisations(
            utilisationsData.map((utilisation: LightType) => ({
              value: utilisation.id,
              label: utilisation.nom,
            }))
          );
          setProprietaires(
            proprietairesData.map((proprietaire: LightType) => ({
              value: proprietaire.id,
              label: proprietaire.nom,
            }))
          );
          setActifs(actifsData);
          setSelectedActifs(
            selectedRows.map((selectedRow: string) => ({
              id: selectedRow,
              nom: actifsData.find(
                (actif: LightActif) => actif.id.toString() === selectedRow
              )?.nom as string,
              numero_serie: actifsData.find(
                (actif: LightActif) => actif.id.toString() === selectedRow
              )?.numero_serie as string,
            }))
          );
          setLoading(false);
        }
      )
      .catch((error) => console.error(error));
  }, []);

  const formik = useFormik({
    initialValues: {
      emplacement: '',
      estEnEntrepot: false,
      utilisateur: '',
      statut: '',
      modele: '',
      utilisation: '',
      propriete: '',
      note: '',
    },
    onSubmit: (values) => {
      console.log('submit', values);
    },
  });

  if (loading) {
    return <CircularProgress className="m-auto mt-20" />;
  }

  return (
    <div className="flex h-fit">
      <div className="ml-12 mr-6 mt-20 w-2/3 h-full">
        <h1 className="text-3xl mb-8">Modifier des actifs</h1>
        <form
          onSubmit={formik.handleSubmit}
          className="h-full bg-gray-200 w-full py-10 px-20 pb-20"
        >
          <div>
            <Select
              className="mb-8"
              label="Emplacement"
              placeholder="Sélectionner une option"
              value={emplacement}
              onChange={(e) => setEmplacement(e.target.value)}
            >
              {localisations.map((localisation) => (
                <option key={localisation.value} value={localisation.value}>
                  {localisation.label}
                </option>
              ))}
            </Select>
            <FormControlLabel
              control={
                <Checkbox
                  className="mb-8"
                  checked={estEnEntrepot}
                  onChange={(e) => setEstEnEntrepot(e.target.checked)}
                />
              }
              label="Est en entrepôt"
            />
            <Select
              className="mb-8"
              label="Client"
              placeholder="Sélectionner une option"
              value={utilisateur}
              onChange={(e) => setUtilisateur(e.target.value)}
            >
              {locataires.map((locataire) => (
                <option key={locataire.value} value={locataire.value}>
                  {locataire.label}
                </option>
              ))}
            </Select>
            <Select
              className="mb-8"
              label="Statut"
              placeholder="Sélectionner une option"
              value={statut}
              onChange={(e) => setStatut(e.target.value)}
            >
              {statuts.map((statut) => (
                <option key={statut.value} value={statut.value}>
                  {statut.label}
                </option>
              ))}
            </Select>
            <Select
              className="mb-8"
              label="Modèle"
              placeholder="Sélectionner une option"
              value={modele}
              onChange={(e) => setModele(e.target.value)}
            >
              {modeles.map((modele) => (
                <option key={modele.value} value={modele.value}>
                  {modele.label}
                </option>
              ))}
            </Select>
            <Select
              className="mb-8"
              label="Utilisation"
              placeholder="Sélectionner une option"
              value={utilisation}
              onChange={(e) => setUtilisation(e.target.value)}
            >
              {utilisations.map((utilisation) => (
                <option key={utilisation.value} value={utilisation.value}>
                  {utilisation.label}
                </option>
              ))}
            </Select>
            <Select
              className="mb-8"
              label="Propriété"
              placeholder="Sélectionner une option"
              value={propriete}
              onChange={(e) => setPropriete(e.target.value)}
            >
              {proprietaires.map((proprietaire) => (
                <option key={proprietaire.value} value={proprietaire.value}>
                  {proprietaire.label}
                </option>
              ))}
            </Select>
            <FormControlLabel
              control={
                <TextareaAutosize
                  className="mb-8"
                  placeholder="Entrer une note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              }
              label="Note"
            />
          </div>
          <Button className="mx-4">Archiver</Button>
          <Button className="mx-4">Désassigner</Button>
          <Button className="mx-4">Sauvegarder</Button>
        </form>
      </div>
      {/* <SelectActifsList
        selectedActifs={selectedActifs}
        setSelectedActifs={setSelectedActifs}
        actifs={actifs}
      /> */}
    </div>
  );
};

export default ModifyActifs;
