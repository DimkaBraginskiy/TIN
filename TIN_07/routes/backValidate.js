const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { username, email, password, birthdate } = req.body;

    const errors = [];

    // Username validation
    if (!username || username.trim().length === 0) {
        errors.push("Username cannot be empty");
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || email.trim().length === 0) {
        errors.push("Email cannot be empty");
    } else if (!emailRegex.test(email)) {
        errors.push("Please enter a valid email");
    }

    // Birthdate validation
    if (!birthdate) {
        errors.push("Birthdate cannot be empty");
    } else {
        const selectedDate = new Date(birthdate);
        const now = new Date();

        // Remove hours to compare only dates
        selectedDate.setHours(0, 0, 0, 0);
        now.setHours(0, 0, 0, 0);

        console.log("selectedDate", selectedDate);
        console.log("now", now);

        if (selectedDate > now) {
            errors.push("Birthdate cannot be in the future");
        }
    }

    // Password validation
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const symbolRegex = /[!@#$%^&*]/;

    if (!password || password.length === 0) {
        errors.push("Password cannot be empty");
    } else {
        if (password.length < 6) {
            errors.push("Password must contain at least 6 characters");
        }
        if (!lowercaseRegex.test(password)) {
            errors.push("Password must contain at least one lowercase letter");
        }
        if (!uppercaseRegex.test(password)) {
            errors.push("Password must contain at least one uppercase letter");
        }
        if (!symbolRegex.test(password)) {
            errors.push("Password must contain at least one special symbol (!@#$%^&*)");
        }
        if (!numberRegex.test(password)) {
            errors.push("Password must contain at least one digit");
        }
    }

    // Check if there are any errors
    if (errors.length > 0) {
        return res.json({
            success: false,
            errors: errors
        });
    }

    // If validation passes - calculate age and return success:
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    const result = {
        message: `Registration successful! Welcome ${username}!`,
        age: age,
        email: email
    };

    res.json({
        success: true,
        result: result
    });
});

module.exports = router;