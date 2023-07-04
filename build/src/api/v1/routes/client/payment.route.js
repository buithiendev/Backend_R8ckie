"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_auth_1 = require("../../auth/customer.auth");
const vnpay_controller_1 = __importDefault(require("../../controllers/payment/vnpay.controller"));
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const payment_validation_1 = require("../../validations/payment.validation");
const router = (0, express_1.default)();
router.get('/vnpay_return', (0, asyncHandler_1.default)(vnpay_controller_1.default.vnpayReturn));
router.get('/vnp_ipn', (0, asyncHandler_1.default)(vnpay_controller_1.default.vnpayIPN));
router.use(customer_auth_1.authentication);
router.post('/create_vnpay_payment_url', payment_validation_1.validateVNPayCreateURLInput, (0, asyncHandler_1.default)(vnpay_controller_1.default.createPaymentVnpay));
exports.default = router;
//# sourceMappingURL=payment.route.js.map