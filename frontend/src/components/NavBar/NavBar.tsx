import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">ICSHC</span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
   
          <Link to={`/dashboard`}>
            <Button variant="link" color="white" className="mr-4">
              Dashboard
            </Button>
          </Link>
          <Link to={`/actifs`}>
            <Button variant="link" color="white" className="mr-4">
              Actifs
            </Button>
          </Link>
          <Link to={`/commande`}>
            <Button variant="link" color="white" className="mr-4">
              Commande
            </Button>
          </Link>
          <Link to={`/client`}>
            <Button variant="link" color="white" className="mr-4">
              Client
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;