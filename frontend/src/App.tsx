import Layout from './Layout';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Actifs from './components/Actifs';
import ModifyActifs from './components/ModifyActifs';
import Actif from './components/Actif';
//import Modele from './components/Modele';
import Login from './components/Login';
import Home from './components/Home';
import process from 'process'

function App() {


    const cookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('CookieLogged=')); // Get the cookie
    //let authentified = false;
    //Bypass Login for dev purposes, might want to remove that later
    if (cookie === 'Minou') {
        console.log('Bypassing login');
        //authentified = true;
        //doReturn();
    }

    if (cookie) {
        const token = cookie.split('=')[1]; // Extract the token value
        fetch('http://10.0.22.24:8080/api/checkToken', {
        method: 'POST',
        body: JSON.stringify({ token: token }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            response.json().then(data => {
                if (data.success === true) {
                    console.log('Token is valid');
                    //authentified = true;
                    //doReturn();

                } else {
                    console.log('Token is invalid');
                    return <Login />;
                }
            });
        }
    });
}
else {
    return <Login />;
}



console.log('Authentified');
//function doReturn() {  <Route path="/" element={<Modele id={'1'} />} />
return (

    <div className="App">
    <Router>
    <Layout>
    <Routes>
    <Route path="/actifs" element={<Actifs />} />
            <Route path="/actifs/modify" element={<ModifyActifs />} />
            <Route path="/actif/:id" element={<Actif />} />
            <Route path="*" element={<h1>Not Found</h1>} />
           
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    </Routes>s
    </Layout>
    </Router>
    </div>
    )
}
//}

export default App;
