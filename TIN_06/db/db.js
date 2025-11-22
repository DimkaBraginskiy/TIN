const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('mydb.db',
    err => {
    if (err) console.error(err.message);
    else console.log('Connected to database for queries');
});

module.exports = {

    db,

    getAllVehicles: function(callback) {
        const sql = `
            SELECT v.*, b.name AS brand_name
            FROM vehicle v
            JOIN brand b ON v.brand_id = b.id
        `;
        db.all(sql,
            [],
            (err, rows) => {

            if (err) {
                console.error(err);
                callback([]);
            } else {
                callback(rows);
            }
        });
    },

    getVehicle: function(id, callback) {
        const sql = `
            SELECT v.*, b.name AS brand_name
            FROM vehicle v
                     JOIN brand b ON v.brand_id = b.id
            WHERE v.id = ?
        `;

        db.get(sql,
            [id],
            (err, row) => {
            if (err) {
                console.error(err);
                callback(null);
            } else {
                callback(row);
            }
        });
    },

    insertVehicle: function(vehicle, callback) {
        const sql = `INSERT INTO vehicle (model, year, price, brand_id) VALUES (?, ?, ?, ?)`;

        db.run(sql, [vehicle.model, vehicle.year, vehicle.price, vehicle.brand_id], function(err) {
            if (err) {
                console.error(err);
                callback(false);
            } else {
                callback(true);
            }
        });
    },

    deleteVehicle: function(id, callback) {
        const sql = `DELETE FROM vehicle WHERE id = ?`;
        db.run(sql, [id], function(err) {
            if (err) {
                console.error(err);
                callback(false);
            } else {
                callback(true);
            }
        });
    },


    getAllBrands: function(callback) {
        const sql = `SELECT id, name FROM brand`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error(err);
                callback([]);
            } else {
                callback(rows);
            }
        });
    },

    updateVehicle: function(vehicle, callback) {
        const sql = `
        UPDATE vehicle
        SET model = ?, year = ?, price = ?, brand_id = ?
        WHERE id = ?
    `;

        db.run(sql,
            [vehicle.model, vehicle.year, vehicle.price, vehicle.brand_id, vehicle.id],
            function(err) {
                if (err) {
                    console.error(err);
                    callback(false);
                } else {
                    callback(true);
                }
            }
        );
    },
};
