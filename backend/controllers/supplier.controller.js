const Supplier = require("../models/supplier.model");

exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.getAll();
        res.status(200).json(suppliers);
    } catch (error) {
        console.error("Error al obtener proveedores:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

exports.createSupplier = async (req, res) => {
    try {
        const { nombre, contacto, telefono, email } = req.body;

        const supplierId = await Supplier.create(
            nombre,
            contacto,
            telefono,
            email
        );

        res.status(201).json({
            message: "Proveedor creado con éxito",
            supplierId
        });

    } catch (error) {
        console.error("Error al crear proveedor:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};