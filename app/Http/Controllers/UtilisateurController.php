<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Crypt;
use App\Models\Utilisateur;
use Illuminate\Http\Request;

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
    public function store($nom_utilisateur, $nom, $token, $expiry)
    {
        if ($this->userExists($nom_utilisateur)) {
            return FALSE;
        } else {
            $utilisateur = new Utilisateur();
            $utilisateur->nom_utilisateur = $nom_utilisateur;
            $utilisateur->nom = $nom;
            $utilisateur->token = $token;
            $utilisateur->expiration = $expiry;
            $utilisateur->save();
            return $utilisateur;
        }
    }

    public function updateToken($nom_utilisateur, $token, $expiry)
    {
        if ($this->userExists($nom_utilisateur)) {
            $decryptedToken = Crypt::decryptString($token);
            $utilisateur = Utilisateur::where('nom_utilisateur', $nom_utilisateur)->first();
            $utilisateur->token = $decryptedToken;
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
        error_log("token in utilisateurcontroller $token");
        $decryptedToken = Crypt::decryptString($token);
        error_log($decryptedToken);
        $utilisateur = Utilisateur::where('token', $decryptedToken)->first();
        error_log("user : $utilisateur");
        if ($utilisateur) {
            $expiry = strtotime($utilisateur->expiration);
            $now = time();
            if ($expiry < $now) {
                // Token has expired
                return FALSE;
            } else {
                // Token is valid
                return TRUE;
            }
        } else {
            return FALSE;
        }

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
        $utilisateurs = Utilisateur::with(['emplacement', 'role'])->get()->map(function ($utilisateur) {
            return [
                'id' => $utilisateur->id,
                'nom' => $utilisateur->nom,
                'emplacement' => $utilisateur->emplacement->nom,
                'role' => $utilisateur->role->nom,
            ];
        });
        return response()->json($utilisateurs);
    }
}
