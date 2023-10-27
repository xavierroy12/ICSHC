import Layout from './Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ActifsList from './components/ActifsList';
import Actifs from './components/Actifs';
import Actif from './components/Actif';
import Modele from './components/Modele';
import ModeleList from './components/ModeleList/ModeleList';
import Login from './components/Login/Login';

if (process.env.NODE_ENV === 'development') {
  window.name = 'http://localhost:8000/';
} else {
  window.name = 'http://10.0.22.24:8080/';
}


function App() {

  console.log('App.tsx');
  const cookie = document.cookie
    .split(';')
    .find((cookie) => cookie.trim().startsWith('CookieLogged=')); // Get the cookie


  //Bypass Login for dev purposes, might want to remove that later
  if (cookie === 'CookieLogged=Minou') {
    console.log('Bypassing login');
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
              console.log('Token is valid');
              console.log(data.utilisateur);

            }
            else {
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

  console.log('Authentified');
  //function doReturn() {  <Route path="/" element={<Modele id={'1'} />} />
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route path="/actifs" element={<ActifsList />} />
            <Route path="/actifs/modify" element={<Actifs />} />
            <Route path="/actif/:id" element={<Actif />} />

            <Route path="/modeles" element={<ModeleList />} />
            <Route path="/modele/:id" element={<Modele />} />

            <Route path="*" element={<h1>Not Found</h1>} />

            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}
//}

export default App;
