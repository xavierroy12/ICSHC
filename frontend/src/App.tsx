import '@mantine/core/styles.css';
import Layout from './Layout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';

function App() {
  return (
      <div className="App">
        <Router>
          <Layout>
            <Routes>
               <Route  path="/" element={ <Login />} />
            </Routes>
          </Layout>
        </Router>
      </div>
  )
}

export default App

