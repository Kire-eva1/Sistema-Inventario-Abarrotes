const db = require("../db");

const Categoria = {
    obtenerTodas: async () => {
        const [filas] = await db.query("SELECT * FROM categorias");
        return filas;
    },
    crear: async (nombre) => {
        const [resultado] = await db.query("INSERT INTO categorias (nombre) VALUES (?)", [nombre]);
        return resultado.insertId;
    }
};

module.exports = Categoria;