const db = require("../db");

class Supplier {

    static async getAll() {
        const [rows] = await db.execute(
            "SELECT * FROM proveedores"
        );
        return rows;
    }

    static async create(nombre, contacto, telefono, email) {

        const [result] = await db.execute(
            `INSERT INTO proveedores
            (nombre, contacto, telefono, email)
            VALUES (?, ?, ?, ?)`,
            [nombre, contacto, telefono, email]
        );

        return result.insertId;
    }
}

module.exports = Supplier;