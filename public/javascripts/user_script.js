
function validatePassword(e){
    alert("sd");
    e.preventDefault();
   if ($('#user_password').val()!=$('#password_confirm').val())
   {
       document.getElementById("error_password").innerHTML = "* Password Mismatch";
       alert("esr");
//       window.location.reload();
       return false;

   }
    else
   {
       $('new_user').submit()
       return true;

   }
}
