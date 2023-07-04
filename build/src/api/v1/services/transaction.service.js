"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_repo_1 = require("../../models/repositories/transaction.repo");
const transaction_model_1 = __importDefault(require("../../models/transaction.model"));
const error_response_1 = require("../core/error.response");
class TransactionFactory {
    static registerPaymentMethod(type, classRef) {
        TransactionFactory.paymentMethodRegistry[type] = classRef;
    }
    static async createTransaction(type, payload) {
        const classTransaction = TransactionFactory.paymentMethodRegistry[type];
        if (!classTransaction) {
            throw new error_response_1.BadRequestError(`Invalid gateway type ${type}`);
        }
        return new classTransaction(payload).createTransaction();
    }
    static async findTransactionById(transactionId) {
        return await (0, transaction_repo_1.findTransactionById)(transactionId);
    }
}
TransactionFactory.paymentMethodRegistry = {};
class Transaction {
    constructor({ amount, code_gateway, order_id, currency, transaction_attributes, trannsaction_type, }) {
        this.amount = amount;
        this.code_gateway = code_gateway;
        this.order_id = order_id;
        this.currency = currency;
        this.trannsaction_type = trannsaction_type;
        this.transaction_attributes = transaction_attributes;
    }
    async createTransaction(transactionId) {
        const newTransaction = await transaction_model_1.default.transaction.create({
            ...this,
            _id: transactionId,
        });
        return newTransaction;
    }
}
class VNPAY extends Transaction {
    constructor(transaction) {
        super(transaction);
    }
    async createTransaction() {
        const transactionVNPay = await transaction_model_1.default.vnpay.create({
            ...this.transaction_attributes,
        });
        if (!transactionVNPay) {
            throw new error_response_1.BadRequestError('Create transaction for VNPay Error');
        }
        const newTransaction = await super.createTransaction(transactionVNPay._id.toString());
        if (!newTransaction) {
            throw new error_response_1.BadRequestError('Create new transaction error');
        }
        return newTransaction;
    }
}
//Register payment method
TransactionFactory.registerPaymentMethod('VNPAY', VNPAY);
exports.default = TransactionFactory;
//# sourceMappingURL=transaction.service.js.map