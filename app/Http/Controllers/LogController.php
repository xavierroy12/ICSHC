<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Log;
use App\Models\Utilisateur;
use App\Models\Actif;
use App\Models\Client;
use App\Models\Modele;
use App\Models\Commande;
use App\Models\Emplacement;
use Illuminate\Support\Str;


class LogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function listJson()
    {
        $logs = Log::all();
        return response()->json($logs);
    }

    public function logRequestUnspecific(Request $request)
    {

        Log::create([
            'url' => $request->fullUrl(),
            'method' => $request->method(),
            'action' => 'API Request',
            'user' => '$request->user() ? $request->user()->name : null,',
            // 'client' => $client->name, // Add this if you have a client
            // 'actif' => $actif->name, // Add this if you have an actif
            // 'location' => $location->name, // Add this if you have a location
        ]);
    }

    public function logActifs($request)
    {
        $modificateur = $request->header('X-User-Action-Id');
        $data = $request->all();
        $arrayIdActifs = $data['ids'];
        $data = $data['values'];
        $requestData = [
            'en_entrepot' => isset($data['en_entrepot']) ? $data['en_entrepot'] : null,
            'date_retour' => isset($data['date_retour']) ? $data['date_retour'] : null,
            'note' => isset($data['note']) ? $data['note'] : null,
            'id_modele' => isset($data['id_modele']) ? $data['id_modele'] : null,
            'id_categorie' => isset($data['id_categorie']) ? $data['id_categorie'] : null,
            'id_statut' => isset($data['id_statut']) ? $data['id_statut'] : null,
            'id_emplacement' => isset($data['id_emplacement']) ? $data['id_emplacement'] : null,
            'id_proprietaire' => isset($data['id_proprietaire']) ? $data['id_proprietaire'] : null,
            'id_utilisation' => isset($data['id_utilisation']) ? $data['id_utilisation'] : null,
        ];
        foreach ($arrayIdActifs as $id) {
            $actif = Actif::find($id);
            foreach ($requestData as $field => $newValue) {

                if ($actif->$field != $newValue && $newValue != null) {
                    $log = new Log([
                        'url' => $request->fullUrl(),
                        'method' => $request->method(),
                        'action' => 'Modifier',
                        'field' => $field,
                        'old_value' => $newValue,
                        'new_value' => $actif->$field,
                        'id_user' => $modificateur,
                        'id_actif' => $id,
                    ]);
                    if ($field == 'id_categorie') {
                        if ($actif->modele->categorie->id == $newValue)
                            break;
                        $log->old_value = $actif->modele->categorie->id;
                    }
                    $log->save();
                }
            }
        }
    }

    public function logActif($request)
    {
        //set the variable needed
        $modificateur = $request->header('X-User-Action-Id');
        $path = $request->path();
        $id = basename($path);
        $actif = Actif::find($id);
        $data = $request->all();
        //set the data to be logged
        $requestData = [
            'nom' => isset($data['nom']) ? $data['nom'] : null,
            'numero_serie' => isset($data['numero_serie']) ? $data['numero_serie'] : null,
            'en_entrepot' => isset($data['en_entrepot']) ? $data['en_entrepot'] : null,
            'date_retour' => isset($data['date_retour']) ? $data['date_retour'] : null,
            'note' => isset($data['note']) ? $data['note'] : null,
            'id_client' => isset($data['id_assigne_a']) ? $data['id_assigne_a'] : null,
            'id_modele' => isset($data['id_modele']) ? $data['id_modele'] : null,
            'id_statut' => isset($data['id_statut']) ? $data['id_statut'] : null,
            'id_emplacement' => isset($data['id_emplacement']) ? $data['id_emplacement'] : null,
            'id_proprietaire' => isset($data['id_proprietaire']) ? $data['id_proprietaire'] : null,
            'id_utilisation' => isset($data['id_utilisation']) ? $data['id_utilisation'] : null,
        ];
        if ($requestData['id_client'] == 'Aucun')
            $requestData['id_client'] = null;


        //for each field in the request, check if it is different from the current value and if it is, log it
        foreach ($requestData as $field => $newValue) {
            if ($actif->$field != $newValue) {
                $log = new Log([
                    'url' => $request->fullUrl(),
                    'method' => $request->method(),
                    'action' => 'Modifier',
                    'field' => $field,
                    'old_value' => $actif->$field,
                    'new_value' => $newValue,
                    'id_user' => $modificateur,
                    'id_actif' => $id,
                ]);
                if ($field == 'id_categorie') {
                    if ($actif->modele->categorie->id == $newValue) {
                        continue;
                    }
                    $log->old_value = $actif->modele->categorie->id;
                }

                $log->save();
            }
        }
    }



    public function logAssignation(Request $request)
    {
        $modificateur = $request->header('X-User-Action-Id');
        $path = $request->path();
        $idClient = basename($path);
        $actifClients = Actif::where('id_client', $idClient)->get();
        $actifsRequestIds = $request->input('actifs');
        $actifClientsIds = $actifClients->pluck('id')->toArray();

        $addedIds = array_diff($actifsRequestIds, $actifClientsIds);
        $removedIds = array_diff($actifClientsIds, $actifsRequestIds);



        foreach ($addedIds as $id) {
            $actif = Actif::where('id', $id)->first();
            //If one of the actif is already assigned, we create a log for the client wich just lost an actif.
            if ($actif->id_client != null) {
                $logDesasignation = new Log([
                    'url' => $request->fullUrl(),
                    'method' => $request->method(),
                    'action' => 'Desassignation',
                    'field' => 'id_actif',
                    'old_value' => $id,
                    'new_value' => null,
                    'id_user' => $modificateur,
                    'id_client' => $actif->id_client,
                ]);
                $logDesasignation->save();
            }

            $log = new Log([
                'url' => $request->fullUrl(),
                'method' => $request->method(),
                'action' => 'Assignation',
                'field' => 'id_client',
                'old_value' => null,
                'new_value' => $idClient,
                'id_user' => $modificateur,
                'id_actif' => $id,
            ]);
            $log->save();
            $log = new Log([
                'url' => $request->fullUrl(),
                'method' => $request->method(),
                'action' => 'Assignation',
                'field' => 'id_actif',
                'old_value' => null,
                'new_value' => $id,
                'id_user' => $modificateur,
                'id_client' => $idClient,
            ]);
            $log->save();
        }

        foreach ($removedIds as $id) {
            $log = new Log([
                'url' => $request->fullUrl(),
                'method' => $request->method(),
                'action' => 'Desassignation',
                'field' => 'id_client',
                'old_value' => $idClient,
                'new_value' => null,
                'id_user' => $modificateur,
                'id_actif' => $id,
            ]);
            $log->save();

            $log = new Log([
                'url' => $request->fullUrl(),
                'method' => $request->method(),
                'action' => 'Desassignation',
                'field' => 'id_actif',
                'old_value' => $id,
                'new_value' => null,
                'id_user' => $modificateur,
                'id_client' => $idClient,
            ]);
            $log->save();
        }
    }

    public function logFavoris(Request $request)
    {
        $modificateur = $request->header('X-User-Action-Id');
        $path = $request->path();
        $idModele = basename($path);
        $modele = Modele::find($idModele);

        $log = new Log([
            'url' => $request->fullUrl(),
            'method' => $request->method(),
            'action' => 'Modifier',
            'field' => 'favoris',
            'old_value' => False,
            'new_value' => True,
            'id_user' => $modificateur,
            'id_modele' => $idModele,
        ]);
        if ($modele->favoris == True) {
            $log->action = 'Modifier';
            $log->new_value = False;
            $log->old_value = True;
        }

        $log->save();
    }

    public function logModele(Request $request)
    {
        $modificateur = $request->header('X-User-Action-Id');
        $path = $request->path();
        $idModele = basename($path);
        $modele = Modele::find($idModele);

        $data = $request->all();
        $requestData = [
            'id' => isset($data['id']) ? $data['id'] : null,
            'nom' => isset($data['nom']) ? $data['nom'] : null,
            'id_type_modele' => isset($data['id_type_modele']) ? $data['id_type_modele'] : null,
            'stockage' => isset($data['stockage']) ? $data['stockage'] : null,
            'processeur' => isset($data['processeur']) ? $data['processeur'] : null,
            'memoire_vive' => isset($data['memoire_vive']) ? $data['memoire_vive'] : null,
            'favoris' => isset($data['favoris']) ? $data['favoris'] : null,
            'taille' => isset($data['taille']) ? $data['taille'] : null,
        ];

        foreach ($requestData as $field => $newValue) {
            if ($modele->$field != $newValue && $newValue != null) {
                $log = new Log([
                    'url' => $request->fullUrl(),
                    'method' => $request->method(),
                    'action' => 'Modifier',
                    'field' => $field,
                    'old_value' => $modele->$field,
                    'new_value' => $newValue,
                    'id_user' => $modificateur,
                    'id_modele' => $idModele,
                ]);
                $log->save();
            }
        }
    }

    public function logUtilisateur(Request $request)
    {
        $modificateur = $request->header('X-User-Action-Id');
        $path = $request->path();
        $idUtilisateur = basename($path);
        $utilisateur = Utilisateur::find($idUtilisateur);


        $data = $request->all();
        //set the data to be logged
        $requestData = [
            'id_role' => isset($data['id_role']) ? $data['id_role'] : null,
            'id_emplacement' => isset($data['id_emplacement']) ? $data['id_emplacement'] : null,
        ];

        foreach ($requestData as $field => $newValue) {
            if ($utilisateur->$field != $newValue && $newValue != null) {
                $log = new Log([
                    'url' => $request->fullUrl(),
                    'method' => $request->method(),
                    'action' => 'Modifier',
                    'field' => $field,
                    'old_value' => $utilisateur->$field,
                    'new_value' => $newValue,
                    'id_user' => $modificateur,
                    'id_utilisateur' => $idUtilisateur,
                ]);

                $log->save();
            }
        }
    }

    public function logReceptionCommande(Request $request)
    {
        $modificateur = $request->header('X-User-Action-Id');
        $path = $request->path();
        $numeroCommande = basename($path);
        $commande = Commande::find($numeroCommande);

        $id_etat_recu = 3;
        $log = new Log([
            'url' => $request->fullUrl(),
            'method' => $request->method(),
            'action' => 'Reception',
            'field' => 'id_etat',
            'old_value' => $commande->id_etat,
            'new_value' => $id_etat_recu,
            'id_user' => $modificateur,
            'id_commande' => $numeroCommande,
        ]);
        $log->save();

    }



    public function showLogs($typeItem, $id_item)
    {
        $logs = [];
        $logsReturned = [];
        $relationships = ['actif', 'client', 'modele', 'user'];

        // Return all actif logs
        if ($typeItem == 'actif') {
            $logs = Log::where('id_actif', $id_item)->with($relationships)->get();
        }
        // Return all client logs
        if ($typeItem == 'client') {
            $logs = Log::where('id_client', $id_item)->with($relationships)->get();
        }
        // Return all modele logs
        if ($typeItem == 'modele') {
            $logs = Log::where('id_modele', $id_item)->with($relationships)->get();
        }
        // Return all user logs
        if ($typeItem == 'utilisateur') {
            $logs = Log::where('id_user', $id_item)->with($relationships)->get();
        }
        // Return Commande log
        if ($typeItem == 'commande') {
            $logs = Log::where('id_commande', $id_item)->with($relationships)->get();
        }

        $beautifyChampDict = [
            'Type_modele' => 'Catégorie',
            'Etat' => ' État de la commande',
            'En_entrepot' => 'En entrepôt',
            'Date_retour' => 'Date de retour',

        ];
        $beautifyValueDict = [
            '0' => 'Non',
            '1' => 'Oui',
        ];

        foreach ($logs as $log) {
            if ($this->isForeignKey($log->field)) {
                $log->old_value = $this->getFieldValue($log->old_value, $typeItem, $log->field, $id_item, False);
                $log->new_value = $this->getFieldValue($log->new_value, $typeItem, $log->field, $id_item, True);

                $champ = substr($log->field, 3);
            } else {
                $champ = $log->field;
            }

            //Preparing string for frontend

            //if getfieldvalue returned null, we set the value to 'rien'
            $old_value = $log->old_value !== null ? $log->old_value : 'rien';
            $new_value = $log->new_value !== null ? $log->new_value : 'rien';

            //We use the dict to change the value of the data to be more user friendly
            $champ = ucfirst($champ);
            $champ = $beautifyChampDict[$champ] ?? $champ;
            $old_value = $beautifyValueDict[$old_value] ?? $old_value;
            $new_value = $beautifyValueDict[$new_value] ?? $new_value;

            //we build the string to be displayed
            $description = $log->action . ' ' . $champ . ' de ' . $old_value . ' à ' . $new_value;
            //If we are showing the logs of a user, we need to display the object that the user modified.
            if ($typeItem == 'utilisateur') {
                $parameter = $log->toArray();
                foreach ($parameter as $key => $param) {
                    $itemToFind = '';
                    $instanceModifierNom = '';
                    if (strpos($key, 'id_') === 0 && $key != 'id_user' && $param !== null) {
                        $ObjectModifier = $key;
                        $ObjectModifierNom = substr($ObjectModifier, 3); // Remove 'id_' from the start of the field name
                        $itemToFind = Str::studly($ObjectModifierNom);
                        $itemToFind = str_replace('_', '', $itemToFind);
                        error_log('line 449 : ' . (string) $itemToFind);
                        $itemToFindClass = "\\App\\Models\\" . $itemToFind; // Construct the fully qualified class name
                        $instanceModifier = $itemToFindClass::find($param); //
                        $instanceModifierNom = $instanceModifier->nom;
                        break;
                    }
                }
                $description = $itemToFind . ': ' . $instanceModifierNom . ', ' . $description;
            }
            $username = Utilisateur::find($log->id_user);
            if (isset($username))
                $nameUser = $username->nom;
            else
                $nameUser = null;
            $utilisateur = $nameUser !== null ? $nameUser : 'Utilisateur introuvable';
            $data = [
                'date' => $log->created_at->timezone('America/New_York')->format('Y-m-d H:i:s'),
                'description' => $description,
                'utilisateur' => $utilisateur,
            ];

            array_push($logsReturned, $data);
        }

        return response()->json($logsReturned);
    }

    public function isForeignKey($field)
    {
        return substr($field, 0, 2) == 'id';
    }

    public function getFieldValue($value, $typeItem, $field, $id_item, $isNew)
    {
        if ($value == null)
            return null;

        if ($typeItem == 'actif') {
            $actif = Actif::find($id_item);
            //error_log('getFieldValue parameters: value=' . $value . ', typeItem=' . $typeItem . ', field=' . $field . ', id_item=' . $id_item);
            if ($field === 'id_proprietaire') {
                $proprietaire = Emplacement::find($value);
                $result = $proprietaire->nom;
            } else {
                $relatedModelName = substr($field, 3); // Remove 'id_' from the start of the field name
                $itemToFind = ucfirst($relatedModelName);
                $itemToFindClass = "\\App\\Models\\" . $itemToFind; // Construct the fully qualified class name
                $ResultModel = $itemToFindClass::find($value);
                if ($itemToFind == 'Client')
                    $result = $ResultModel->prenom . ' ' . $ResultModel->nom;
                else
                    $result = $ResultModel->nom;
            }


            return $result;
        }
        if ($typeItem == 'client') {
            $relatedModelName = substr($field, 3); // Remove 'id_' from the start of the field name
            $itemToFind = ucfirst($relatedModelName);
            $itemToFindClass = "\\App\\Models\\" . $itemToFind; // Construct the fully qualified class name
            $ResultModel = $itemToFindClass::find($value);
            if (isset($ResultModel)) {
                $result = $ResultModel->nom;
            } else
                $result = null;

            return $result;
        }
        if ($typeItem == 'modele') {
            $relatedModelName = substr($field, 3); // Remove 'id_' from the start of the field name
            $itemToFind = Str::studly($relatedModelName);
            $itemToFind = str_replace('_', '', $itemToFind);
            $itemToFindClass = "\\App\\Models\\" . $itemToFind; // Construct the fully qualified class name
            $ResultModel = $itemToFindClass::find($value); //
            if (isset($ResultModel)) {
                $result = $ResultModel->nom;
            } else
                $result = null;

            return $result;
        }
        if ($typeItem == 'utilisateur' || 'commande') {
            if ($field === 'id_proprietaire') {
                $proprietaire = Emplacement::find($value);
                $result = $proprietaire->nom;
            } else {
                $relatedModelName = substr($field, 3); // Remove 'id_' from the start of the field name
                $itemToFind = Str::studly($relatedModelName);
                $itemToFind = str_replace('_', '', $itemToFind);
                $itemToFindClass = "\\App\\Models\\" . $itemToFind; // Construct the fully qualified class name
                $ResultModel = $itemToFindClass::find($value); //
            }
            if (isset($ResultModel)) {
                if ($itemToFind == 'Client')
                    $result = $ResultModel->prenom . ' ' . $ResultModel->nom;
                else
                    $result = $ResultModel->nom;
            } else
                $result = null;
            return $result;
        }
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
