require("dotenv").config();

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");

const db = require("./db");

const authRoutes = require("./routes/auth.routes");
const productosRoutes = require("./routes/productos.routes");
const usuariosRoutes = require("./routes/usuarios.routes");

const app = express();

const PORT = process.env.PORT || 3000;
const SECRET = process.env.JWT_SECRET;


//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
//rutas
app.use("/auth", authRoutes);

//pagina principal
app.get('/', (req, res) => {

    res.sendFile(
        path.join(__dirname, 'index.html')
    );

});

// Token
function verificarToken(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: "Token requerido"
        });
    }


    const token = authHeader.replace("Bearer ", "");

    jwt.verify(token, SECRET, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                error: "Token inválido"
            });
        }

        req.user = decoded;

        next();

    });

}


/* ================= RUTAS MODULARES ================= */
// Importamos las rutas
//   const productosRoutes = require('./routes/productos.routes');
//   const usuariosRoutes = require('./routes/usuarios.routes');
// const categoriasRoutes = require('./routes/categorias.routes'); // Descomenta cuando los tengas listos
// const alertasRoutes = require('./routes/alertas.routes');       // Descomenta cuando los tengas listos

// Aplicamos las rutas con protección JWT donde sea necesario
app.use('/auth', authRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/productos', verificarToken, productosRoutes);


// Rutas públicas (ejemplo categorías si quieres que cualquiera las vea)
app.get('/categorias', (req, res) => {
    db.query('SELECT * FROM categorias', (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// Ruta de alertas (protegida)
app.get('/alertas', verificarToken, (req, res) => {

    const sql = `
        SELECT 
            p.*,
            c.nombre AS categoria
        FROM productos p
        LEFT JOIN categorias c 
            ON p.categoria_id = c.id
        WHERE 
            p.fecha_vencimiento IS NOT NULL
        AND
            p.fecha_vencimiento <= DATE_ADD(CURDATE(), INTERVAL 7 DAY)
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);

    });

});

/* ========MANEJO DE ERRORES=============== */
app.use((err, req, res, next) => {

    console.error("Error:", err);

    res.status(500).json({

        success: false,

        message: "Error interno del servidor."

    });

});
/* ================= SERVIDOR ================= */
app.listen(PORT, () => {
    console.log("Servidor modular corriendo en http://localhost:${PORT}");
});