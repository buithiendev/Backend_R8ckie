"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOrderByIdAndUserId = exports.findOrderById = void 0;
const order_model_1 = __importDefault(require("../order.model"));
const findOrderByIdAndUserId = async (orderId, userId) => {
    return await order_model_1.default
        .findOne({ _id: orderId, customer_id: userId })
        .lean()
        .exec();
};
exports.findOrderByIdAndUserId = findOrderByIdAndUserId;
const findOrderById = async (orderId) => {
    return await order_model_1.default.findById(orderId);
};
exports.findOrderById = findOrderById;
//# sourceMappingURL=order.repo.js.map