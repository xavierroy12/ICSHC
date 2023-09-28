import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { Actif_Type } from "./type";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const Actif = () => {
    const { id } = useParams<{ id: string }>();
    const [actif, setActif] = useState<Actif_Type | null>(null);
    const [actifNotFound, setActifNotFound] = useState<boolean>(false);

    const [modeles, setModeles] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]);
    const [emplacements, setEmplacements] = useState<any[]>([]);
    const [statuts, setStatuts] = useState<any[]>([]);
    const [proprietaires, setProprietaires] = useState<any[]>([]);
    const [utilisations, setUtilisations] = useState<any[]>([]);

    const fetchActif = async () => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/actif/${id}`,
                {
                    method: "GET",
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();

            if (!data) {
                setActifNotFound(true);
            } else {
                setActif(data);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const loadDropdownData = () => {
        // Charger les données pour les listes déroulantes Modèle, Catégorie et Statut
        fetch(`http://127.0.0.1:8000/api/modeles`)
            .then((response) => response.json())
            .then((data) => setModeles(data));

        fetch(`http://127.0.0.1:8000/api/categories`)
            .then((response) => response.json())
            .then((data) => setCategories(data));

        fetch(`http://127.0.0.1:8000/api/clients`)
            .then((response) => response.json())
            .then((data) => setClients(data));

        fetch(`http://127.0.0.1:8000/api/emplacements`)
            .then((response) => response.json())
            .then((data) => setEmplacements(data));

        fetch(`http://127.0.0.1:8000/api/statuts`)
            .then((response) => response.json())
            .then((data) => setStatuts(data));

        fetch(`http://127.0.0.1:8000/api/proprietaires`)
            .then((response) => response.json())
            .then((data) => setProprietaires(data));

        fetch(`http://127.0.0.1:8000/api/utilisations`)
            .then((response) => response.json())
            .then((data) => setUtilisations(data));
    };

    useEffect(() => {
        fetchActif();
        loadDropdownData();
    }, [id]);

    return (
        <div>
            {actifNotFound ? (
                <p>
                    L'actif avec l'ID {id} n'a pas été trouvé dans la base de
                    données.
                </p>
            ) : actif && // Vérifiez si actif existe et s'il contient des informations valides
              (actif.numero_serie || actif.adresse_mac) ? (
                <>
                    <h1 className="mb-8 mt-8 ml-6">Actif - {actif.nom}</h1>

                    <div className="mt-2 ml-12">
                        <h2 className="mt-2 font-bold">Spécifications</h2>
                        <hr className="mb-2 w-96"></hr>
                        <p className="mb-2">Numéro de série : {actif.numero_serie || "N/A"}</p>
                        <p className="mb-2">Nom : {actif.nom || "N/A"}</p>
                        <p className="mb-2">Adresse MAC : {actif.adresse_mac || "N/A"}</p>

                        <label className="mb-2">Modèle :</label>
                        <select
                            className="mb-2 ml-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 p-1.5"
                            value={actif.id_modele_commande || "0"}
                            onChange={(e) => {
                                setActif({
                                    ...actif,
                                    id_modele_commande: parseInt(
                                        e.target.value
                                    ),
                                });
                            }}
                        >
                            <option value="0">{actif.modele}</option>
                            {modeles
                                .filter((modele) => modele.nom !== actif.modele)
                                .map((modele) => (
                                    <option key={modele.id} value={modele.id}>
                                        {modele.nom}
                                    </option>
                                ))}
                        </select>

                        <br />

                        <label className="mb-2">Catégorie :</label>
                        <select
                            className="mb-2 ml-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 p-1.5"
                            value={actif.id_categorie || "0"}
                            onChange={(e) => {
                                setActif({
                                    ...actif,
                                    id_categorie: parseInt(e.target.value),
                                });
                            }}
                        >
                            <option value="0">{actif.categorie}</option>
                            {categories
                                .filter(
                                    (categorie) =>
                                        categorie.nom !== actif.categorie
                                )
                                .map((categorie) => (
                                    <option
                                        key={categorie.id}
                                        value={categorie.id}
                                    >
                                        {categorie.nom}
                                    </option>
                                ))}
                        </select>

                        <h2 className="mt-2 font-bold">Attributs</h2>
                        <hr className="mb-2 w-96"></hr>
                        <p className="mb-2">Date de retour prévue: {actif.date_retour || "N/A"}</p>

                        <label className="mb-2">Assigné à :</label>
                        <select
                            className="mb-2 ml-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 p-1.5"
                            value={actif.id_client || "0"}
                            onChange={(e) => {
                                setActif({
                                    ...actif,
                                    id_client: parseInt(e.target.value),
                                });
                            }}
                        >
                            <option value="0">{actif.assigne_a}</option>
                            {clients
                                .filter(
                                    (client) => client.nom !== actif.assigne_a
                                )
                                .map((client) => (
                                    <option key={client.id} value={client.id}>
                                        {client.nom}
                                    </option>
                                ))}
                        </select>

                        <br />

                        <label className="mb-2">Emplacement :</label>
                        <select
                            className="mb-2 ml-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 p-1.5"
                            value={actif.id_emplacement || "0"}
                            onChange={(e) => {
                                setActif({
                                    ...actif,
                                    id_emplacement: parseInt(e.target.value),
                                });
                            }}
                        >
                            <option value="0">{actif.emplacement}</option>
                            {emplacements
                                .filter(
                                    (emplacement) =>
                                        emplacement.nom !== actif.emplacement
                                )
                                .map((emplacement) => (
                                    <option
                                        key={emplacement.id}
                                        value={emplacement.id}
                                    >
                                        {emplacement.nom}
                                    </option>
                                ))}
                        </select>

                        <div className="mb-2">
                            <label>
                                En entrepôt:
                                <input
                                    type="checkbox"
                                    className="ml-2"
                                    checked={actif.est_en_entrepot}
                                    onChange={(e) => {
                                        setActif({
                                            ...actif,
                                            est_en_entrepot: e.target.checked,
                                        });
                                    }}
                                />
                            </label>
                        </div>

                        <label className="mb-2">Statut :</label>
                        <select
                            className="mb-2 ml-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 p-1.5"
                            value={actif.id_statut || "0"}
                            onChange={(e) => {
                                setActif({
                                    ...actif,
                                    id_statut: parseInt(e.target.value),
                                });
                            }}
                        >
                            <option value="0">{actif.statut}</option>
                            {statuts
                                .filter(
                                    (statut) =>
                                    statut.nom !== actif.statut
                                )
                                .map((statut) => (
                                    <option
                                        key={statut.id}
                                        value={statut.id}
                                    >
                                        {statut.nom}
                                    </option>
                                ))}
                        </select>

<br />
                        <label className="mb-2">Propriétaire :</label>
                        <select
                            className="mb-2 ml-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 p-1.5"
                            value={actif.id_proprietaire || "0"}
                            onChange={(e) => {
                                setActif({
                                    ...actif,
                                    id_proprietaire: parseInt(e.target.value),
                                });
                            }}
                        >
                            <option value="0">{actif.proprietaire}</option>
                            {proprietaires
                                .filter(
                                    (proprietaire) =>
                                    proprietaire.nom !== actif.statut
                                )
                                .map((proprietaire) => (
                                    <option
                                        key={proprietaire.id}
                                        value={proprietaire.id}
                                    >
                                        {proprietaire.nom}
                                    </option>
                                ))}
                        </select>

<br />
                        <label className="mb-2">Utilisation :</label>
                        <select
                            className="mb-2 ml-4  border border-grabg-gray-50y-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 p-1.5"
                            value={actif.id_utilisation || "0"}
                            onChange={(e) => {
                                setActif({
                                    ...actif,
                                    id_utilisation: parseInt(e.target.value),
                                });
                            }}
                        >
                            <option value="0">{actif.utilisation}</option>
                            {utilisations
                                .filter(
                                    (utilisation) =>
                                    utilisation.nom !== actif.utilisation
                                )
                                .map((utilisation) => (
                                    <option
                                        key={utilisation.id}
                                        value={utilisation.id}
                                    >
                                        {utilisation.nom}
                                    </option>
                                ))}
                        </select>




                        <p>
                            Créé le :{" "}
                            {actif.date_creation
                                ? format(
                                      new Date(actif.date_creation),
                                      "yyyy-MM-dd 'à' HH':'mm",
                                      { locale: fr }
                                  )
                                : "N/A"}
                        </p>
                        <p className="font-bold mt-4">Note :</p>
                        <textarea
                            onChange={(e) => {
                                setActif({
                                    ...actif,
                                    note: e.target.value,
                                });
                            }}
                            value={actif.note}
                            className="p-2.5 w-2/5 h-24 marker:text-sm text-gray-900 bg-gray-50 rounded-lg border"
                        />
                    </div>

                    <div className="w-11/12 mx-auto">
                        <Button
                            className="flex float-right"
                            color="green"
                            variant="outline"
                            size="md"
                            onClick={() => {}}
                        >
                            Sauvegarder
                        </Button>
                    </div>
                </>
            ) : (
                <p>
                    Aucune information disponible pour l'actif avec l'ID {id}.
                </p>
            )}
        </div>
    );
};

export default Actif;
