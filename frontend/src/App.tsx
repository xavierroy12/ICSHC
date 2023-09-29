import Layout from './Layout';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';

function App() {
  const cookie = true; // replace with your cookie check

  if (!cookie) {
    return <Login />;
  }

  return (
      <div className="App">
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Layout>
        </Router>
      </div>
  )
}

export default App

