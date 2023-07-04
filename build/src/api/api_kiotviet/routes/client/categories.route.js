"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = __importDefault(require("../../controllers/category.controller"));
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const router = (0, express_1.Router)();
router.get('/', (0, asyncHandler_1.default)(category_controller_1.default.getAll));
router.get('/getIdBySlug/:slug', (0, asyncHandler_1.default)(category_controller_1.default.getIdBySlug));
exports.default = router;
//# sourceMappingURL=categories.route.js.map