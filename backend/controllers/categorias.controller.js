const db = require("../db");


// ===============================
// OBTENER TODAS LAS CATEGORÍAS
// ===============================

exports.obtenerCategorias = async (req, res) => {

    try {

        const sql = `
            SELECT 
                id,
                nombre
            FROM categorias
            ORDER BY nombre ASC
        `;


        const [rows] = await db.query(sql);


        res.json({

            success: true,

            data: rows

        });


    } catch(error) {


        console.error(
            "Error al obtener categorías:",
            error
        );


        res.status(500).json({

            success:false,

            message:"Error al obtener categorías"

        });


    }

};




// ===============================
// CREAR CATEGORÍA
// ===============================

exports.crearCategoria = async (req,res)=>{


    try {


        const {nombre}=req.body;



        if(!nombre){


            return res.status(400).json({

                success:false,

                message:"Debe ingresar nombre de categoría"

            });


        }



        const sql = `

            INSERT INTO categorias
            (
                nombre
            )

            VALUES(?)

        `;



        const [resultado] = await db.query(

            sql,

            [nombre]

        );



        res.json({

            success:true,

            message:"Categoría creada correctamente",

            id:resultado.insertId

        });



    } catch(error){


        console.error(
            "Error al crear categoría:",
            error
        );



        res.status(500).json({

            success:false,

            message:"Error interno del servidor"

        });


    }


};