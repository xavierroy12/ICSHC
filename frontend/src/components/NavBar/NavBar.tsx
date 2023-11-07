import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';

import Logo from '../../../../resources/img/Logo.png';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
      <img src={Logo} alt="Logo" className="mr-16 w-64 h-24" />
        <Link to={`/`}>
          <Button color="inherit">
            <span className="hover:text-blue-900 font-semibold text-xl tracking-tight">ICSSHC</span>
          </Button>
        </Link>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <Divider orientation="vertical" flexItem color="white" />
          <Button
            component={Link}
            to={`/dashboard`}
            color="inherit"
            className="hover:text-blue-900 mr-4"
          >
            Tableau de bord
          </Button>

          <Button
            component={Link}
            to={`/actifs`}
            color="inherit"
            className="hover:text-blue-900 mr-4"
          >
            Actifs
          </Button>
          <Button
            component={Link}
            to={`/modeles`}
            color="inherit"
            className="hover:text-blue-900 mr-4"
          >
            Modeles
          </Button>
          <Button
            component={Link}
            to={`/commandes`}
            color="inherit"
            className="hover:text-blue-900 mr-4"
          >
            Commandes
          </Button>
          <Button
            component={Link}
            to={`/clients`}
            color="inherit"
            className="hover:text-blue-900 mr-4"
          >
            Clients
          </Button>
          <Divider orientation="vertical" flexItem color="white" />
          <Button
            component={Link}
            to={`/utilisateurs`}
            color="inherit"
            className="hover:text-blue-900 mr-4"
          >
            Utilisateurs
          </Button>
          <Button
            onClick={async () => {
              try {
                const response = await fetch('http://10.0.22.24:8080/api/clientJsonStore');
                const data = await response.json();
                console.log(data);
              } catch (error) {
                console.error('Error:', error);
              }
            }}
            component={Link}
            to={`/dashboard`}
            color="inherit"
            className="hover:text-blue-900 mr-4"
          >
            Sync
          </Button>

        </div>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
