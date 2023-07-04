"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const success_response_1 = require("../../core/success.response");
const vnpay_service_1 = __importDefault(require("../../services/payment/vnpay.service"));
const utils_1 = require("../../utils");
class VNPayController {
    constructor() {
        this.createPaymentVnpay = async (req, res) => {
            const { user } = req;
            const paymentURL = await vnpay_service_1.default.createPaymentUrl({
                ...req.body,
                userId: user.userId,
            });
            new success_response_1.SuccessResponse({
                message: 'Create payment URL success',
                statusCode: 200,
                metadata: paymentURL,
            }).redirect(res, paymentURL);
        };
        this.vnpayReturn = async (req, res) => {
            const payload = (0, utils_1.convertParamsVNPay)(req);
            new success_response_1.SuccessResponse({
                message: 'Return url payment success',
                statusCode: 200,
                metadata: await vnpay_service_1.default.vnpayReturn(payload),
            }).redirect(res, process.env.URL_REDIRECT_PAYMENT);
        };
        this.vnpayIPN = async (req, res) => {
            const payload = (0, utils_1.convertParamsVNPay)(req);
            new success_response_1.SuccessResponse({
                message: 'IPN URL',
                statusCode: 200,
                metadata: await vnpay_service_1.default.vnpayIPN(payload),
            }).send(res);
        };
        this.refundVNPay = async (req, res) => {
            const { user } = req;
            const ipAddress = req.socket.remoteAddress || '::1';
            const { id_transaction } = req.params;
            const { transactionType, refundAmount } = req.body;
            new success_response_1.SuccessResponse({
                message: 'Refund transaction success',
                statusCode: 200,
                metadata: await vnpay_service_1.default.refundVNPay(id_transaction, transactionType, refundAmount, user.email, ipAddress),
            }).send(res);
        };
    }
}
exports.default = new VNPayController();
//# sourceMappingURL=vnpay.controller.js.map