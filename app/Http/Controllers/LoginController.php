<?php

namespace App\Http\Controllers;


use App\Http\Controllers\UtilisateurController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Carbon\Carbon; // Import the Carbon class



class LoginController extends Controller
{
    //doesnt work
    private function createCookie($user)
    {
        $cookie = cookie('user', $user, 60);
        $_COOKIE['user'] = $user;
        return $cookie;
    }
    //creates a encryprted token and expiration date
    public static function generateToken()
    {
        $token = bin2hex(random_bytes(30)); // Generate a random token
        $expiration = Carbon::now()->addDays(30); // Set expiration to 30 days from now
        $encryptedToken = Crypt::encryptString($token);
        return [
            'token' => $encryptedToken,
            'expiration' => $expiration,
        ];
    }

    public function checkToken(Request $request)
    {
        $token = $request->input('token'); // Get the token from the request

        $utilisateur = new UtilisateurController();
        $utilisateur = $utilisateur->tokenExists($token); // Get the user by the token

        if ($utilisateur["valid_token"]) {
            // Token is valid, return the user information
            return response()->json([
                'success' => true,
                'user' => $utilisateur
            ], 200);
        } else {
            // Token is invalid, return an error message
            return response()->json([
                'success' => false,
                'message' => 'Invalid token'
            ], 401);
        }
    }



    public function checkLogin(Request $request)
    {
        //Get User and Password from login request
        $user = $request->input('username');
        $password = $request->input('password');

        //Function to get the DN of the user
        function getDN($ad, $samaccountname, $basedn)
        {
            $attributes = array('dn');
            $result = ldap_search(
                $ad,
                $basedn,
                "(samaccountname={$samaccountname})",
                $attributes
            );
            if ($result === FALSE) {
                return '';
            }
            $entries = ldap_get_entries($ad, $result);
            if ($entries['count'] > 0) {
                return $entries[0]['dn'];
            } else {
                return '';
            }
            ;
        }

        function getDnGroup($ad, $group, $basedn)
        {
            $result = ldap_search($ad, $basedn, "(cn={$group})", array('cn'));
            if ($result === FALSE) {
                return '';
            }
            $entries = ldap_get_entries($ad, $result);
            if ($entries['count'] > 0) {
                return $entries[0]['dn'];
            } else {
                return '';
            }
            ;
        }

        //Function to show attribute of that DN, mostly for trouble shooting
        function showattrib($ad, $userdn, $attrib)
        {
            $attributes = array($attrib);
            $result = ldap_read($ad, $userdn, "(objectclass=*)", $attributes);
            if ($result === FALSE) {
                return FALSE;
            }
            ;
            $entries = ldap_get_entries($ad, $result);
            return $entries[0][$attrib][0];
        }
        //Function to add user to database, store function check if user already exist
        function addUserDb($ad, $userdn, $user, $nom)
        {


            $utilisateur = new UtilisateurController();
            //If user exist, check if token is expired, if not return false
            if ($utilisateur->userExists($user)) {
                $token = LoginController::generateToken();
                error_log("testLineTest");
                $userFinal = $utilisateur->updateToken($user, $token['token'], $token['expiration']);
                return $userFinal;
            } else {
                $token = LoginController::generateToken();
                $test = $token['token'];
                $email = showattrib($ad, $userdn, 'extensionattribute3');
                $userFinal = $utilisateur->store($user, $nom, $token['token'], $token['expiration'], $email);

                return $userFinal;
            }
        }

        //Variables for LDAP connection
        $domain = 'cshc.qc.ca';
        $basedn = 'dc=cshc,dc=qc,dc=ca';
        $group = 'TechInfo-GLPI';

        //LDAP connection
        $ad = ldap_connect("ldap://{$domain}");
        ldap_set_option($ad, LDAP_OPT_PROTOCOL_VERSION, 3);
        ldap_set_option($ad, LDAP_OPT_REFERRALS, 0);
        if (@ldap_bind($ad, "{$user}@{$domain}", $password)) {
            //info of user in ldap
            $userdn = getDN($ad, $user, $basedn);
            $usercn = showattrib($ad, $userdn, 'cn');
            $groupdn = getDN($ad, $group, $basedn);
            $result = ldap_read($ad, $userdn, "(memberof={$groupdn})", array('dn'));
            $email = showattrib($ad, $userdn, 'extensionattribute3');
            error_log("User $user email is $email");
            $entries = ldap_get_entries($ad, $result);

            // If user in group, create cookie and return user info
            if ($entries['count'] > 0) {
                error_log("User $user is in group $group");


                $userFinal = addUserDb($ad, $userdn, $user, $usercn);
                error_log("line 156");
                $cookie = $this->createCookie($user);
                $response = response()->json([
                    'user' => $user,
                    'usercn' => $usercn,
                    'token' => $userFinal->token,
                    'emplacement' => $userFinal->id_emplacement,
                    'id' => $userFinal->id,
                    'id_role' => $userFinal->id_role,
                ], 200);


                $response->withCookie($cookie);
                return $response;

            }
            // If user not in group, return error
            else {
                return response()->json([
                    'message' => 'User not in group'
                ], 401);
            }
        }
        // If LDAP bind failed, return error
        else {
            return response()->json([
                'message' => 'Invalid username or password'
            ], 401);
        }
    }
}
