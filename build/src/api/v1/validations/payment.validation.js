"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateVNPayRefundInput = exports.validateVNPayCreateURLInput = void 0;
const joi_1 = __importDefault(require("joi"));
const _1 = require(".");
const transaction_interface_1 = require("../../models/interfaces/transaction/transaction.interface");
const VNPayService_interface_1 = require("../interfaces/payment/VNPayService.interface");
const validateVNPayCreateURLInput = (0, _1.validateData)(joi_1.default.object({
    orderId: joi_1.default.number().required(),
    locale: joi_1.default.string().valid(...Object.keys(VNPayService_interface_1.Locale)),
    bankCode: joi_1.default.string().valid(...Object.keys(VNPayService_interface_1.BankCode)),
}));
exports.validateVNPayCreateURLInput = validateVNPayCreateURLInput;
const validateVNPayRefundInput = (0, _1.validateData)(joi_1.default.object({
    transactionType: joi_1.default.string()
        .valid(...Object.keys(transaction_interface_1.TransactionType))
        .required(),
    refundAmount: joi_1.default.number().positive().required(),
}));
exports.validateVNPayRefundInput = validateVNPayRefundInput;
//# sourceMappingURL=payment.validation.js.map