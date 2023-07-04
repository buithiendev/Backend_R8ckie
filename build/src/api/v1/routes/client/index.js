"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const access_customer_route_1 = __importDefault(require("./access.customer.route"));
const address_route_1 = __importDefault(require("./address.route"));
const cart_route_1 = __importDefault(require("./cart.route"));
const collection_route_1 = __importDefault(require("./collection.route"));
const discount_route_1 = __importDefault(require("./discount.route"));
const order_route_1 = __importDefault(require("./order.route"));
const payment_route_1 = __importDefault(require("./payment.route"));
const product_route_1 = __importDefault(require("./product.route"));
const promotion_route_1 = __importDefault(require("./promotion.route"));
const router = (0, express_1.Router)();
router.use('/api/customers', access_customer_route_1.default);
router.use('/api/customers/address', address_route_1.default);
router.use('/api/products', product_route_1.default);
router.use('/api/promotions', promotion_route_1.default);
router.use('/api/discounts', discount_route_1.default);
router.use('/api/orders', order_route_1.default);
router.use('/api/checkout', payment_route_1.default);
router.use('/api/cart', cart_route_1.default);
router.use('/api/collections', collection_route_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map