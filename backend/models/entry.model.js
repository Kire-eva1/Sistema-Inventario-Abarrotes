const db = require("../db"); 
class Entry {
    static async create(producto_id, cantidad, fecha_entrada, fecha_vencimiento, numero_documento, proveedor_id, usuario_id)
    {
       const [result] = await db.execute('INSERT INTO entradas_inventario producto_id, cantidad, fecha_entrada, fecha_vencimiento, numero_documento, proveedor_id, usuario_id) VALUES (?,?,?,?,?,?,?)',[producto_id, cantidad, fecha_entrada, fecha_vencimiento, numero_documento, proveedor_id, usuario_id]);
       await db.execute('update productos set stock_actual = stock_actual + ? where id = ?', [cantidad, producto_id]);
       return result.insert_id;
    }

static async getAll()
{
    const [rows] = await db.execute('select ei.id, p.nombre AS producto, ei.cantidad, ei.fecha_entrada, ei.fecha_vencimiento, ei.numero_documento, pr.nombre AS proveedor, u.usuario AS usuario FROM entradas_inventario ei JOIN productos p ON ei.producto_id = p.id JOIN proveedores pr ON ei.proveedor_id = pr.id JOIN usuarios u ON ei.usuario_id = u.id ORDER BY ei.fecha_entrada DESC');
return rows;
}

static async getById(id)
{
    const [rows] = await db.execute(` SELECT ei.id, p.nombre AS producto, ei.cantidad, ei.fecha_entrada, ei.fecha_vencimiento, ei.numero_documento, pr.nombre AS proveedor, u.usuario AS usuario FROM entradas_inventario ei JOIN productos p ON ei.producto_id = p.id JOIN proveedores pr ON ei.proveedor_id = pr.id JOIN usuarios u ON ei.usuario_id = u.id WHERE ei.id = ? `, [id]);
    return rows[0];
}

}
module.exports = Entry;