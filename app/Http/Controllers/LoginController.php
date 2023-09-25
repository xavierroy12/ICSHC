<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{


    public function checkLogin(Request $request)
    {
        $username = $request->input('username');
        $password = $request->input('password');

        $domain = 'cshc.qc.ca';
        $basedn = 'dc=cshc,dc=qc,dc=ca';
        $group = 'TechInfo-GLPI';

        /*$ad = ldap_connect("ldap://{$domain}") or die('Connexion impossible au serveur LDAP.');
        ldap_set_option($ad, LDAP_OPT_PROTOCOL_VERSION, 3);
        ldap_set_option($ad, LDAP_OPT_REFERRALS, 0);
        @ldap_bind($ad, "{$user}@{$domain}", $password) or die("Connexion impossible au serveur LDAP.");
        $userdn = getDN($ad, $user, $basedn);*/

        function getCN($dn) {
            preg_match('/[^,]*/', $dn, $matchs, PREG_OFFSET_CAPTURE, 3);
            return $matchs[0][0];
        }

        function getDN($ad, $samaccountname, $basedn) {
            $attributes = array('dn');
            $result = ldap_search($ad, $basedn,
                "(samaccountname={$samaccountname})", $attributes);
            if ($result === FALSE) { return ''; }
            $entries = ldap_get_entries($ad, $result);
            if ($entries['count']>0) { return $entries[0]['dn']; }
            else { return ''; };
        }

        error_log("Username: $username, Password: $password");
        return response()->json([
            'message' => "allo"
        ], 200);
    }
}
