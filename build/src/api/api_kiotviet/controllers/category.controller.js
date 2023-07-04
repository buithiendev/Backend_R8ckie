"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const success_response_1 = require("../core/success.response");
const category_service_1 = __importDefault(require("../services/category.service"));
const utils_1 = require("../utils");
class CategoryController {
    async getAll(req, res, next) {
        const { limit } = (0, utils_1.getPrototypeQuery)(req);
        new success_response_1.SuccessResponse({
            message: 'Get category success',
            statusCode: 200,
            metadata: await category_service_1.default.getAll(limit || 20),
        }).send(res);
    }
    async getIdBySlug(req, res, next) {
        const { slug } = req.params;
        new success_response_1.SuccessResponse({
            message: 'Get id success',
            statusCode: 200,
            metadata: await category_service_1.default.getObjectId(slug)
        }).send(res);
    }
}
exports.default = new CategoryController();
//# sourceMappingURL=category.controller.js.map