"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const order_interface_1 = require("./interfaces/order.interface");
const transaction_interface_1 = require("./interfaces/transaction/transaction.interface");
const vnpay_interface_1 = require("./interfaces/transaction/vnpay.interface");
const DOCUMENT_NAME = 'Transaction';
const COLLECTION_NAME = 'Transactions';
const transactionSchema = new mongoose_1.Schema({
    amount: { type: Number, required: true },
    code_gateway: {
        type: String,
        enum: Object.keys(order_interface_1.GATEWAYCODE),
        default: 'COD',
    },
    currency: { type: String, enum: Object.keys(order_interface_1.CURRENCY), default: 'VND' },
    order_id: { type: Number, required: true },
    trannsaction_type: {
        type: String,
        enum: Object.keys(transaction_interface_1.TransactionType),
        required: true,
    },
    transaction_attributes: { type: mongoose_1.Schema.Types.Mixed, required: true },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});
const VNPaySchema = new mongoose_1.Schema({
    transDate: { type: String, required: true },
    transType: { type: String, required: true },
    payment_status: {
        type: String,
        enum: Object.keys(vnpay_interface_1.VNPAY_RESPONSE_CODE),
        default: '07',
    },
    transactionNo: { type: String },
}, {
    collection: 'VNPAY',
});
const schemas = {
    transaction: (0, mongoose_1.model)(DOCUMENT_NAME, transactionSchema),
    vnpay: (0, mongoose_1.model)('VNPay', VNPaySchema),
};
exports.default = schemas;
//# sourceMappingURL=transaction.model.js.map