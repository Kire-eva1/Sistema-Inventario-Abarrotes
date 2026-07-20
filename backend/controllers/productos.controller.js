const db = require("../db");



// ================= OBTENER TODOS LOS PRODUCTOS =================

exports.obtenerProductos = async (req, res) => {

    try {


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


            ORDER BY p.id DESC

        `;



        const [productos] = await db.query(sql);



        res.json({

            success: true,

            data: productos

        });



    } catch (error) {


        console.error(
            "Error al obtener productos:",
            error.message
        );


        res.status(500).json({

            success: false,

            message: "Error al obtener productos"

        });


    }

};






// ================= OBTENER PRODUCTO POR ID =================

exports.obtenerProductoPorId = async (req, res) => {


    try {


        const { id } = req.params;



        const sql = `

            SELECT *

            FROM productos

            WHERE id = ?

        `;



        const [rows] = await db.query(
            sql,
            [id]
        );



        if (rows.length === 0) {


            return res.status(404).json({

                success: false,

                message: "Producto no encontrado"

            });


        }



        res.json({

            success: true,

            data: rows[0]

        });



    } catch (error) {


        console.error(
            "Error al obtener producto:",
            error.message
        );


        res.status(500).json({

            success: false,

            message: "Error interno del servidor"

        });


    }

};







// ================= CREAR PRODUCTO =================

exports.crearProducto = async (req, res) => {


    try {


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


            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)

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



        const [result] = await db.query(
            sql,
            valores
        );



        res.status(201).json({

            success: true,

            message: "Producto creado correctamente",

            id: result.insertId

        });



    } catch (error) {


        console.error(
            "Error al crear producto:",
            error.message
        );


        res.status(500).json({

            success: false,

            message: "Error al crear producto"

        });


    }

};







// ================= ACTUALIZAR PRODUCTO =================

exports.actualizarProducto = async (req, res) => {


    try {


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



        const [result] = await db.query(
            sql,
            valores
        );



        res.json({

            success: true,

            message: "Producto actualizado correctamente"

        });



    } catch (error) {


        console.error(
            "Error al actualizar producto:",
            error.message
        );


        res.status(500).json({

            success: false,

            message: "Error al actualizar producto"

        });


    }

};








// ================= ELIMINAR PRODUCTO =================

exports.eliminarProducto = async (req, res) => {


    try {


        const { id } = req.params;



        const sql = `

            DELETE FROM productos

            WHERE id = ?

        `;



        await db.query(
            sql,
            [id]
        );



        res.json({

            success: true,

            message: "Producto eliminado correctamente"

        });



    } catch (error) {


        console.error(
            "Error al eliminar producto:",
            error.message
        );


        res.status(500).json({

            success: false,

            message: "Error al eliminar producto"

        });


    }

};