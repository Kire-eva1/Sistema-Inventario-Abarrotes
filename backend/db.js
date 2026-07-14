require("dotenv").config();
console.log("HOST:", process.env.DB_HOST);
console.log("USER:", process.env.DB_USER);
console.log("PASS:", process.env.DB_PASS);
console.log("DB:", process.env.DB_NAME);

const mysql = require("mysql2");

// Crear pool de conexiones
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Verificar conexión
pool.getConnection((err, connection) => {

    if (err) {
        console.error("Error de conexión a MySQL:", err.message);
        return;
    }

    console.log(`Conectado a MySQL: ${process.env.DB_NAME}`);

    connection.release();

});

// Exportar conexión con soporte Promise
module.exports = pool.promise();