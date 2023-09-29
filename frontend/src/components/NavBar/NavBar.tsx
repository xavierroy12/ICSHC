import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const user = sessionStorage.getItem('user');

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
          {user && (
            <div className="text-white">

              Logged in as {user}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
