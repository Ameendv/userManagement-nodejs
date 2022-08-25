
$(document).ready( function () {
    $('#userList').DataTable();
    
} );
let password=document.getElementById("password");
let button=document.getElementById("EnableButton");

if(button)
{
    password.disabled=true
    button.addEventListener('click',()=>{
        if(password.disabled===true)
        {
            password.disabled=false;
            button.textContent="Disable"
            button.style.background="red"
        }
        else{
            password.disabled=true;
            button.textContent="Enable"
            button.style.background="green"
        }
    })
}