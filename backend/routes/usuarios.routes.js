const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const db = require("../db");

console.log("RUTA USUARIOS CARGADA");

// CREAR USUARIO

router.post("/", async (req, res) => {

    //console.log("========== POST /usuarios ==========");
    //console.log(req.body);

    try {

        const {
            rut,
            usuario,
            correo,
            password,
            rol_id
        } = req.body;


        if (!usuario || !password) {

            return res.status(400).json({

                error: "Usuario y contraseña requeridos"

            });

        }


        const passwordHash = await bcrypt.hash(
            password,
            10
        );


        const sql = `
            INSERT INTO usuarios
            (
                rut,
                usuario,
                correo,
                password,
                rol_id
            )
            VALUES (?, ?, ?, ?)
        `;


        const [resultado] = await db.query(
            sql,
            [
                rut,
                usuario,
                correo,
                passwordHash,
                rol_id
            ]
        );


        res.json({

            mensaje:"Usuario creado correctamente",

            id:resultado.insertId

        });



    } 
catch (error) {

    console.error("================================");
    console.error("ERROR CREANDO USUARIO");
    console.error(error);
    console.error("Mensaje:", error.message);

    if (error.code) {
        console.error("Código:", error.code);
    }

    if (error.sqlMessage) {
        console.error("SQL:", error.sqlMessage);
    }

    console.error("================================");

    res.status(500).json({
        error: error.message
    });

}


});

module.exports = router;