"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../../controllers/order.controller");
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const customer_auth_1 = require("../../auth/customer.auth");
const order_validation_1 = require("../../validations/order.validation");
const router = (0, express_1.Router)();
router.use(customer_auth_1.authentication);
router.post('/', order_validation_1.validateOrderCreationInput, (0, asyncHandler_1.default)(order_controller_1.customerOrderController.create));
router.get('/:order_id', (0, asyncHandler_1.default)(order_controller_1.customerOrderController.getOrderById));
router.get('/', (0, asyncHandler_1.default)(order_controller_1.customerOrderController.getAllOrder));
exports.default = router;
//# sourceMappingURL=order.route.js.map