import Layout from './Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Actifs from './components/Actifs';
import ModifyActifs from './components/ModifyActifs';
import Actif from './components/Actif';
import NewActif from './components/NewActif';

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route path="/actifs" element={<Actifs />} />
            <Route path="/actifs/modify" element={<ModifyActifs />} />
            <Route path="/actif/:id" element={<Actif />} />
            <Route path="/newActif/:id" element={<NewActif />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
