const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234qWeR#', // ← mi contraseña MySQL Workbench
    database: 'abarrotes_db'
});

db.connect((err) => {
    if (err) {
        console.error("Error de conexión:", err);
        return;
    }
    console.log("Conectado a MySQL");
});

module.exports = db;