const express = require("express");
const router = express.Router();

// GET – show form
router.get("/", (req, res) => {
    res.render("formBC", { errors: [], formData: {} });
});

// POST – handle submission
router.post("/submit", (req, res) => {
    const { phoneNumber, fullname, text } = req.body;
    const errors = [];

    const phoneRegex = /^\+\d{1,3}(\s?\d{3}){3}$/;
    if (!phoneNumber || !phoneRegex.test(phoneNumber.trim())) {
        errors.push("Phone number must match +123 456 789 123 format!!!");
    }

    if (!fullname || fullname.trim().split(" ").length < 2) {
        errors.push("Full name must include at least first and last name.");
    }

    if (!text || text.trim().length < 5) {
        errors.push("Text must be at least 5 characters long.");
    }

    if (errors.length > 0) {
        return res.render("formBC", { errors, formData: { phoneNumber, fullname, text } });
    }

    res.render("resultBC", { phoneNumber, fullname, text });
});

module.exports = router;
