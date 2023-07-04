"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_auth_1 = require("../../auth/admin.auth");
const router = (0, express_1.Router)();
router.use(admin_auth_1.authentication);
router.post('/create');
router.post('/:id/enable');
router.post('/:id/disable');
router.delete('/:id');
exports.default = router;
//# sourceMappingURL=promotion.route.js.map