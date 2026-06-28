require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const db = require('./db');

const app = express();
const SECRET = "clave_super_secreta";

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

//pagina principal
app.get('/', (req, res) => {

    res.sendFile(
        path.join(__dirname, 'index.html')
    );

});

// Token
function verificarToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: "Token requerido" });

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Token inválido" });
        req.user = decoded;
        next();
    });
}

/* ================= LOGIN ================= */
app.post('/login', (req, res) => {
    const { usuario, password } = req.body;
    db.query(
        `SELECT u.*, r.nombre AS rol 
         FROM usuarios u
         JOIN roles r ON u.rol_id = r.id
         WHERE u.usuario = ?`,
        [usuario],
        (err, result) => {
            if (err) return res.status(500).json({ error: "Error BD" });
            if (result.length === 0 || result[0].password !== password) {
                return res.status(401).json({ error: "Credenciales incorrectas" });
            }
            const user = result[0];
            const token = jwt.sign({ id: user.id, usuario: user.usuario, rol: user.rol }, SECRET, { expiresIn: '4h' });
            res.json({ token });
        }
    );
});

/* ================= RUTAS MODULARES ================= */
// Importamos las rutas
const productosRoutes = require('./routes/productos.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
// const categoriasRoutes = require('./routes/categorias.routes'); // Descomenta cuando los tengas listos
// const alertasRoutes = require('./routes/alertas.routes');       // Descomenta cuando los tengas listos

// Aplicamos las rutas con protección JWT donde sea necesario
app.use('/productos', verificarToken, productosRoutes);
app.use('/usuarios', usuariosRoutes);

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

/* ================= SERVIDOR ================= */
app.listen(3000, () => {
    console.log("Servidor modular corriendo en http://localhost:3000");
});