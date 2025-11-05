const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("formD", { errors: [], formData: {} });
});

router.post("/calculate", (req, res) => {
    const { resolution, refreshRate, colorDepth } = req.body;
    const errors = [];

    // Using regex here for validating eg 1980x1080 .... etc: hope that fills the requirements...
    const resolutionRegex = /^(\d{3,5})x(\d{3,5})$/;
    const match = resolutionRegex.exec(resolution.trim());

    if (!match) {
        errors.push("Resolution must be in format WIDTHxHEIGHT, e.g. 1920x1080.");
    }


    const refresh = parseFloat(refreshRate);
    const depth = parseFloat(colorDepth);

    if (isNaN(refresh) || refresh <= 0) {
        errors.push("Refresh rate must be a positive number (e.g. 144).");
    }


    if (isNaN(depth) || depth <= 0) {
        errors.push("Color depth must be a positive number (e.g. 24).");
    }


    if (errors.length > 0) {
        return res.render("formD", {
            errors,
            formData: { resolution, refreshRate, colorDepth },
        });
    }


    const width = parseInt(match[1]);
    const height = parseInt(match[2]);


    // calculatign our vales:
    const totalPixels = width * height;
    const pixelsPerSecond = totalPixels * refresh;
    const bitsPerSecond = pixelsPerSecond * depth;


    res.render("resultD", {
        resolution,
        refreshRate: refresh,
        colorDepth: depth,
        totalPixels: totalPixels.toLocaleString(),
        pixelsPerSecond: pixelsPerSecond.toLocaleString(),
        bitsPerSecond: bitsPerSecond.toLocaleString(),
    });
});

module.exports = router;
