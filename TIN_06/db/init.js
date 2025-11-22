const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('mydb.db',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    err => {
        if(err) console.error(err.message);
        console.log('Connected to the Database');
    });

db.serialize(() => {
    // Create brand table
    db.run(`
        CREATE TABLE IF NOT EXISTS brand (
                                             id INTEGER PRIMARY KEY AUTOINCREMENT,
                                             name TEXT NOT NULL
        )
    `);

    // Clear existing data
    db.run('DELETE FROM brand');

    // Insert brands
    const brandInsert = db.prepare('INSERT INTO brand (name) VALUES (?)');

    const brands = ['Toyota', 'Nissan', 'Infinity', 'Mazda', 'Honda', 'Lexus'];
    brands.forEach((name) => {
        brandInsert.run(name);
    });
    brandInsert.finalize();

    // Create vehicle table
    db.run(`
        CREATE TABLE IF NOT EXISTS vehicle (
                                               id INTEGER PRIMARY KEY AUTOINCREMENT,
                                               model TEXT NOT NULL,
                                               year INTEGER NOT NULL,
                                               price REAL NOT NULL,
                                               brand_id INTEGER NOT NULL,
                                               FOREIGN KEY (brand_id) REFERENCES brand(id)
            )
    `);

    // Insert some sample vehicles
    const vehicleInsert = db.prepare('INSERT INTO vehicle (model, year, price, brand_id) VALUES (?, ?, ?, ?)');

    // Sample vehicles data
    const vehicles = [
        { model: 'Camry', year: 2022, price: 25000, brand_id: 1 }, // Toyota
        { model: 'Altima', year: 2023, price: 27000, brand_id: 2 }, // Nissan
        { model: 'Q50', year: 2023, price: 45000, brand_id: 3 }, // Infinity
        { model: 'CX-5', year: 2022, price: 32000, brand_id: 4 }, // Mazda
        { model: 'Civic', year: 2023, price: 23000, brand_id: 5 }, // Honda
        { model: 'RX 350', year: 2023, price: 52000, brand_id: 6 } // Lexus
    ];

    vehicles.forEach((vehicle) => {
        vehicleInsert.run(vehicle.model, vehicle.year, vehicle.price, vehicle.brand_id);
    });
    vehicleInsert.finalize();

    console.log("Tables created + dictionary filled with sample data.");

    // Verify the data.....
    db.all("SELECT * FROM brand", (err, brands) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Brands in database:", brands);
        }
    });

    db.all(`SELECT v.*, b.name as brand_name
            FROM vehicle v
                     JOIN brand b ON v.brand_id = b.id`, (err, vehicles) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Vehicles in database:", vehicles);
        }


        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Database connection closed.');
        });
    });
});