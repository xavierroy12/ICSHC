import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button'; // Import Material-UI Button

const NavBar = () => {
  return (
    <div className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to={`/`}>
          <span className="font-semibold text-xl tracking-tight">ICSHC</span>
        </Link>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link to={`/dashboard`}>
            <Button
              component={Link}
              to={`/dashboard`}
              variant="outlined"
              className="mr-4"
            >
              Dashboard
            </Button>
          </Link>
          <Link to={`/actifs`}>
            <Button
              component={Link}
              to={`/actifs`}
              variant="outlined"
              className="mr-4"
            >
              Actifs
            </Button>
          </Link>
          <Link to={`/commande`}>
            <Button
              component={Link}
              to={`/commande`}
              variant="outlined"
              className="mr-4"
            >
              Commande
            </Button>
          </Link>
          <Link to={`/client`}>
            <Button
              component={Link}
              to={`/client`}
              variant="outlined"
              className="mr-4"
            >
              Client
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
