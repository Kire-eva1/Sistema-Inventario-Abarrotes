exports.verifyToken = (req, res, next) => {
    req.user = { id: 1, role: "admin" };
    next();
};

exports.checkRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: "Acceso denegado" });
        }
        next();
    };
};