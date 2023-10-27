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
        error_log("CookieTOken  $token");
        $decryptedToken = Crypt::decryptString($token);
        $tokenWithChar =  $token . "==";




        
        $utilisateur = Utilisateur::where('token', $tokenWithChar)->first();

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
    public function show(Utilisateur $utilisateur)
    {
        //
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
    public function update(Request $request, Utilisateur $utilisateur)
    {
        //
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Utilisateur $utilisateur)
    {
        //
    }
}
