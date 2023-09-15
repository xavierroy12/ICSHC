import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [emplacements, setEmplacements] = useState<any>(null);


  useEffect(() => {
    fetch('http://127.0.0.1:8000/emplacements/1')
      .then(response => response.json())
      .then(data => setEmplacements(data))
      .catch(error => console.error(error));
  }, []);
  console.log(emplacements)
  return (
    <>
      <h1>Emplacements</h1>
      <ul>
        {emplacements && emplacements.map(emplacement => (
          <li key={emplacement.id}>{emplacement.name}</li>
        ))}
      </ul>
      <div className="card">
        <p>
         This is an edit by William, and this is a second update
        </p>
        <p>
         This is an edit by Xavier Roy :D
        </p> <p>
         This is an edit by Nicolas Boissé wassuppp
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
