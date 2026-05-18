const Entry = require("../models/entry.model");

exports.createEntry = async (req, res) => {
    try {
        const { producto_id, cantidad, fecha_entrada, fecha_vencimiento, numero_documento, proveedor_id } = req.body;
        const usuario_id = req.user.id; // Asumiendo que el ID del usuario viene del JWT
        const entryId = await Entry.create(producto_id, cantidad, fecha_entrada, fecha_vencimiento, numero_documento, proveedor_id, usuario_id);
        res.status(201).json({ message: "Entrada de inventario registrada con éxito", entryId });
    } catch (error) {
        console.error("Error al registrar entrada de inventario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

exports.getAllEntries = async (req, res) => {
    try {
        const entries = await Entry.getAll();
        res.status(200).json(entries);
    } catch (error) {
        console.error("Error al obtener entradas de inventario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};