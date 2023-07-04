"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_auth_1 = require("../../auth/customer.auth");
const cart_controller_1 = __importDefault(require("../../controllers/cart.controller"));
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const cart_1 = require("../../middlewares/cart");
const cart_validation_1 = require("../../validations/cart.validation");
const router = (0, express_1.Router)();
router.use(customer_auth_1.authentication);
router.get('/', (0, asyncHandler_1.default)(cart_controller_1.default.getCart));
router.post('/', cart_validation_1.validateAddItemCart, cart_1.checkItemExists, (0, asyncHandler_1.default)(cart_controller_1.default.addToCart));
router.post('/update', cart_validation_1.validateUpdateItemCart, cart_1.checkItemExists, (0, asyncHandler_1.default)(cart_controller_1.default.updateCartItem));
router.delete('/', cart_validation_1.validateDeleteItem, cart_1.checkItemExists, (0, asyncHandler_1.default)(cart_controller_1.default.removeCartItem));
exports.default = router;
//# sourceMappingURL=cart.route.js.map