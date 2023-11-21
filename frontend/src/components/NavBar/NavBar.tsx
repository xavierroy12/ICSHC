import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Divider, IconButton, Menu, MenuItem } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Fragment, useContext, useState } from 'react';
import { AdminContext } from '../../App';

type Props = {
  darkMode: boolean;
  handleThemeChange: () => void;
};

const NavBar = ({ darkMode, handleThemeChange }: Props) => {
  const isAdmin = useContext(AdminContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Link to={`/`}>
          <Button color="inherit">
            <span className="font-semibold text-xl tracking-tight">ICSSHC</span>
          </Button>
        </Link>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <Button
            component={Link}
            to={`/dashboard`}
            color="inherit"
            className="mr-4"
          >
            Dashboard
          </Button>
          <Button
            component={Link}
            to={`/actifs`}
            color="inherit"
            className="mr-4"
          >
            Actifs
          </Button>
          <Button
            component={Link}
            to={`/modeles`}
            color="inherit"
            className="mr-4"
          >
            Modeles
          </Button>
          <Button
            component={Link}
            to={`/commandes`}
            color="inherit"
            className="mr-4"
          >
            Commandes
          </Button>
          <Button
            component={Link}
            to={`/clients`}
            color="inherit"
            className="mr-4"
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
                  onClick={handleClose}
                  component={Link}
                  to={`/dashboard`}
                >
                  Sync
                </MenuItem>
              </Menu>
            </Fragment>
          )}
        </div>
        <div>
          <Button
            onClick={async () => {
              try {
                const response = await fetch(
                  'http://10.0.22.24:8080/api/syncAllClients'
                );
                const data = await response.json();
                console.log(data);
              } catch (error) {
                console.error('Error:', error);
              }
            }}
            component={Link}
            to={`/profil`}
            color="inherit"
            className="mr-4"
          >
            Profil
          </Button>
          <Button
            onClick={async () => {
              try {
                const response = await fetch(
                  'http://10.0.22.24:8080/api/utilisateursCookie'
                );
                const data = await response.json();
                console.log(data);
              } catch (error) {
                console.error('Error:', error);
              }
            }}
            component={Link}
            to={`/dashboard`}
            color="inherit"
            className="mr-4"
          >
            testIdparcookie
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
