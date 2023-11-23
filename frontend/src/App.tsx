import Layout from './Layout';
import {
  //BrowserRouter as Router,
  Routes,
  Route,
  //Navigate,
  useNavigate,
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ActifsList from './components/ActifsList';
import Actifs from './components/Actifs';
import Actif from './components/Actif';
import Modele from './components/Modele';
import ModeleList from './components/ModeleList/ModeleList';
import Login from './components/Login/Login';
import Client from './components/Client';
import ClientsList from './components/ClientsList';
import UtilisateurList from './components/UtilisateurList';
import Utilisateur from './components/Utilisateur';
import CommandesList from './components/CommandesList';
import Commande from './components/Commande';
import Dashboard from './components/Dashboard/Dashboard';
import ActifAdd from './components/ActifAdd/ActifAdd';
import Rapport from './components/Rapport';
import EmplacementList from './components/EmplacementList';
import Emplacement from './components/Emplacement';
import Profil from './components/Profil/Profil';
import { createContext, useEffect, useState } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

if (process.env.NODE_ENV === 'development') {
  window.name = 'http://localhost:8000/';
} else {
  window.name = 'http://10.0.22.24:8080/';
}

export const AdminContext = createContext(false);

function App() {
  const navigate = useNavigate();
  const [toastShown, setToastShown] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    const localDarkMode = window.localStorage.getItem('darkMode');
    return localDarkMode ? JSON.parse(localDarkMode) : false;
  });
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    window.localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const cookie = document.cookie
      .split(';')
      .find((cookie) => cookie.trim().startsWith('CookieLogged='));
    // Get the cookie
    if (cookie) {
      const token = cookie.split('=')[1]; // Extract the token value
      fetch(window.name + 'api/checkToken', {
        method: 'POST',
        body: JSON.stringify({ token: token }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            if (data.user.valid_token === true) {
              if (!toastShown) toast.success('Vous êtes connecté');
              setIsAdmin(data.user.is_admin); // set the isAdmin state to true or false
              setToastShown(true);
            } else {
              toast.error("Vous n'êtes pas connecté");
              navigate('/login');
              setToastShown(true);
            }
          });
        }
      });
    } else {
      navigate('/login');
    }
  }, [navigate, toastShown]);

  return (
    <AdminContext.Provider value={isAdmin}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <div className={darkMode ? 'dark' : ''}>
            <Layout darkMode={darkMode} handleThemeChange={handleThemeChange} showNavAndFooter={location.pathname !== '/login'}>
              <ToastContainer />
              <Routes>
                <Route path="/actifs" element={<ActifsList />} />
                <Route path="/actifs/modify" element={<Actifs />} />
                <Route path="/actif/:id" element={<Actif />} />
                <Route path="/actif" element={<ActifAdd />} />

                <Route path="/modeles" element={<ModeleList />} />
                <Route path="/modele/:id" element={<Modele />} />

                <Route path="/client/:id" element={<Client />} />
                <Route
                  path="/clients/:alertType/:alertName"
                  element={<ClientsList key={window.location.pathname} />}
                />
                <Route path="/clients" element={<ClientsList />} />

                <Route path="/utilisateurs" element={<UtilisateurList />} />
                <Route path="/utilisateur/:id" element={<Utilisateur />} />

                <Route path="/profil" element={<Profil />} />

                <Route path="/commandes" element={<CommandesList />} />
                <Route
                  path="/commande/:numero_commande"
                  element={<Commande />}
                />

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/rapport" element={<Rapport />} />

                <Route path="/emplacements" element={<EmplacementList />} />
                <Route path="/emplacement/:id" element={<Emplacement />} />

                <Route path="*" element={<Dashboard />} />

                <Route path="/login" element={<Login />} />
              </Routes>
            </Layout>
          </div>
        </div>
      </ThemeProvider>
    </AdminContext.Provider>
  );
}

export default App;
