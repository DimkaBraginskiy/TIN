var express = require('express');
var router = express.Router();
var db = require('../db/db');

// list all vehicles
router.get('/', (req, res) => {
    db.getAllVehicles(function(vehicles) {
        res.render('vehicles', { vehicles });
    });
});

// show add form
router.get('/add', (req, res) => {
    db.getAllBrands(function(brands) {
        res.render('add', { brands, errors: [] });
    });
});

// handle add form submission.....
router.post('/add', (req, res) => {
    const { model, year, price, brand_id } = req.body;

    let errors = [];

    // Basic backend validation
    if (!model || model.trim() === "") errors.push("Model is required");
    if (!year || isNaN(year)) errors.push("Year must be a valid number");
    if (!price || isNaN(price)) errors.push("Price must be a valid number");
    if (!brand_id) errors.push("Brand must be selected");

    if (errors.length > 0) {
        // reload form with errors and repopulate dropdown
        return db.getAllBrands(function(brands) {
            res.render('add', { brands, errors });
        });
    }

    // Insert new vehicle:
    db.insertVehicle(
        { model, year, price, brand_id },
        function(success) {
            if (success) res.redirect('/vehicles');
            else res.send("Insert failed");
        }
    );
});

router.get('/edit/:id', (req, res) => {
    const vehicleId = req.params.id;

    db.getVehicle(vehicleId, function(vehicle) {
        if(!vehicle) return res.redirect('Vehicle not found');

        db.getAllBrands(function(brands) {
            res.render('edit', { vehicle, brands, errors: [] });
        });
    });
});

// editing a vehicle:
router.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { model, year, price, brand_id } = req.body;

    let errors = [];

    // Backend validation
    if (!model || model.trim() === "") errors.push("Model is required");
    if (!year || isNaN(year)) errors.push("Year must be a valid number");
    if (!price || isNaN(price)) errors.push("Price must be a valid number");
    if (!brand_id) errors.push("Brand must be selected");

    if (errors.length > 0) {
        // reload form with previous values
        return db.getAllBrands(function(brands) {
            res.render('edit', {
                vehicle: { id, model, year, price, brand_id },
                brands,
                errors
            });
        });
    }

    // perform SQL update
    db.updateVehicle(
        { id, model, year, price, brand_id },
        function(success) {
            if (success) res.redirect('/vehicles');
            else res.send("Update failed");
        }
    );
});

// getting info about vehicle we want to delete
router.get('/delete/:id', (req, res) => {
    const id = req.params.id;

    db.getVehicle(id, function(vehicle) {
        if (!vehicle) return res.send("Vehicle not found");

        res.render('delete', { vehicle });
    });
});

//vehicle deletion
router.post('/delete/:id', (req, res) => {
    const vehicleId = req.params.id;

    db.deleteVehicle(vehicleId, function(success) {
        if (success) res.redirect('/vehicles');
        else res.send("Deletion failed! ;(((");
    })
})


module.exports = router;
