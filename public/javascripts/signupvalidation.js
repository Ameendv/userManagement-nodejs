$(document).ready(function (){
    $("#userSignup").validate({
        rules:
        {
            name:{
                required:true,
                minlength:4,
                maxlength:20

            },
            email:{
                required:true,
                email:true,

            },
            password:{
                required:true,
                minlength:3
            }
        }
    })
})


$(document).ready(function (){
    $("#userLogin").validate({
        rules:
        {
          
            email:{
                required:true,
                email:true,

            },
            password:{
                required:true,
                minlength:3
            }
        }
    })
})


$(document).ready(function (){
    $("#adminLogin").validate({
        rules:
        {
          
            email:{
                required:true,
                email:true,

            },
            password:{
                required:true,
                minlength:3
            }
        }
    })
})

