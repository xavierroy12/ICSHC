import { Select, Checkbox, Textarea, Button, type SelectItem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


const ModifyActifs = () => {
  const location = useLocation();
  const { selectedRows } = location.state;

  const [loading, setLoading] = useState(true);
  const [etats, setEtats] = useState<SelectItem[]>([{value: "", label: ""}]);
  const [modeles, setModeles] = useState<SelectItem[]>([{value: "", label: ""}]);
  const [localisations, setLocalisations] = useState<SelectItem[]>([{value: "", label: ""}]);
  const [locataires, setLocataires] = useState<SelectItem[]>([{value: "", label: ""}]);
  const [utilisations, setUtilisations] = useState<SelectItem[]>([{value: "", label: ""}]);
  const [proprietaires, setProprietaires] = useState<SelectItem[]>([{value: "", label: ""}]);


  const [emplecement, setEmplecement] = useState('');
  const [estEnEntropot, setEstEnEntropot] = useState(false);
  const [utilisateur, setUtilisateur] = useState('');
  const [statut, setStatut] = useState('');
  const [modele, setModele] = useState('');
  const [utilisation, setUtilisation] = useState('');
  const [propriete, setPropriete] = useState('');
  const [note, setNote] = useState('');

  const [actifs, setActifs] = useState([]);

  useEffect(() => {   
    Promise.all([
      fetch("http://localhost:8000/api/etats"),
      fetch("http://localhost:8000/api/modeles"),
      fetch("http://localhost:8000/api/emplacements"),
      fetch("http://localhost:8000/api/clients"),
      fetch("http://localhost:8000/api/utilisations"),
      fetch("http://localhost:8000/api/proprietaires")
    ])
      .then((responses) => Promise.all(responses.map((response) => response.json())))
      .then(([etats, modeles, localisations, locataires, utilisations,proprietaires]) => {
        setEtats(etats?.map((item) => ({
          value: item?.id,
          label: item?.nom
        })));
        setModeles(modeles?.map((item) => ({
          value: item?.id,
          label: item?.nom
        })));
        setLocalisations(localisations?.map((item) => ({
          value: item?.id,
          label: item?.nom
        })));
        setLocataires(locataires?.map((item) => ({
          value: item?.id,
          label: item?.nom
        })));
        setUtilisations(utilisations?.map((item) => ({
          value: item?.id,
          label: item?.nom
        })));
        setProprietaires(proprietaires?.map((item) => ({
          value: item?.id,
          label: item?.nom
        })));
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const form = useForm({
    initialValues: {
      emplecement: '',
      estEnEntropot: false,
      utilisateur: '',
      statut: '',
      modele: '',
      utilisation: '',
      propriete: '',
      note: '',
    },

    validationRules: {
      emplecement: (value) => value.trim().length > 0 || 'Emplecement is required',
      utilisateur: (value) => value.trim().length > 0 || 'Utilisateur is required',
      statut: (value) => value.trim().length > 0 || 'Statut is required',
      modele: (value) => value.trim().length > 0 || 'Modele is required',
      utilisation: (value) => value.trim().length > 0 || 'Utilisation is required',
      propriete: (value) => value.trim().length > 0 || 'Propriete is required',
    },

    onSubmit: (values) => {
      console.log(values);
      // Do something with the form values
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      {loading ? <div>Chargement...</div> : 
        <div className='w-2/3 m-auto mt-20'>
          <Select
            className="mb-8"
            transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
            searchable
            label="Emplecement"
            placeholder="Sélectionner une option"
            required
            value={emplecement}
            onChange={(value) => setEmplecement(value || "")}
            data={ localisations }
          />
          <Checkbox
            className="mb-8"
            label="Est en entropôt"
            checked={estEnEntropot}
            onChange={(value) => setEstEnEntropot(value.currentTarget.checked)}
          />
          <Select
            className="mb-8"
            transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
            searchable
            label="Utilisateur"
            placeholder="Sélectionner une option"
            required
            value={utilisateur}
            onChange={(value) => setUtilisateur(value|| "")}
            data={ locataires }
          />
          <Select
            className="mb-8"
            transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
            label="Statut"
            placeholder="Sélectionner une option"
            required
            value={statut}
            onChange={(value) => setStatut(value || "")}
            data={ etats}
          />
          <Select
            className="mb-8"
            transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
            searchable
            label="Modèle"
            placeholder="Sélectionner une option"
            required
            value={modele}
            onChange={(value) => setModele(value || "")}
            data={ modeles}
          />
          <Select
            className="mb-8"
            transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
            label="Utilisation"
            placeholder="Sélectionner une option"
            required
            value={utilisation}
            onChange={(value) => setUtilisation(value || "")}
            data={ utilisations }
          />
          <Select
            className="mb-8"
            transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
            label="Propriété"
            placeholder="Sélectionner une option"
            required
            value={propriete}
            onChange={(value) => setPropriete(value || "")}
            data={ proprietaires }
          />
          <Textarea
            className="mb-8"
            label="Note"
            placeholder="Entrer une note"
            value={note}
            onChange={(value) => setNote(value.currentTarget.value)}
          />
          <Button className="float-left" type="submit" variant="outline">Submit</Button>
        </div>
      }
    </form>
  );
};



export default ModifyActifs;