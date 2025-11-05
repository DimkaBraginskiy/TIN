const form = document.getElementById("valuesForm");

form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    validateForm();
});

function validateForm(){
    let isValid = true;

    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const birthdate = document.getElementById("birthdate").value;

    const emailError = document.getElementById("emailError");
    const usernameError = document.getElementById("usernameError");
    const birthdateError = document.getElementById("birthdateError");

    const successMessage = document.getElementById("successMessage");

    emailError.textContent = "";
    usernameError.textContent = "";
    birthdateError.textContent = "";

    successMessage.textContent = "";

    if(!validateEmail(email, emailError)) isValid = false;
    if(!validateUsername(username, usernameError)) isValid = false;
    if(!validateBirthdate(birthdate, birthdateError)) isValid = false;
    console.log("isValid:"+isValid);

    if (isValid) {
        document.querySelector('.header h3').textContent = `Welcome, ${username}!`;

        // Calculating age based on provided value: ...
        const birthDate = new Date(birthdate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        // profile minimal preview...
        const profileCard = document.getElementById('profileCard');
        document.getElementById('displayEmail').textContent = email;
        document.getElementById('displayAge').textContent = `${age} years old`;
        profileCard.style.display = 'block';

        // hiding success message
        successMessage.textContent = "";
    }

    return isValid;
}

function validateEmail(email, error){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(email)){
        error.textContent = "Please enter a valid email";
        return false;
    }else {
        error.textContent = "";
        return true;
    }
}

function validateUsername(username, error){
    if(username == "" || username.length == 0){
        error.textContent = "Invalid: Username can not be empty";
        return false;
    }else{
        return true;
    }
}

function validateBirthdate(birthdate, error){
    if(!birthdate){
        error.textContent = "Invalid: Birthdate can not be empty";
        return false;
    }

    const selectedDate = new Date(birthdate);
    const now = new Date();

    // removing hours to compare only days instead of hours to follow proper validation
    selectedDate.setHours(0,0,0,0);
    now.setHours(0,0,0,0);

    console.log("selectedDate", selectedDate);
    console.log("now", now);

    if(selectedDate > now){
        error.textContent = "Invalid: Birthdate can not be in the future";
        return false;
    }

    return true;
}

// clearing all contents of the tab........ :
document.getElementById('resetBtn').addEventListener('click', function() {
    document.getElementById('valuesForm').reset();
    document.querySelectorAll('.error').forEach(e => e.textContent = '');
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('profileCard').style.display = 'none';
    document.querySelector('.header h3').textContent = 'Field inputting page';
});