const db = require('../db');

class User {
    static async getAll() {
        const [rows] = await db.execute('SELECT u.id, u.usuario, r.nombre as rol FROM usuarios u JOIN roles r ON u.rol_id = r.id');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.execute('SELECT u.id, u.usuario, r.nombre as rol FROM usuarios u JOIN roles r ON u.rol_id = r.id WHERE u.id = ?', [id]);
        return rows[0];
    }

    static async getByUsername(usuario) {
        const [rows] = await db.execute('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
        return rows[0];
    }

    static async create(usuario, password, rol_id) {
        const [result] = await db.execute('INSERT INTO usuarios (usuario, password, rol_id) VALUES (?, ?, ?)', [usuario, password, rol_id]);
        return result.insertId;
    }
}

module.exports = User;