import { useEffect, useState } from "react";
import { Actif_Type } from "./type";
import { useParams } from "react-router-dom";

const Actif = () => {
  const { id } = useParams<{ id: string }>();
  const [actif, setActif] = useState<Actif_Type | null>(null);
  const [actifNotFound, setActifNotFound] = useState<boolean>(false);

  const fetchActif = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/actif/${id}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (!data) {
        setActifNotFound(true);
      } else {
        setActif(data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchActif();
  }, [id]);

  return (
    <div>
      {actifNotFound ? (
        <p>L'actif avec l'ID {id} n'a pas été trouvé dans la base de données.</p>
      ) : actif && ( // Vérifiez si actif existe et s'il contient des informations valides
        actif.nom || actif.numero_serie || actif.en_entrepot !== null || actif.adresse_mac || actif.date_retour || actif.note
      ) ? (
        <>
          <h1>Actif {actif.id}</h1>
          <p>Nom : {actif.nom || "N/A"}</p>
          <p>Numéro de série : {actif.numero_serie || "N/A"}</p>
          <p>En entrepôt : {actif.en_entrepot === 1 ? "Oui" : "Non"}</p>
          <p>Adresse MAC : {actif.adresse_mac || "N/A"}</p>
          <p>Date de retour : {actif.date_retour || "N/A"}</p>
          <p>Note : {actif.note || "N/A"}</p>
        </>
      ) : (
        <p>Aucune information disponible pour l'actif avec l'ID {id}.</p>
      )}
    </div>
  );
};

export default Actif;
