"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_route_1 = __importDefault(require("./product.route"));
const categories_route_1 = __importDefault(require("./categories.route"));
const token_route_1 = __importDefault(require("./token.route"));
const router = (0, express_1.Router)();
router.use('/api/products', product_route_1.default);
router.use('/api/categories', categories_route_1.default);
router.use('/api/token', token_route_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map