"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../../controllers/product.controller"));
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const router = (0, express_1.Router)();
router.get('/:id', (0, asyncHandler_1.default)(product_controller_1.default.getById));
router.get('/', (0, asyncHandler_1.default)(product_controller_1.default.getAll));
router.get('/getBySlug/:slug', (0, asyncHandler_1.default)(product_controller_1.default.getProductByCateSlug));
exports.default = router;
//# sourceMappingURL=product.route.js.map