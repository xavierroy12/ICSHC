import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [emplacements, setEmplacements] = useState<any>(null);
  const fetchUser = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/emplacement/1', {
        method: 'GET'
  
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setEmplacements(data);
      // Handle the user data here
      console.log(data);
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error('Fetch error:', error);
    }
  };
  

  useEffect(() => {
    fetchUser();
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
