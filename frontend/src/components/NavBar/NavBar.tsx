import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const NavBar = () => {
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
              to={`/commande`}
              color="inherit"
              className="mr-4"
            >
              Commande
            </Button>
            <Button
              component={Link}
              to={`/client`}
              color="inherit"
              className="mr-4"
            >
              Client
            </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
