import { Fragment } from 'react';
import ProfilUtilisateur from '../ProfilUtilisateur/ProfilUtilisateur';

const Profil = () => {
  const id = 0;
  return (
    <Fragment>{id && <ProfilUtilisateur id={id} isProfil={false} />}</Fragment>
  );
};
export default Profil;
