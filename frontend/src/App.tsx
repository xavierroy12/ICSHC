import '@mantine/core/styles.css';
import Layout from './Layout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
      <div className="App">

        <Router>

          <Layout>
            {/* <Routes>
               <Route exact path="/" render={() => <HomePage />} />
            </Routes> */}
          </Layout>
        </Router>
      </div>
  )
}

export default App

