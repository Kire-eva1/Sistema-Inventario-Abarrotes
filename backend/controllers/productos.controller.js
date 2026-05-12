const db = require('../db');

// ================= GET =================
exports.obtenerProductos = (req, res) => {

    const sql = `
        SELECT p.*, c.nombre AS categoria
        FROM productos p
        LEFT JOIN categorias c ON p.categoria_id = c.id
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error al obtener productos:", err);
            return res.status(500).json(err);
        }
        res.json(result);
    });
};

// ================= POST =================
exports.crearProducto = (req, res) => {
    const { 
        nombre, categoria, fecha_vencimiento, cantidad, stock_minimo,
        codigo_barras, marca, sku, proveedor, numero_documento, fecha_elaboracion 
    } = req.body;

    if (!nombre || !categoria || !fecha_vencimiento) {
        return res.status(400).send("Faltan datos obligatorios (Nombre, Categoría o Vencimiento)");
    }

    const sql = `
        INSERT INTO productos 
        (nombre, categoria_id, fecha_vencimiento, cantidad, stock_minimo, codigo_barras, marca, sku, proveedor, numero_documento, fecha_elaboracion)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [
        nombre, categoria, fecha_vencimiento, cantidad, stock_minimo,
        codigo_barras, marca, sku, proveedor, numero_documento, fecha_elaboracion
    ];

    db.query(sql, valores, (err, result) => {
        if (err) {
            console.error("Error SQL:", err);
            return res.status(500).json(err);
        }
        res.send("Producto guardado correctamente");
    });
};