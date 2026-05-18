const db = require('../db');

class Role {
    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM roles');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.execute('SELECT * FROM roles WHERE id = ?', [id]);
        return rows[0];
    }
}

module.exports = Role;