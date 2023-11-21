import Layout from './Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

  //enlever pour le split 3
  //localStorage.setItem('id_user', '2');
  const cookie = document.cookie
    .split(';')
    .find((cookie) => cookie.trim().startsWith('CookieLogged=')); // Get the cookie

  //Bypass Login for dev purposes, might want to remove that later
  if (cookie === 'CookieLogged=Minou') {
    toast.success('Bypassing login');
  } else {
    if (cookie) {
      const token = cookie.split('=')[1]; // Extract the token value
      console.log('Token:', token); // Add this line to log the token value
      console.log(window.name);

      fetch(window.name + 'api/checkToken', {
        method: 'POST',
        body: JSON.stringify({ token: token }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            if (data.success === true) {
              toast.success('Vous êtes connecté');
              console.log('Token is valid');
              console.log('user data', data.utilisateur);
              setIsAdmin(data.utilisateur.isAdmin); // Assuming the user data has an isAdmin field
            } else {
              toast.error("Vous n'êtes pas connecté");
              console.log('Token is invalid');
              return <Login />;
            }
          });
        }
      });
    } else {
      return <Login />;
    }
  }
  return (
    <AdminContext.Provider value={isAdmin}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <div className={darkMode ? 'dark' : ''}>
            <Router>
              <Layout darkMode={darkMode} handleThemeChange={handleThemeChange}>
                <ToastContainer />
                <Routes>
                  <Route path="/actifs" element={<ActifsList />} />
                  <Route path="/actifs/modify" element={<Actifs />} />
                  <Route path="/actif/:id" element={<Actif />} />
                  <Route path="/actif" element={<ActifAdd />} />

                  <Route path="/modeles" element={<ModeleList />} />
                  <Route path="/modele/:id" element={<Modele />} />

                  <Route path="/client/:id" element={<Client />} />
                  <Route path="/clients" element={<ClientsList />} />

                  <Route path="/utilisateurs" element={<UtilisateurList />} />
                  <Route path="/utilisateur/:id" element={<Utilisateur />} />

                  <Route path="/profil" element={<Profil />} />

                  <Route path="/commandes" element={<CommandesList />} />
                  <Route
                    path="/commande/:numero_commande"
                    element={<Commande />}
                  />

                  <Route path="/rapport" element={<Rapport />} />

                  <Route path="/emplacements" element={<EmplacementList />} />
                  <Route path="/emplacement/:id" element={<Emplacement />} />

                  <Route path="*" element={<h1>Not Found</h1>} />

                  <Route path="/login" element={<Login />} />
                </Routes>
              </Layout>
            </Router>
          </div>
        </div>
      </ThemeProvider>
    </AdminContext.Provider>
  );
}

export default App;
