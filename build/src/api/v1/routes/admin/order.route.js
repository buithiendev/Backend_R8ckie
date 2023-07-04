"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_auth_1 = require("../../auth/admin.auth");
const order_controller_1 = require("../../controllers/order.controller");
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const router = (0, express_1.Router)();
router.use(admin_auth_1.authentication);
router.get('/count', (0, asyncHandler_1.default)(order_controller_1.adminOrderController.countOrder));
router.post('/:order_id/confirm', (0, asyncHandler_1.default)(order_controller_1.adminOrderController.confirmOrder));
router.post('/:order_id/close', (0, asyncHandler_1.default)(order_controller_1.adminOrderController.closeOrder));
router.post('/:order_id/open', (0, asyncHandler_1.default)(order_controller_1.adminOrderController.openOrder));
router.post('/:order_id/cancel', (0, asyncHandler_1.default)(order_controller_1.adminOrderController.cancelOrder));
// router.patch('/:order_id', asyncHandler(OrderController.closeOrder))
// router.post('/:order_id/tags', asyncHandler(OrderController.closeOrder))
// router.delete('/:order_id/tags', asyncHandler(OrderController.closeOrder))
router.get('/:order_id', (0, asyncHandler_1.default)(order_controller_1.adminOrderController.getOrderById));
router.get('/', (0, asyncHandler_1.default)(order_controller_1.adminOrderController.getAllOrder));
exports.default = router;
//# sourceMappingURL=order.route.js.map