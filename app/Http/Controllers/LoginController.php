<?php

namespace App\Http\Controllers;

use App\Http\Controllers\UtilisateurController;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    //doesnt work
    private function createCookie($user) {
        $cookie = cookie('user', $user, 60);
        $_COOKIE['user'] = $user;
        return $cookie;
    }
    //create a token to be stored in a cookie on the client side
    private function generateToken() {
        $token = bin2hex(random_bytes(30)); // Generate a random token
        $expiration = Carbon::now()->addDays(30); // Set expiration to 30 days from now
        $encryptedToken = Crypt::encryptString($token);
        return [
            'token' => $encryptedToken,
            'expiration' => $expiration,
        ];
    }


    public function checkLogin(Request $request)
    {
        //Get User and Password from login request
        $user = $request->input('username');
        $password = $request->input('password');

        //Function to get the DN of the user
        function getDN($ad, $samaccountname, $basedn) {
            $attributes = array('dn');
            $result = ldap_search($ad, $basedn,
            "(samaccountname={$samaccountname})", $attributes);
            if ($result === FALSE) { return ''; }
            $entries = ldap_get_entries($ad, $result);
            if ($entries['count']>0) { return $entries[0]['dn']; }
            else { return ''; };
        }

        function getDnGroup($ad, $group, $basedn) {
            $result = ldap_search($ad, $basedn, "(cn={$group})", array('cn'));
            if ($result === FALSE) { return ''; }
            $entries = ldap_get_entries($ad, $result);
            if ($entries['count'] > 0) { return $entries[0]['dn']; }
            else { return ''; };
        }

        //Function to show attribute of that DN, mostly for trouble shooting
        function showattrib($ad, $userdn, $attrib) {
            $attributes = array($attrib);
            $result = ldap_read($ad, $userdn, "(objectclass=*)", $attributes);
            if ($result === FALSE) { return FALSE; };
            $entries = ldap_get_entries($ad, $result);
            return $entries[0][$attrib][0];
        }
        //Function to add user to database, store function check if user already exist
        function addUserDb($user, $nom) {
            $utilisateur = new UtilisateurController();
            //If user exist, check if token is expired, if not return false
            if($utilisateur->userExists($user)){
                $token = generateToken();
                $utilisateur->updateToken($user, $token['token'], $token['expiration']);
                return $token;
            }
            else {
                $token = generateToken();
                $utilisateur->store($user, $nom, $token['token'], $token['expiration']);
                error_log("User $user added to database");
                return $token;
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
            error_log("LDAP bind successful for user: $user");
            $userdn = getDN($ad, $user, $basedn);
            $usercn = showattrib($ad, $userdn, 'cn');
            $groupdn = getDN($ad, $group, $basedn);

            $result = ldap_read($ad, $userdn, "(memberof={$groupdn})", array('dn'));
            $entries = ldap_get_entries($ad, $result);
            // If user in group, create cookie and return user info
            if ($entries['count'] > 0) {
                $token = addUserDb($user, $usercn)


                /*else {
                    // troubleshooting purpose

                        $groupcn = showattrib($ad, getDnGroup($ad, $group, $basedn), 'cn');
                        if ($groupcn === 'TechInfo-GLPI') {
                            error_log($groupcn);
                            error_log("User $user is a member  wich is TechInfo-GLPI");
                        }

                    error_log("User $user already in database");
                }*/

                    $cookie = $this->createCookie($user);
                    $response = response()->json([
                        'user' => $user,
                        'usercn' => $usercn,
                        'token' => $token['token'],
                        'expiration' => $token['expiration'],

                    ], 200);
                    $response->withCookie($cookie);
                    return $response;

                }
                // If user not in group, return error
                else {
                    error_log("User $user not in group $group");
                    return response()->json([
                        'message' => 'User not in group'
                    ], 401);
                }
            }
            // If LDAP bind failed, return error
            else {
                error_log("LDAP bind failed for user: $user");
                return response()->json([
                    'message' => 'Invalid username or password'
                ], 401);
            }
        }
    }
