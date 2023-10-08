import Layout from './Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ActifsList from './components/ActifsList';
import Actifs from './components/Actifs';
import Actif from './components/Actif';
import Modele from './components/Modele';
import ModeleList from './components/ModeleList/ModeleList';

//uncomment this line to use on local server
window.name = "http://localhost:8000";
//uncomment this line to use on remote server
//window.name = "http://10.0.22.24:5173";


console.log(window.name);





function App() {
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
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
