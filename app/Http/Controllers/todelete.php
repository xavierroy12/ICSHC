const id_user = localStorage.getItem('id_user') || 'unknown'; // retrieve id_user from local storage, default to
'unknown';

'X-User-Action-Id': id_user // send the user id in a custom header