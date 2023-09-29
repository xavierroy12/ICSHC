import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import React from 'react';

const Actif = () => {
    const { id } = useParams<{ id: string }>();
    const [actif, setActif] = useState<any | null>(null);
    const [actifNotFound, setActifNotFound] = useState<boolean>(false);

    const [dropdownData, setDropdownData] = useState<any>({
        modeles: [],
        categories: [],
        clients: [],
        emplacements: [],
        statuts: [],
        proprietaires: [],
        utilisations: [],
    });

    const fetchData = async (url: string, key: string) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setDropdownData((prevData: any) => ({ ...prevData, [key]: data }));
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const fetchActif = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/actif/${id}`);
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

    const handleFieldChange = (field: string, newValue: any) => {
        setActif((prevActif: any) => ({ ...prevActif, [field]: newValue }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Données à envoyer :", actif);
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/actif/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(actif),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const fieldMappings: Record<string, string> = {
        modele: "id_modele_commande",
        categorie: "id_categorie",
        assigne_a: "id_client",
        emplacement: "id_emplacement",
        statut: "id_statut",
        proprietaire: "id_proprietaire",
        utilisation: "id_utilisation",
    };

    useEffect(() => {
        fetchActif();
        const urls = [
            "http://127.0.0.1:8000/api/modeles",
            "http://127.0.0.1:8000/api/categories",
            "http://127.0.0.1:8000/api/clients",
            "http://127.0.0.1:8000/api/emplacements",
            "http://127.0.0.1:8000/api/statuts",
            "http://127.0.0.1:8000/api/proprietaires",
            "http://127.0.0.1:8000/api/utilisations",
        ];

        urls.forEach((url, index) => {
            fetchData(url, Object.keys(dropdownData)[index]);
        });
    }, [id]);

    const renderLabelInputPair = (label: string, value: any) => (
        <div className="mb-2">
            <label>
                {label}:
                <input
                    type="text"
                    className="ml-2 text-gray-400 cursor-not-allowed"
                    value={value || "N/A"}
                    readOnly
                />
            </label>
        </div>
    );

    return (
        <div>
            {actifNotFound ? (
                <p>
                    L'actif avec l'ID {id} n'a pas été trouvé dans la base de données.
                </p>
            ) : actif && (actif.numero_serie || actif.adresse_mac) ? (
                <form onSubmit={handleSubmit}>
                    <h1 className="mb-8 mt-8 ml-6">Actif - {actif.nom}</h1>
                    <div className="mt-2 ml-12">
                        <h2 className="mt-2 font-bold">Spécifications</h2>
                        <hr className="mb-2 w-96" />

                        {renderLabelInputPair("Numéro de série", actif.numero_serie)}
                        {renderLabelInputPair("Nom", actif.nom)}
                        {renderLabelInputPair("Adresse MAC", actif.adresse_mac)}

                        {[
                            "modele",
                            "categorie",
                            "assigne_a",
                            "emplacement",
                            "statut",
                            "proprietaire",
                            "utilisation",
                        ].map((field) => (
                            <div key={field}>
                                <label className="mb-2">
                                    {field === "proprietaire"
                                        ? "Propriétaire"
                                        : field === "modele"
                                        ? "Modèle"
                                        : field === "categorie"
                                        ? "Catégorie"
                                        : field === "assigne_a"
                                        ? "Assigné à"
                                        : field.charAt(0).toUpperCase() +
                                          field.slice(1)}{" "}
                                    :
                                </label>
                                <select
                                    className="mb-2 ml-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 p-1"
                                    value={actif[fieldMappings[field]] || "0"}
                                    onChange={(e) =>
                                        handleFieldChange(
                                            fieldMappings[field],
                                            parseInt(e.target.value)
                                        )
                                    }
                                >
                                    <option value="0">{actif[field]}</option>
                                    {dropdownData[field + "s"] &&
                                        dropdownData[field + "s"]
                                            .filter(
                                                (item: any) =>
                                                    item.nom !== actif[field]
                                            )
                                            .map((item: any) => (
                                                <option
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.nom}
                                                </option>
                                            ))}
                                </select>
                            </div>
                        ))}

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

                        {renderLabelInputPair(
                            "Créé le",
                            actif.date_creation
                                ? format(
                                      new Date(actif.date_creation),
                                      "yyyy-MM-dd 'à' HH':'mm",
                                      { locale: fr }
                                  )
                                : "N/A"
                        )}

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

                        <div className="w-11/12 mx-auto">
                            <Button
                                className="flex float-right"
                                color="green"
                                variant="outline"
                                size="md"
                                type="submit"
                            >
                                Sauvegarder
                            </Button>
                        </div>
                    </div>
                </form>
            ) : (
                <p>
                    Aucune information disponible pour l'actif avec l'ID {id}.
                </p>
            )}
        </div>
    );
};

export default Actif;
