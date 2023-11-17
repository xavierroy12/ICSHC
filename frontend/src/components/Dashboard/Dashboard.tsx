import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ButtonBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [allAlerts, setAllAlerts] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState<boolean[]>([]);
  const [clicked, setClicked] = useState<boolean[]>([]);

  useEffect(() => {
    fetchConnectedUser();
    fetchAllAlerts();
    console.log(allAlerts);
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
      const alertsWithData = data.filter((alert: { data: any[]; }) => alert.data.length > 0);
      setAllAlerts(alertsWithData);
      setOpen(new Array(alertsWithData.length).fill(false));
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

  const navigate = useNavigate();

  const handleButtonBaseClick = (index: number) => {
    setClicked((prevClicked) => {
      const newClicked = [...prevClicked];
      newClicked[index] = !newClicked[index];
      return newClicked;
    });

    const clickedAlertData = allAlerts[index].data;
    const alertType = allAlerts[index].type;
    const alertName = allAlerts[index].message;

    if (clickedAlertData && clickedAlertData.length > 0) {
      navigate(`/clients/${alertType}/${alertName}`, { state: { filter: clickedAlertData } });
    }
  };

  const getAlertTitle = (type: string) => {
    switch (type) {
      case 'error':
        return 'Erreur!';
      case 'warning':
        return 'Attention!';
      case 'success':
        return 'Succès!';
      default:
        return '';
    }
  };

  return (
    <Box className="flex flex-col items-center space-y-2">
      <div className="mt-12 mb-2">
        <Typography className="flex flex-col items-center font-bold" variant="h5" component="h1">
          Bienvenue <br /> {user?.nom}!
        </Typography>
        <Alert severity="info" className="mt-4 mb-4">
            Vous avez {allAlerts.length} alerte(s) présentement.
        </Alert>
      </div>

      {allAlerts.length === 0 ? (
        <Box className="w-2/5 flex justify-between items-start">
        <ButtonBase className="w-full hover:bg-green-300">
          <Alert variant="outlined" severity="success" className="w-full">
            <AlertTitle className="flex items-start">
              <strong>Succès!</strong>
            </AlertTitle>
            Inventaire en bon état!
          </Alert>
        </ButtonBase>
      </Box>
      ) : allAlerts.map((alert, index) => (
        <Box key={index} className="w-2/5 flex justify-between items-start">
          <ButtonBase onClick={() => handleButtonBaseClick(index)} className={`w-full ${alert.type === 'error' ? 'hover:bg-red-300' : alert.type === 'warning' ? 'hover:bg-orange-300' : 'hover:bg-green-300'}`}>
            <Alert variant="outlined" severity={alert.type} className="w-full">
              <AlertTitle className="flex items-start">
                <strong>{getAlertTitle(alert.type)}</strong>
              </AlertTitle>
              <Typography className='flex'>
                {`${alert.message}: ${alert.data.length}`}
              </Typography>
              <Collapse in={open[index]}>
                {alert.data.map((item: any) => (
                  <Typography className='flex' key={item.matricule}>
                    {`${item.matricule || ''} - ${item.prenom || ''} ${item.nom || ''} - ${item.courriel || 'courriel@bidon.ca'}`}
                  </Typography>
                ))}
              </Collapse>
            </Alert>
          </ButtonBase>
          <IconButton
            aria-label="expand"
            size="medium"
            onClick={() => handleClick(index)}
            color="inherit"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
}

export default Dashboard;
