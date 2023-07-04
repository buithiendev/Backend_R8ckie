"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTransactionById = void 0;
const transaction_model_1 = __importDefault(require("../transaction.model"));
const findTransactionById = async (transactionId, filter) => {
    return await transaction_model_1.default.transaction
        .findOne({
        _id: transactionId,
        ...filter,
    })
        .populate('transaction_attributes')
        .lean()
        .exec();
};
exports.findTransactionById = findTransactionById;
//# sourceMappingURL=transaction.repo.js.map