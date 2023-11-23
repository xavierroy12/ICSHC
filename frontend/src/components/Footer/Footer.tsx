import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const Footer = () => {
  return (
    <AppBar position="static" className="mt-12 fixed bottom-0 w-full">
      <Toolbar className="flex justify-center">
        <span>
          <i>Copyright ICSSHC 2023</i>
        </span>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
