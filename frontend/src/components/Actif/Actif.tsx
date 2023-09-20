import { useEffect, useState } from "react";
import { Actif_Type, Props_Actif } from "./type";

const Actif = ( {id} : Props_Actif) => {
    const [actif, setActif] = useState<Actif_Type>();
    const fetchActif = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/actif/${id}`, {
            method: 'GET',
          });    
       
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const data = await response.json();
          setActif(data);
          
        } catch (error) {
          console.error('Fetch error:', error);
        }
      };
      useEffect(() => {
        fetchActif();
      }, []);
    return (
        <div>
            <h1>Actif {actif && actif.id}</h1>
        </div>
    )
}

export default Actif