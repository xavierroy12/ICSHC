import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import {
  CircularProgress,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Fragment, useContext, useState } from 'react';
import { AdminContext } from '../../App';
import { toast } from 'react-toastify';
type Props = {
  darkMode: boolean;
  handleThemeChange: () => void;
};

const NavBar = ({ darkMode, handleThemeChange }: Props) => {
  const isAdmin = useContext(AdminContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  };
  const handleSync = async () => {
    handleClose();
    setIsSyncing(true);
    fetch('http://10.0.22.24:8080/api/syncAllClients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        toast.success('Sync Réussi');
        setIsSyncing(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Sync Echoué');
        setIsSyncing(false);
      });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/dashboard">
          <img src="/Logo.png" alt="Logo" className="mr-16 w-64 h-24" />
        </Link>

        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <Button
            component={Link}
            to={`/dashboard`}
            color="inherit"
            className=" mr-4"
          >
            Tableau de bord
          </Button>

          <Button
            component={Link}
            to={`/actifs`}
            color="inherit"
            className=" mr-4"
          >
            Actifs
          </Button>
          <Button
            component={Link}
            to={`/modeles`}
            color="inherit"
            className=" mr-4"
          >
            Modeles
          </Button>
          <Button
            component={Link}
            to={`/commandes`}
            color="inherit"
            className=" mr-4"
          >
            Commandes
          </Button>
          <Button
            component={Link}
            to={`/clients`}
            color="inherit"
            className=" mr-4"
          >
            Clients
          </Button>
          {isAdmin && (
            <Fragment>
              <Divider orientation="vertical" flexItem color="white" />
              <Button color="inherit" className="mr-4" onClick={handleClick}>
                Admin
              </Button>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to={`/utilisateurs`}
                >
                  Utilisateurs
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to={`/rapport`}
                >
                  Rapports
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to={`/emplacements`}
                >
                  Emplacements
                </MenuItem>
                <MenuItem
                  onClick={handleSync}
                  component={Link}
                  to={`/dashboard`}
                >
                  Sync
                  {isSyncing && <CircularProgress size={24} className="ml-4" />}
                </MenuItem>
              </Menu>
            </Fragment>
          )}
        </div>
        <div>
          <Button
            component={Link}
            to={`/profil`}
            color="inherit"
            className=" mr-4"
          >
            Profil
          </Button>
          <Button
            component={Link}
            to={`/profil`}
            color="inherit"
            className=" mr-4"
            onClick={handleLogout} // add this line
          >
            Déconnexion
          </Button>
          <IconButton onClick={handleThemeChange}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
