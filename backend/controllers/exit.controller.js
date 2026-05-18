const Exit = require("../models/exit.model");

exports.createExit = async (req, res) => {
    try {
        const { producto_id, cantidad, fecha_salida, tipo_salida } = req.body;
        const usuario_id = req.user.id; // Asumiendo que el ID del usuario viene del JWT
        const exitId = await Exit.create(producto_id, cantidad, fecha_salida, tipo_salida, usuario_id);
        res.status(201).json({ message: "Salida de inventario registrada con éxito", exitId });
    } catch (error) {
        console.error("Error al registrar salida de inventario:", error);
        res.status(500).json({ message: "Error interno del servidor", details: error.message });
    }
};

exports.getAllExits = async (req, res) => {
    try {
        const exits = await Exit.getAll();
        res.status(200).json(exits);
    } catch (error) {
        console.error("Error al obtener salidas de inventario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};