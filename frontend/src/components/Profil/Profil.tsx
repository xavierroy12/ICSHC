import { Fragment } from 'react';
import ProfilUtilisateur from '../ProfilUtilisateur/ProfilUtilisateur';

const Profil = () => {
  const id = localStorage.getItem('id_user');
  return (
    <Fragment>{id && <ProfilUtilisateur id={id} isProfil={true} />}</Fragment>
  );
};
export default Profil;
