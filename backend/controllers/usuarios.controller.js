const User = require("../models/user.model");

const bcrypt = require("bcryptjs");




// ================= OBTENER TODOS LOS USUARIOS =================

exports.obtenerUsuarios = async (req, res) => {

    try {


        const usuarios = await User.getAll();



        res.json({

            success: true,

            data: usuarios

        });



    } catch (error) {


        console.error(
            "Error al obtener usuarios:",
            error.message
        );


        res.status(500).json({

            success: false,

            message: "Error al obtener usuarios"

        });


    }

};








// ================= OBTENER USUARIO POR ID =================

exports.obtenerUsuarioPorId = async (req, res) => {


    try {


        const { id } = req.params;



        const usuario = await User.getById(id);



        if (!usuario) {


            return res.status(404).json({

                success: false,

                message: "Usuario no encontrado"

            });


        }



        res.json({

            success: true,

            data: usuario

        });



    } catch (error) {


        console.error(
            "Error al obtener usuario:",
            error.message
        );


        res.status(500).json({

            success: false,

            message: "Error interno del servidor"

        });


    }

};









// ================= CREAR USUARIO =================

exports.crearUsuario = async (req, res) => {


    try {


        const {

            usuario,

            password,

            rol_id

        } = req.body;




        if (!usuario || !password || !rol_id) {


            return res.status(400).json({

                success: false,

                message: "Todos los campos son obligatorios"

            });


        }





        const existe = await User.getByUsername(usuario);



        if (existe) {


            return res.status(409).json({

                success: false,

                message: "El usuario ya existe"

            });


        }




        const passwordEncriptada = await bcrypt.hash(

            password,

            10

        );





        const id = await User.create(

            usuario,

            passwordEncriptada,

            rol_id

        );




        res.status(201).json({

            success: true,

            message: "Usuario creado correctamente",

            id

        });




    } catch (error) {


        console.error(

            "Error al crear usuario:",

            error.message

        );



        res.status(500).json({

            success: false,

            message: "Error al crear usuario"

        });


    }

};









// ================= ACTUALIZAR CONTRASEÑA =================

exports.actualizarPassword = async (req, res) => {


    try {


        const { id } = req.params;

        const { password } = req.body;



        if (!password) {


            return res.status(400).json({

                success: false,

                message: "Debe ingresar una contraseña"

            });


        }




        const passwordEncriptada = await bcrypt.hash(

            password,

            10

        );




        await User.updatePassword(

            id,

            passwordEncriptada

        );




        res.json({

            success: true,

            message: "Contraseña actualizada correctamente"

        });




    } catch (error) {


        console.error(

            "Error al actualizar contraseña:",

            error.message

        );



        res.status(500).json({

            success: false,

            message: "Error al actualizar contraseña"

        });


    }

};









// ================= ELIMINAR USUARIO =================

exports.eliminarUsuario = async (req, res) => {


    try {


        const { id } = req.params;



        await User.delete(id);




        res.json({

            success: true,

            message: "Usuario eliminado correctamente"

        });



    } catch (error) {


        console.error(

            "Error al eliminar usuario:",

            error.message

        );



        res.status(500).json({

            success: false,

            message: "Error al eliminar usuario"

        });


    }

};