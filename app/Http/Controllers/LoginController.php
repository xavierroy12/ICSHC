<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{


    public function checkLogin(Request $request)
    {
        $user = $request->input('username');
        $password = $request->input('password');

        function getDN($ad, $samaccountname, $basedn) {
            $attributes = array('dn');
            $result = ldap_search($ad, $basedn,
                "(samaccountname={$samaccountname})", $attributes);
            if ($result === FALSE) { return ''; }
            $entries = ldap_get_entries($ad, $result);
            if ($entries['count']>0) { return $entries[0]['dn']; }
            else { return ''; };
        }

        $domain = 'cshc.qc.ca';
        $basedn = 'dc=cshc,dc=qc,dc=ca';
        $group = 'TechInfo-GLPI';

        $ad = ldap_connect("ldap://{$domain}");
        ldap_set_option($ad, LDAP_OPT_PROTOCOL_VERSION, 3);
        ldap_set_option($ad, LDAP_OPT_REFERRALS, 0);
        if (@ldap_bind($ad, "{$user}@{$domain}", $password)) {
            error_log("LDAP bind successful for user: $user");
            $userdn = getDN($ad, $user, $basedn);
            return response()->json([
                'message' => 'info user : '. $userdn,
                'user' => $user
            ], 200);
            //This is to check if cbind is succesfull
            /*return response()->json([
                'message' => 'Login successful',
                'user' => $user
            ], 200);*/
        }
        else {
            error_log("LDAP bind failed for user: $user");
            return response()->json([
                'message' => 'Invalid username or password'
            ], 401);
        }


      //  function getCN($dn) {
         //   preg_match('/[^,]*/', $dn, $matchs, PREG_OFFSET_CAPTURE, 3);
        //    return $matchs[0][0];
       // }

        error_log("Username: $user, Password: $password");

    }
}
