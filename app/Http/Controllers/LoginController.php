<?php

namespace App\Http\Controllers;

use App\Http\Controllers\UtilisateurController;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    private function createCookie($user) {
        $cookie = cookie('user', $user, 60);
        return $cookie;
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

        //Function to show attribute of that DN, mostly for trouble shooting
        function showattrib($ad, $userdn, $attrib) {
            $attributes = array($attrib);
            $result = ldap_read($ad, $userdn, "(objectclass=*)", $attributes);
            if ($result === FALSE) { return FALSE; };
            $entries = ldap_get_entries($ad, $result);
            return $entries[0][$attrib][0];
        }

        function addUserDb($user, $nom) {
            $utilisateur = new UtilisateurController();
            if($utilisateur->store($user, $nom)) {
                return TRUE;
            }
            else {
                return FALSE;
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
            error_log("Line 64");
            $groupdn = getDN($ad, $group, $basedn);
            error_log("Line 66");
            $result = ldap_read($ad, $userdn, "(memberof={$groupdn})", array('dn'));
            $entries = ldap_get_entries($ad, $result);
            // If user in group, create cookie and return user info
            if ($entries['count'] > 0) {
                error_log("Line 71");
                if (addUserDb($user, $usercn)) {
                    error_log("User $user added to database");
                }
                else {
                    error_log("Result $result");
                    error_log("User $user already in database");
                }
                error_log("Line 79");
                $cookie = $this->createCookie($user);
                $response = response()->json([
                    'user' => $user,
                    'usercn' => $usercn,
                ], 200);
                error_log("Line 85");
                $response->withCookie($cookie);
                return $response;
                error_log("Line 85");
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
