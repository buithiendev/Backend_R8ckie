"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const success_response_1 = require("../core/success.response");
const product_service_1 = __importDefault(require("../services/product.service"));
const utils_1 = require("../utils");
class ProductController {
    async getAll(req, res, next) {
        const { filter } = (0, utils_1.getPrototypeQuery)(req);
        console.log('first');
        new success_response_1.SuccessResponse({
            message: 'Get product success',
            statusCode: 200,
            metadata: await product_service_1.default.getAll((0, utils_1.convertParamToString)(filter || {})),
        }).send(res);
    }
    async getById(req, res, next) {
        const { filter } = (0, utils_1.getPrototypeQuery)(req);
        const { id } = req.params;
        new success_response_1.SuccessResponse({
            message: 'Get product success',
            statusCode: 200,
            metadata: await product_service_1.default.getById(id, (0, utils_1.convertParamToString)(filter || {})),
        }).send(res);
    }
    async getProductByCateSlug(req, res, next) {
        const { filter } = (0, utils_1.getPrototypeQuery)(req);
        const { slug } = req.params;
        new success_response_1.SuccessResponse({
            message: 'Get products success',
            statusCode: 200,
            metadata: await product_service_1.default.getProductByCateSlug(slug, (0, utils_1.convertParamToString)(filter || {})),
        }).send(res);
    }
}
exports.default = new ProductController();
//# sourceMappingURL=product.controller.js.map