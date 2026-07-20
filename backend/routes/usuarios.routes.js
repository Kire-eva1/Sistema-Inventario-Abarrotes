const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const db = require("../db");


// CREAR USUARIO

router.post("/", async (req, res) => {

    try {

        const {
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



    } catch(error) {


        console.error(
            "Error creando usuario:",
            error
        );


        res.status(500).json({

            error:"Error al crear usuario"

        });


    }


});


module.exports = router;