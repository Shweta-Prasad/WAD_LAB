$(document).ready(function(){
    const form = $("#reg_Form");
    $("#sub").click( function() {

        // Get user input
        const user = {
            name: $("#name").val(),
            email: $("#email").val(),
            mobile: $("#mobile").val(),
        };

        // Store in local storage
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        alert("User Registered Successfully!");
        form.reset();
    });
});