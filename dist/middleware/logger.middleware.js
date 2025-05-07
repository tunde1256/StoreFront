"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.requestLogger = void 0;
const logger_1 = require("../utils/logger");
const requestLogger = (req, res, next) => {
    logger_1.logger.info(`${req.method} ${req.originalUrl}`);
    next();
};
exports.requestLogger = requestLogger;
const errorLogger = (err, req, res, next) => {
    logger_1.logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);
    res.status(500).json({ message: 'Internal Server Error' });
};
exports.errorLogger = errorLogger;
