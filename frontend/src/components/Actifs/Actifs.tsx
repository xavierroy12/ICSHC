import { Button, Checkbox, Table, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import Filtre from "./Filtre";
import { Actif,FiltreGeneric } from "./type";



const Actifs = () => {
    const [actifs, setActifs] = useState<Actif[]>([]);

    const [etats, setEtats] = useState<FiltreGeneric[]>([]);
    const [categories, setCategories] = useState<FiltreGeneric[]>([]);
    const [modeles, setModeles] = useState<FiltreGeneric[]>([]);
    const [localisations, setLocalisations] = useState<FiltreGeneric[]>([]);
    const [locataires, setLocataires] = useState<FiltreGeneric[]>([]);

    const [currentEtat, setCurrentEtat] = useState<string>("");
    const [currentCategorie, setCurrentCategorie] = useState<string>("");
    const [currentModele, setCurrentModele] = useState<string>("");
    const [currentLocalisation, setCurrentLocalisation] = useState<string>("");
    const [currentLocataire, setCurrentLocataire] = useState<string>("");

    useEffect(() => {
        
        fetch("http://localhost:8000/api/etats")
            .then((response) => response.json())
            .then((etats) => setEtats(etats));
        fetch("http://localhost:8000/api/categories")
            .then((response) => response.json())
            .then((categories) => setCategories(categories));
        fetch("http://localhost:8000/api/modeles")
            .then((response) => response.json())
            .then((modeles) => setModeles(modeles));
        fetch("http://localhost:8000/api/emplacements")
            .then((response) => response.json())
            .then((localisations) => setLocalisations(localisations));
        fetch("http://localhost:8000/api/clients")
            .then((response) => response.json())
            .then((locataires) => setLocataires(locataires));
        fetch("http://localhost:8000/api/actifs")
            .then((response) => response.json())
            .then((actifs) => {
                const actifsWithRelations = actifs.map((actif) => {
                    return {
                        ...actif,
                        statut: etats.find((etat) => etat.id === actif.id_statut),
                        emplacement: localisations.find((localisation) => localisation.id === actif.id_emplacement),
                        proprietaire: locataires.find((locataire) => locataire.id === actif.id_locataires),
                    };
                });
                setActifs(actifsWithRelations);
            });
    }, []);
    
    const rows = actifs.map((actif) => (
        <Table.Tr key={actif.numero_serie}>
            <Table.Td><Checkbox id={actif.numero_serie} /></Table.Td>
            <Table.Td>{actif.numero_serie}</Table.Td>
            <Table.Td>{actif.nom}</Table.Td>
            <Table.Td>{actif.id_statut}</Table.Td>
            <Table.Td>{actif.id_modele_commande}</Table.Td>
            <Table.Td>{actif.id_modele_commande}</Table.Td>
            <Table.Td>{actif.id_emplacement}</Table.Td>
            <Table.Td>{actif.id_proprietaire}</Table.Td>
        </Table.Tr>
    ));
    console.log(actifs)
    
    return (
        <div className="w-11/12 mx-auto mt-10">
            <Title order={1}>Actifs</Title>
            <div className="flex justify-between">
               <Filtre values={etats} value={currentEtat} setValue={setCurrentEtat} placeHolder="État"/>
               <Filtre values={categories} value={currentCategorie} setValue={setCurrentCategorie} placeHolder="Catégorie" />
               <Filtre values={modeles} value={currentModele} setValue={setCurrentModele} placeHolder="Modèle" />
               <Filtre values={localisations} value={currentLocalisation} setValue={setCurrentLocalisation} placeHolder="Localisation" />
               <Filtre values={locataires} value={currentLocataire} setValue={setCurrentLocataire} placeHolder="Asigné à" />
            </div>
            <Table className="mt-5 max-h-80" highlightOnHover withTableBorder>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Selectionner</Table.Th>
                        <Table.Th>Numero Serie</Table.Th>
                        <Table.Th>Nom</Table.Th>
                        <Table.Th>État</Table.Th>
                        <Table.Th>Catégorie</Table.Th>
                        <Table.Th>Modèle</Table.Th>
                        <Table.Th>Localisation</Table.Th>
                        <Table.Th>Assigné à</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            <div className="flex justify-between mt-5">
                <Button className="">Ajouter</Button>
                <Button className="">Modifier</Button>
            </div>
        </div>
    );
};

export default Actifs