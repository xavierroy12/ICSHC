import { Button } from "@mantine/core";
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
        actif.nom || actif.numero_serie || actif.est_en_entrepot !== null || actif.adresse_mac || actif.date_retour || actif.note
      ) ? (
        <>
            <h1 className="mb-8 mt-8 ml-6">Actif - {actif.nom}</h1>
                <div className="mt-2 ml-12">
                <h2 className="mt-2 font-bold">Spécifications</h2>
                <hr className="w-96"></hr>
                <p>Numéro de série : {actif.numero_serie || "N/A"}</p>
                <p>Nom : {actif.nom || "N/A"}</p>
                <p>Adresse MAC : {actif.adresse_mac || "N/A"}</p>
                <p>Modèle : {actif.modele || "N/A"}</p>
                <p>Catégorie : {actif.categorie || "N/A"}</p>
                <h2 className="mt-2 font-bold">Attributs</h2>
                <hr className="w-96"></hr>
                <p>Date de retour prévue: {actif.date_retour || "N/A"}</p>
                <p>Assigné à : {actif.assigne_a || "N/A"}</p>
                <p>Emplacement : {actif.emplacement || "N/A"}</p>
                <label>En entrepôt:
                    <input
                    type="checkbox"
                    className="ml-2"
                    checked={actif.est_en_entrepot}
                    readOnly
                    />
                </label>
                <p>Statut : {actif.statut || "N/A"}</p>
                <p>Propriétaire : {actif.proprietaire || "N/A"}</p>
                <p>Utilisation : {actif.utilisation || "N/A"}</p>
                <p>Créé le : {actif.date_creation || "N/A"}</p>
                <p className="font-bold mt-8">Note :</p>
                <textarea
                    value={actif.note || 'Aucune note'}
                    readOnly
                    className="border border-gray-300 rounded-md px-3 py-2 w-1/3 h-40"
                />
                </div>
                <div className="w-11/12 mx-auto mt-10">

            <Button.Group className="flex float-right mt-5">
                <Button className="mr-8" color="green" variant="outline" size="md" onClick={() => {}}>Sauvegarder</Button>
                <Button className="bg-blue" variant="outline" color="yellow" size="md" onClick={() => {}}>Modifier</Button>
            </Button.Group>
    </div>
        </>
      ) : (
        <p>Aucune information disponible pour l'actif avec l'ID {id}.</p>
      )}
    </div>
  );
};

export default Actif;
