import { CircularProgress, Typography } from '@mui/material';
import { FormikValues, Formik } from 'formik';
import { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router';
import { SelectItem } from '../Actif/type';
import { LightType } from '../Actifs/type';
import ProfileUtilisateurForm from './ProfilUtilisateurForm';

type Utilisateur_Type = {
  id: number;
  nom: string;
  id_role: string;
  id_emplacement: string;
};

type Props = {
  id: string;
  isProfil: boolean;
};
const ProfilUtilisateur = ({ id, isProfil }: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [utilisateur, setUtilisateur] = useState<Utilisateur_Type>();
  const [roles, setRoles] = useState<SelectItem[]>([]);
  const [emplacements, setEmplacements] = useState<SelectItem[]>([]);

  useEffect(() => {
    Promise.all([
      fetch(window.name + 'api/emplacements/light'),
      fetch(window.name + 'api/roles/light'),
      fetch(window.name + `api/utilisateur/${id}`),
    ])
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then(([fetchedEmplacements, fetchedRoles, fetchedUtilisateur]) => {
        setRoles(
          fetchedRoles.map((role: LightType) => ({
            id: role.id,
            label: role.nom,
          }))
        );

        setEmplacements(
          fetchedEmplacements.map((localisation: LightType) => ({
            id: localisation.id,
            label: localisation.nom,
          }))
        );
        setUtilisateur(fetchedUtilisateur);
        setLoading(false);
      });
  }, [id]);
  const initialValues = {
    id: utilisateur?.id,
    nom: utilisateur?.nom,
    id_role: utilisateur?.id_role,
    id_emplacement: utilisateur?.id_emplacement,
  };
  const handleSubmit = (values: FormikValues) => {
    const data = {
      id_role: values.id_role.id || values.id_role,
      id_emplacement: values.id_emplacement.id || values.id_emplacement,
    };
    fetch(window.name + `api/utilisateur/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        navigate('/utilisateurs');
      });
  };
  return (
    <Fragment>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="mx-auto mt-8">
          {utilisateur && id && (
            <div className="min-w-fit">
              <div className="mx-8 ">
                <Typography variant="h2" className="my-8 mx-auto">
                  {isProfil ? 'Mon Profil' : 'Utilisateur: ' + utilisateur.nom}
                </Typography>
                <div className="flex justify-between w-fit bg-slate-100 min-w-fit mt-4">
                  <div className="p-4 my-4   mx-auto">
                    <Formik
                      initialValues={initialValues}
                      onSubmit={handleSubmit}
                    >
                      {({ dirty }) => (
                        <ProfileUtilisateurForm
                          dirty={dirty}
                          emplacements={emplacements}
                          roles={roles}
                          isProfil={isProfil}
                        />
                      )}
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
export default ProfilUtilisateur;