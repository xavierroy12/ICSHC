import { Fragment } from 'react';
import ProfilUtilisateur from '../ProfilUtilisateur/ProfilUtilisateur';
import { useParams } from 'react-router-dom';

const Utilisateur = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Fragment>{id && <ProfilUtilisateur id={id} isProfil={false} />}</Fragment>
  );
};

export default Utilisateur;
