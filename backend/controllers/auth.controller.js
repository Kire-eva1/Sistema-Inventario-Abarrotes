const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Se usará una variable de entorno para el secreto de JWT
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"; 

exports.register = async (req, res) => {
    try {
        const { usuario, password, rol_id } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await User.create(usuario, hashedPassword, rol_id);
        res.status(201).json({ message: "Usuario registrado con éxito", userId });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

exports.login = async (req, res) => {
    try {
        const { usuario, password } = req.body;
        const user = await User.getByUsername(usuario);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ id: user.id, rol_id: user.rol_id }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ token, user: { id: user.id, usuario: user.usuario, rol_id: user.rol_id } });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};