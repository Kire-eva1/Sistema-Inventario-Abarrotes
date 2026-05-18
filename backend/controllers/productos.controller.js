const db = require('../db');


// ================= GET TODOS =================
exports.obtenerProductos = (req, res) => {

    const sql = `
        SELECT 
            p.*,
            c.nombre AS categoria,
            pr.nombre AS proveedor
        FROM productos p
        LEFT JOIN categorias c 
            ON p.categoria_id = c.id
        LEFT JOIN proveedores pr
            ON p.proveedor_id = pr.id
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.error("Error al obtener productos:", err);
            return res.status(500).json(err);
        }

        res.json(result);

    });

};


// ================= GET POR ID =================
exports.obtenerProductoPorId = (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT *
        FROM productos
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.error("Error al obtener producto:", err);
            return res.status(500).json(err);
        }

        res.json(result[0]);

    });

};


// ================= POST =================
exports.crearProducto = (req, res) => {

    const {
        nombre,
        descripcion,
        categoria_id,
        proveedor_id,
        fecha_elaboracion,
        fecha_vencimiento,
        cantidad,
        stock_minimo,
        stock_actual,
        codigo_barras,
        marca,
        sku,
        numero_documento,
        precio_costo,
        precio_venta
    } = req.body;

    const sql = `
        INSERT INTO productos
        (
            nombre,
            descripcion,
            categoria_id,
            proveedor_id,
            fecha_elaboracion,
            fecha_vencimiento,
            cantidad,
            stock_minimo,
            stock_actual,
            codigo_barras,
            marca,
            sku,
            numero_documento,
            precio_costo,
            precio_venta
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [
        nombre,
        descripcion,
        categoria_id,
        proveedor_id,
        fecha_elaboracion,
        fecha_vencimiento,
        cantidad,
        stock_minimo,
        stock_actual,
        codigo_barras,
        marca,
        sku,
        numero_documento,
        precio_costo,
        precio_venta
    ];

    db.query(sql, valores, (err, result) => {

        if (err) {

            console.error("ERROR SQL:", err);

            return res.status(500).json({
                error: err.sqlMessage
            });

        }

        res.json({
            message: "Producto guardado correctamente"
        });

    });

};


// ================= PUT =================
exports.actualizarProducto = (req, res) => {

    const { id } = req.params;

    const {
        nombre,
        categoria_id,
        fecha_vencimiento,
        cantidad,
        stock_minimo,
        codigo_barras,
        marca,
        sku,
        proveedor_id,
        numero_documento,
        fecha_elaboracion,
        precio_costo,
        precio_venta
    } = req.body;

    const sql = `
        UPDATE productos
        SET
            nombre = ?,
            categoria_id = ?,
            fecha_vencimiento = ?,
            cantidad = ?,
            stock_minimo = ?,
            codigo_barras = ?,
            marca = ?,
            sku = ?,
            proveedor_id = ?,
            numero_documento = ?,
            fecha_elaboracion = ?,
            precio_costo = ?,
            precio_venta = ?
        WHERE id = ?
    `;

    const valores = [
        nombre,
        categoria_id,
        fecha_vencimiento,
        cantidad,
        stock_minimo,
        codigo_barras,
        marca,
        sku,
        proveedor_id,
        numero_documento,
        fecha_elaboracion,
        precio_costo,
        precio_venta,
        id
    ];

    db.query(sql, valores, (err, result) => {

        if (err) {
            console.error("Error al actualizar:", err);
            return res.status(500).json(err);
        }

        res.json({
            mensaje: "Producto actualizado correctamente"
        });

    });

};


// ================= DELETE =================
exports.eliminarProducto = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM productos
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.error("Error al eliminar:", err);
            return res.status(500).json(err);
        }

        res.json({
            mensaje: "Producto eliminado correctamente"
        });

    });

};