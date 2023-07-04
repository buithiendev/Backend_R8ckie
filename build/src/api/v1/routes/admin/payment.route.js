"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_auth_1 = require("../../auth/admin.auth");
const vnpay_controller_1 = __importDefault(require("../../controllers/payment/vnpay.controller"));
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const payment_validation_1 = require("../../validations/payment.validation");
const router = (0, express_1.default)();
router.use(admin_auth_1.authentication);
router.post('/refund_vnp/:id_transaction', payment_validation_1.validateVNPayRefundInput, (0, asyncHandler_1.default)(vnpay_controller_1.default.refundVNPay));
exports.default = router;
//# sourceMappingURL=payment.route.js.map