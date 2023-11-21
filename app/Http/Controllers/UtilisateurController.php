<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Crypt;
use App\Models\Utilisateur;
use App\Models\Client;
use Illuminate\Http\Request;
use App\Http\Controllers\ClientController;

class UtilisateurController extends Controller
{
    /**
     * Display a listing of the resource.
     */


    public function index()
    {
        //
    }

    public function list_json()
    {
        $utilisateurs = Utilisateur::all();
        return response()->json($utilisateurs);
    }

    public function userExists($nom_utilisateur)
    {
        return Utilisateur::where('nom_utilisateur', $nom_utilisateur)->exists();
    }

    public function getEmplacementFromClient($email)
    {
        $clientController = new ClientController();
        $client = $clientController->getClientFromEmail($email);
        $emplacement = $client->id_emplacement;
        return $emplacement;
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage. checks if user exists, if not creates it.
     */
    public function store($nom_utilisateur, $nom, $token, $expiry, $email)
    {

        if ($this->userExists($nom_utilisateur)) {
            return FALSE;
        } else {
            //$id_emplacement = getEmplacementFromClient($email);
            error_log("Token is $token ");
            $clientController = new ClientController();
            $client = $clientController->getClientFromEmail($email);
            $emplacement = $client->id_emplacement;
            $utilisateur = new Utilisateur();
            $utilisateur->nom_utilisateur = $nom_utilisateur;
            $utilisateur->nom = $nom;
            $utilisateur->token = $token;
            $utilisateur->expiration = $expiry;
            $utilisateur->courriel = $email;
            $utilisateur->id_emplacement = $emplacement;
            $utilisateur->save();
            return $utilisateur;
        }
    }
    //Takes the username and the token and updates the token and expiry date
    public function updateToken($nom_utilisateur, $token, $expiry)
    {
        if ($this->userExists($nom_utilisateur)) {
            $utilisateur = Utilisateur::where('nom_utilisateur', $nom_utilisateur)->first();
            $utilisateur->token = $token;
            $utilisateur->expiration = $expiry;
            $utilisateur->save();
            return $utilisateur;
        } else {
            return FALSE;
        }
    }
    //Verifiy if the token exists in the database
    public function tokenExists($token)
    {
        $tokenWithChar =  $token . "==";

        $utilisateur = Utilisateur::where('token', $tokenWithChar)->first();

        if ($utilisateur) {
            $expiry = strtotime($utilisateur->expiration);
            $now = time();
            if ($expiry < $now) {
                // Token has expired
                return [
                    'valid_token' => FALSE,
                    'is_admin' => $utilisateur->id_role == 1 ? TRUE : FALSE,
                ];            } else {
                // Token is valid
                return [
                    'valid_token' => TRUE,
                    'is_admin' => $utilisateur->id_role == 1 ? TRUE : FALSE,
                ];
            }
        } else {
            return [
                'valid_token' => FALSE,
                'is_admin' => $utilisateur->id_role == 1 ? TRUE : FALSE,
            ];        }

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $data = Utilisateur::find($id);

        $utilisateur = [
            'id' => $data->id,
            'nom' => $data->nom,
            'id_emplacement' => $data->id_emplacement,
            'id_role' => $data->id_role,
        ];

        return response()->json($utilisateur);
    }

    public function showall()
    {
        $utilisateurs = Utilisateur::all();
        return response()->json($utilisateurs);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Utilisateur $utilisateur)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $utilisateur = Utilisateur::findOrFail($id);

        $data = $request->all();

        $utilisateur->update($data);
        if ($utilisateur->save()) {
            // Return a success response
            return response()->json(['message' => 'Utilisateur mis à jour avec succès'], 200);
        } else {
            // Return an error response
            return response()->json(['message' => "Erreur lors de la mise à jour de l'utilisateur"], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Utilisateur $utilisateur)
    {
        //
    }
    public function showList()
    {
        error_log("showList");
        $utilisateurs = Utilisateur::with(['emplacement', 'role'])->get()->map(function ($utilisateur) {
            return [
                'id' => $utilisateur->id,
                'nom' => $utilisateur->nom,
                'emplacement' => $utilisateur->emplacement->matricule. " - " .$utilisateur->emplacement->nom,
                'role' => $utilisateur->role->nom,
            ];
        });
        return response()->json($utilisateurs);
    }
}
