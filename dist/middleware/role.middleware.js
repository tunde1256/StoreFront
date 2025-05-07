"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeAdmin = void 0;
const authorizeAdmin = (req, res, next) => {
    if (req.user?.role !== 'ADMIN') {
        res.status(403).json({ message: 'Forbidden: Admins only' });
        return;
    }
    next();
};
exports.authorizeAdmin = authorizeAdmin;
