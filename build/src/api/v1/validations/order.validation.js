"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrderCreationInput = void 0;
const joi_1 = __importDefault(require("joi"));
const _1 = require(".");
const order_interface_1 = require("../../models/interfaces/order.interface");
const lineItemSchema = joi_1.default.object({
    product_id: joi_1.default.string().regex(_1.REGEX_ID).required(),
    variant_id: joi_1.default.string().regex(_1.REGEX_ID).required(),
    quantity: joi_1.default.number().integer().positive().required(),
});
const validateOrderCreationInput = (0, _1.validateData)(joi_1.default.object({
    line_items: joi_1.default.array().items(lineItemSchema).required(),
    // shipping_address: validateCreateAddress,
    shipping_address: joi_1.default.object(),
    discount_code: joi_1.default.array().items(joi_1.default.object({
        discount_id: joi_1.default.string().required(),
    })),
    customer_id: joi_1.default.string().regex(_1.REGEX_ID),
    currency: joi_1.default.string().valid(...Object.keys(order_interface_1.CURRENCY)),
    note: joi_1.default.string(),
    gateway_code: joi_1.default.string().valid(...Object.keys(order_interface_1.GATEWAYCODE)),
}));
exports.validateOrderCreationInput = validateOrderCreationInput;
//# sourceMappingURL=order.validation.js.map