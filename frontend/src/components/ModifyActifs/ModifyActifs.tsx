import {
  Select,
  Checkbox,
  Textarea,
  Button,
  type SelectItem,
  Loader,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SelectActifsList from '../SelectActifsList';

type LightType = {
  id: number;
  nom: string;
};
type LightActif = {
  id: number;
  nom: string;
  numero_serie: string;
};

const ModifyActifs = () => {
  const location = useLocation();
  const { selectedRows } = location.state;
  const [loading, setLoading] = useState(true);
  const [statuts, setStatuts] = useState<SelectItem[]>([]);
  const [modeles, setModeles] = useState<SelectItem[]>([]);
  const [localisations, setLocalisations] = useState<SelectItem[]>([]);
  const [locataires, setLocataires] = useState<SelectItem[]>([]);
  const [utilisations, setUtilisations] = useState<SelectItem[]>([]);
  const [proprietaires, setProprietaires] = useState<SelectItem[]>([]);

  const [emplacement, setEmplacement] = useState('');
  const [estEnEntropot, setEstEnEntropot] = useState(false);
  const [utilisateur, setUtilisateur] = useState('');
  const [statut, setStatut] = useState('');
  const [modele, setModele] = useState('');
  const [utilisation, setUtilisation] = useState('');
  const [propriete, setPropriete] = useState('');
  const [note, setNote] = useState('');

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
          statuts,
          modeles,
          localisations,
          locataires,
          utilisations,
          proprietaires,
          actifs,
        ]) => {
          setStatuts(
            statuts.map((statut: LightType) => ({
              value: statut.id,
              label: statut.nom,
            }))
          );
          setModeles(
            modeles.map((modele: LightType) => ({
              value: modele.id,
              label: modele.nom,
            }))
          );
          setLocalisations(
            localisations.map((localisation: LightType) => ({
              value: localisation.id,
              label: localisation.nom,
            }))
          );
          setLocataires(
            locataires.map((locataire: LightType) => ({
              value: locataire.id,
              label: locataire.nom,
            }))
          );
          setUtilisations(
            utilisations.map((utilisation: LightType) => ({
              value: utilisation.id,
              label: utilisation.nom,
            }))
          );
          setProprietaires(
            proprietaires.map((proprietaire: LightType) => ({
              value: proprietaire.id,
              label: proprietaire.nom,
            }))
          );
          setActifs(actifs);
          setSelectedActifs(
            selectedRows.map((selectedRow: string) => ({
              id: selectedRow,
              nom: actifs.find(
                (actif: LightActif) => actif.id.toString() === selectedRow
              )?.nom,
              numero_serie: actifs.find(
                (actif: LightActif) => actif.id.toString() === selectedRow
              )?.numero_serie,
            }))
          );
          setLoading(false);
        }
      )
      .catch((error) => console.error(error));
  }, []);
  const form = useForm({
    initialValues: {
      emplacement: '',
      estEnEntropot: false,
      utilisateur: '',
      statut: '',
      modele: '',
      utilisation: '',
      propriete: '',
      note: '',
    },
  });
  if (loading) {
    return <Loader className="m-auto mt-20" />;
  }
  return (
    <div className="flex h-fit">
      <div className="ml-12 mr-6 mt-20 w-2/3 h-full">
        <h1 className="text-3xl mb-8">Modifier des actifs</h1>
        <form
          onSubmit={() => {
            console.log('submit');
          }}
          className="h-full bg-gray-200 w-full py-10 px-20 pb-20"
        >
          <div>
            <Select
              className="mb-8"
              transitionProps={{
                transition: 'pop-top-left',
                duration: 80,
                timingFunction: 'ease',
              }}
              searchable
              label="Emplacement"
              placeholder="Sélectionner une option"
              value={emplacement}
              onChange={(value) =>
                form.setFieldValue('emplacement', value || '')
              }
              data={localisations}
            />
            <Checkbox
              className="mb-8"
              label="Est en entropôt"
              checked={estEnEntropot}
              onChange={(value) =>
                form.setFieldValue('estEnEntropot', value.currentTarget.checked)
              }
            />
            <Select
              className="mb-8"
              transitionProps={{
                transition: 'pop-top-left',
                duration: 80,
                timingFunction: 'ease',
              }}
              searchable
              label="Client"
              placeholder="Sélectionner une option"
              value={utilisateur}
              onChange={(value) =>
                form.setFieldValue('utilisateur', value || '')
              }
              data={locataires}
            />
            <Select
              className="mb-8"
              transitionProps={{
                transition: 'pop-top-left',
                duration: 80,
                timingFunction: 'ease',
              }}
              label="Statut"
              placeholder="Sélectionner une option"
              value={statut}
              onChange={(value) => form.setFieldValue('statut', value || '')}
              data={statuts}
            />
            <Select
              className="mb-8"
              transitionProps={{
                transition: 'pop-top-left',
                duration: 80,
                timingFunction: 'ease',
              }}
              searchable
              label="Modèle"
              placeholder="Sélectionner une option"
              value={modele}
              onChange={(value) => form.setFieldValue('modele', value || '')}
              data={modeles}
            />
            <Select
              className="mb-8"
              transitionProps={{
                transition: 'pop-top-left',
                duration: 80,
                timingFunction: 'ease',
              }}
              label="Utilisation"
              placeholder="Sélectionner une option"
              value={utilisation}
              onChange={(value) =>
                form.setFieldValue('utilisation', value || '')
              }
              data={utilisations}
            />
            <Select
              className="mb-8"
              transitionProps={{
                transition: 'pop-top-left',
                duration: 80,
                timingFunction: 'ease',
              }}
              label="Propriété"
              placeholder="Sélectionner une option"
              value={propriete}
              onChange={(value) => form.setFieldValue('propriete', value || '')}
              data={proprietaires}
            />
            <Textarea
              className="mb-8"
              label="Note"
              placeholder="Entrer une note"
              value={note}
              onChange={(value) =>
                form.setFieldValue('note', value.currentTarget.value || '')
              }
            />
          </div>
          <Button.Group className="float-right">
            <Button className="mx-4" variant="outline" color="orange">
              Archiver
            </Button>
            <Button className="mx-4" variant="outline" color="green">
              Réception
            </Button>
            <Button className="mx-4" type="submit" variant="outline">
              Submit
            </Button>
          </Button.Group>
        </form>
      </div>
      <SelectActifsList
        selectedActifs={selectedActifs}
        setSelectedActifs={setSelectedActifs}
        actifs={actifs}
      />
    </div>
  );
};

export default ModifyActifs;
