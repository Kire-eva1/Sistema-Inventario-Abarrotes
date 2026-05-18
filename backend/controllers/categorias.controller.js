{ const sql = `
        SELECT p.*, c.nombre AS categoria
        FROM productos p
        JOIN categorias c ON p.categoria_id = c.id
        WHERE p.fecha_vencimiento <= CURDATE() + INTERVAL 7 DAY
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};