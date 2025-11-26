const form = document.getElementById("userForm");

form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    validateForm();
});

function validateForm(){
    let isValid = true;

    const username = document.getElementById("username").value.trim();
    const birthdate = document.getElementById("birthdate").value;
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();


    const usernameError = document.getElementById("usernameError");
    const birthdateError = document.getElementById("birthdateError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const successMessage = document.getElementById("successMessage");
    const profileCard = document.getElementById("profileCard");

    usernameError.textContent = "";
    birthdateError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    successMessage.textContent = "";
    document.getElementById('successMessage').textContent = '';
    document.getElementById('successMessage').style.backgroundColor = '';


    if(!validateUsername(username, usernameError)) isValid = false;
    if(!validateBirthdate(birthdate, birthdateError)) isValid = false;
    if(!validateEmail(email, emailError)) isValid = false;
    if(!validatePassword(password, passwordError)) isValid = false;

    console.log("isValid:"+isValid);

    if (isValid) {
        fetch("/validate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password, birthdate })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    // show success block
                    successMessage.textContent = data.result.message;
                    document.getElementById("displayEmail").textContent = data.result.email;
                    document.getElementById("displayAge").textContent = data.result.age;
                    document.getElementById("welcomeTitle").textContent = `Welcome, ${username}`;
                    profileCard.style.display = "block";
                    successMessage.style.backgroundColor = "green";
                    successMessage.style.color = "white";
                } else {
                    // show data.error
                    successMessage.textContent = data.errors.join('\n');
                    successMessage.style.backgroundColor = "red";
                    successMessage.style.color = "white";
                }
            })
            .catch(err => {
                console.log(err);
                successMessage.textContent = "Error occurred. Please try again";
                successMessage.style.backgroundColor = "red";
                successMessage.style.color = "white";
            })
    }

    return isValid;
}

function validatePassword(password, error) {
    const lowercaseRegex = /[a-z]/g;
    const uppercaseRegex = /[A-Z]/g;
    const numberRegex = /[0-9]/g;
    const symbolRegex = /[!@#$%^&*]/g;

    if(password.length === 0){
        error.textContent = "Password can not be empty.";
        return false;
    }

    if(password.length < 6){
        error.textContent = "Password must contain at least 6 characters";
        return false;
    }

    if (!lowercaseRegex.test(password)) {
        error.textContent = "Password must contain at least one lowercase letter.";
        return false;
    }

    if (!uppercaseRegex.test(password)) {
        error.textContent = "Password must contain at least one uppercase letter.";
        return false;
    }

    if (!symbolRegex.test(password)) {
        error.textContent = "Password must contain at least one special symbol.";
        return false;
    }

    if (!numberRegex.test(password)) {
        error.textContent = "Password must contain at least one digit.";
        return false;
    }

    error.textContent = "";
    return true;
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
    if(username === "" || username.length === 0){
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

    // removing hours to compare only days instead of hours to follow proper validation.....
    selectedDate.setHours(0,0,0,0);
    now.setHours(0,0,0,0);

    console.log("selectedDate", selectedDate);
    console.log("now", now);

    if(selectedDate > now){
        error.textContent = "Invalid: Birthdate can not be in the future";
        return false;
    }

    if(selectedDate < '1900'){}

    error.textContent = "";
    return true;
}

// clearing all contents of the tab........ :
document.getElementById('resetBtn').addEventListener('click', function() {
    document.getElementById('userForm').reset();
    document.querySelectorAll('.error').forEach(e => e.textContent = '');
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('profileCard').style.display = 'none';
    document.querySelector('.header h3').textContent = 'Field inputting page';
});