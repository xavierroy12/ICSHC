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
            <span className="font-semibold text-xl tracking-tight">ICSHC</span>
          </Button>
        </Link>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <Link to={`/dashboard`}>
            <Button
              component={Link}
              to={`/dashboard`}
              color="inherit"
              className="mr-4"
            >
              Dashboard
            </Button>
          </Link>
          <Link to={`/actifs`}>
            <Button
              component={Link}
              to={`/actifs`}
              color="inherit"
              className="mr-4"
            >
              Actifs
            </Button>
          </Link>
          <Link to={`/commande`}>
            <Button
              component={Link}
              to={`/commande`}
              color="inherit"
              className="mr-4"
            >
              Commande
            </Button>
          </Link>
          <Link to={`/client`}>
            <Button
              component={Link}
              to={`/client`}
              color="inherit"
              className="mr-4"
            >
              Client
            </Button>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
