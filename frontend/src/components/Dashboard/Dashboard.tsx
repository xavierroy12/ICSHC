import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Dashboard = () => {
  const [allAlerts, setAllAlerts] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState<boolean[]>([]);

  useEffect(() => {
    fetchConnectedUser();
    fetchAllAlerts();
  }, []);

  const fetchConnectedUser = async () => {
    const id = localStorage.getItem('id_user');
    try {
      const response = await fetch(`${window.name}api/utilisateur/${id}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching connected user:', error);
    }
  };

  const fetchAllAlerts = async () => {
    try {
      const response = await fetch(`${window.name}api/getAllAlerts`);
      const data = await response.json();
      setAllAlerts(data);
      setOpen(new Array(data.length).fill(false));
    } catch (error) {
      console.error('Error fetching all alerts:', error);
    }
  };

  const handleClick = (index: number) => {
    setOpen((prevOpen) => {
      const newOpen = [...prevOpen];
      newOpen[index] = !newOpen[index];
      return newOpen;
    });
  };

  const getAlertTitle = (type: string) => {
    switch (type) {
      case 'error':
        return 'Erreur';
      case 'warning':
        return 'Attention';
      case 'success':
        return 'Succès';
      default:
        return '';
    }
  };

  return (
    <Box className="flex flex-col items-center space-y-2">
      <div className="mt-12 mb-4">
        <Typography className="font-bold" variant="h5" component="h1">
          Bienvenue <br /> {user?.nom}!
        </Typography>
      </div>
      {allAlerts.map((alert, index) => (
        <Alert
          key={index}
          variant="filled"
          severity={alert.type}
          className="w-2/5 mt-4"
        >
          <AlertTitle className="flex items-center">
            <strong>{getAlertTitle(alert.type)}!</strong>
            <IconButton
              aria-label="expand"
              size="small"
              onClick={() => handleClick(index)}
              className="ml-auto"
              color="inherit"
            >
              <ExpandMoreIcon />
            </IconButton>
          </AlertTitle>
        <Typography variant="body1">
            {`${alert.message}: ${alert.data.length}`}
        </Typography>
          <Collapse in={open[index]}>
            {alert.data.map((item: any) => (
              <Typography key={item.matricule} className="mb-2">
                {`${item.matricule} - ${item.prenom} ${item.nom} - ${
                  item.courriel || 'courriel@bidon.ca'
                }`}
              </Typography>
            ))}
          </Collapse>
        </Alert>
      ))}
    </Box>
  );
};

export default Dashboard;
