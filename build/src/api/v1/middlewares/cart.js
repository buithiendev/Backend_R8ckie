"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkItemExists = void 0;
const product_repo_1 = require("../../models/repositories/product.repo");
const error_response_1 = require("../core/error.response");
const asyncHandler_1 = __importDefault(require("../helpers/asyncHandler"));
const checkItemExists = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { product_id, product_variant_id } = req.body;
    const product = await (0, product_repo_1.findProductByIdAndVariantId)(product_id, product_variant_id, []);
    if (product) {
        req.product = product;
        return next();
    }
    throw new error_response_1.BadRequestError('Product not found');
});
exports.checkItemExists = checkItemExists;
//# sourceMappingURL=cart.js.map