"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateItemCart = exports.validateDeleteItem = exports.validateAddItemCart = void 0;
const joi_1 = __importDefault(require("joi"));
const _1 = require(".");
const validateAddItemCart = (0, _1.validateData)(joi_1.default.object({
    product_id: joi_1.default.string().required(),
    product_variant_id: joi_1.default.string().required(),
    quantity: joi_1.default.number().integer().positive().required(),
}));
exports.validateAddItemCart = validateAddItemCart;
const validateDeleteItem = (0, _1.validateData)(joi_1.default.object({
    product_id: joi_1.default.string().regex(_1.REGEX_ID).required(),
    product_variant_id: joi_1.default.string().regex(_1.REGEX_ID).required(),
}));
exports.validateDeleteItem = validateDeleteItem;
const validateUpdateItemCart = (0, _1.validateData)(joi_1.default.object({
    product_id: joi_1.default.string().regex(_1.REGEX_ID).required(),
    product_variant_id: joi_1.default.string().regex(_1.REGEX_ID).required(),
    quantity: joi_1.default.number().integer().positive().required(),
    old_quantity: joi_1.default.number().integer().positive().required(),
}));
exports.validateUpdateItemCart = validateUpdateItemCart;
//# sourceMappingURL=cart.validation.js.map