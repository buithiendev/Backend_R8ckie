"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_response_1 = require("../core/error.response");
const product_model_1 = __importDefault(require("../models/product.model"));
const api_1 = require("../utils/api");
const category_service_1 = __importDefault(require("./category.service"));
class ProductService {
    async getAll(params) {
        const response = await (0, api_1.fetchData)(`/products?${params}`);
        const document = await product_model_1.default.find({
            id: { $in: response.data?.map((value) => value.id) },
        });
        const updatedDocuments = response.data?.map((value) => {
            const product = document.find(({ id }) => id == value.id);
            return Object.assign({}, value, {
                description: product?.description,
                discribles: product?.discribles,
            });
        });
        return {
            ...response,
            data: updatedDocuments,
        };
    }
    async getById(id, params) {
        if (!id)
            throw new error_response_1.BadRequestError('Invalid product id');
        const response = await (0, api_1.fetchData)(`/products/${id}?${params}`);
        return response;
    }
    async getProductByCateSlug(slug, query) {
        const categoryId = await category_service_1.default.getObjectId(slug);
        if (!categoryId)
            return null;
        const response = await this.getAll(`categoryId=${categoryId}&${query}`);
        return response;
    }
}
exports.default = new ProductService();
//# sourceMappingURL=product.service.js.map