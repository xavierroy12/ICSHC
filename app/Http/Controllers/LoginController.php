<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{



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

        //Function to show attribute of that DN
        function showattrib($ad, $userdn, $attrib) {

            $attributes = array($attrib);
            $result = ldap_read($ad, $userdn, "(objectclass=*)", $attributes);
            if ($result === FALSE) { return FALSE; };
            $entries = ldap_get_entries($ad, $result);
            return $entries[0][$attrib][0];
            }

        function getOUs($userdn) {
            $ous = array();
            $dn_parts = ldap_explode_dn($userdn, 0);
            for ($i = 0; $i < $dn_parts['count']; $i++) {
                $part = $dn_parts[$i];
                if (strpos($part, 'OU=') === 0) {
                    $ou = substr($part, 3);
                    array_push($ous, $ou);
                }
            }
            return $ous;
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
            $result = showattrib($ad, $userdn, "title");
            $memberof = showattrib($ad, $userdn, "memberof");
            $ous = getOUs($userdn);

            return response()->json([
                'userdn' => $userdn,
                /*'user' => $user,

                'title' => $result,
                'MemberOf' => $memberof,
                'OUs' => $ous*/
            ], 200);
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
