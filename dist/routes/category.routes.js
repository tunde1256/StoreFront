"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
router.get('/get-all', category_controller_1.listCategories);
router.get('/:id', category_controller_1.getCategory);
router.post('/create-category', auth_middleware_1.authenticate, role_middleware_1.authorizeAdmin, category_controller_1.createCategory);
router.put('/:id', auth_middleware_1.authenticate, role_middleware_1.authorizeAdmin, category_controller_1.updateCategory);
router.delete('/:id', auth_middleware_1.authenticate, role_middleware_1.authorizeAdmin, category_controller_1.deleteCategory);
exports.default = router;
