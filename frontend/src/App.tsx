import '@mantine/core/styles.css';
import Layout from './Layout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Actif from './components/Actif';

function App() {
  return (
      <div className="App">
        <Router>
          <Layout>
            <Routes>
                <Route path="/actif/:id" element={<Actif />} />
            </Routes>
          </Layout>
        </Router>
      </div>
  )
}

export default App

