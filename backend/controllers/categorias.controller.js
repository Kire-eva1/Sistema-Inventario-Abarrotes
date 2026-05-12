const db = require('../db');

exports.obtenerCategorias = (req, res) => {

    db.query('SELECT * FROM categorias', (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });

};