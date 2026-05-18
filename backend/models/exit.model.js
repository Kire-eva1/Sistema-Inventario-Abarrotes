const db = require('../db');
const Producto = require('./producto.model'); // Necesario para actualizar el stock del producto

class Exit {
    static async create(producto_id, cantidad, fecha_salida, tipo_salida, usuario_id) {
        // Para verificar si hay suficiente stock
        const producto = await Producto.getById(producto_id);
        if (!producto || producto.stock_actual < cantidad) {
            throw new Error('Stock insuficiente para la salida.');
        }

        const [result] = await db.execute(
            'INSERT INTO salidas_inventario (producto_id, cantidad, fecha_salida, tipo_salida, usuario_id) '
            + 'VALUES (?, ?, ?, ?, ?)',
            [producto_id, cantidad, fecha_salida, tipo_salida, usuario_id]
        );
        // Actualizar el stock_actual del producto (restar)
        await Producto.updateStock(producto_id, -cantidad);
        return result.insertId;
    }

    static async getAll() {
        const [rows] = await db.execute(
            'SELECT si.*, p.nombre as producto_nombre, u.usuario as usuario_nombre '
            + 'FROM salidas_inventario si '
            + 'JOIN productos p ON si.producto_id = p.id '
            + 'JOIN usuarios u ON si.usuario_id = u.id'
        );
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.execute(
            'SELECT si.*, p.nombre as producto_nombre, u.usuario as usuario_nombre '
            + 'FROM salidas_inventario si '
            + 'JOIN productos p ON si.producto_id = p.id '
            + 'JOIN usuarios u ON si.usuario_id = u.id '
            + 'WHERE si.id = ?',
            [id]
        );
        return rows[0];
    }
}

module.exports = Exit;