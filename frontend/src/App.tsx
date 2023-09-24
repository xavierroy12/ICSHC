import Layout from './Layout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Actifs from './components/Actifs';

function App() {
  return (
      <div className="App">
        <Router>
          <Layout>
            <Routes>
               <Route path="/actifs" element={ <Actifs />} />
            </Routes>
          </Layout>
        </Router>
      </div>
  )
}

export default App
