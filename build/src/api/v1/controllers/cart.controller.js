"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const success_response_1 = require("../core/success.response");
const cart_service_1 = __importDefault(require("../services/cart.service"));
class CartController {
    constructor() {
        this.addToCart = async (req, res, next) => {
            const { user, product } = req;
            new success_response_1.SuccessResponse({
                message: 'Add product to cart success',
                statusCode: 200,
                metadata: await cart_service_1.default.addToCart(user.userId, {
                    ...req.body,
                }, product),
            }).send(res);
        };
        this.updateCartItem = async (req, res, next) => {
            const { user } = req;
            new success_response_1.SuccessResponse({
                message: 'Update quantity success',
                statusCode: 200,
                metadata: await cart_service_1.default.updateCartItem(user.userId, {
                    ...req.body,
                }),
            }).send(res);
        };
        this.removeCartItem = async (req, res, next) => {
            const { user } = req;
            new success_response_1.SuccessResponse({
                message: 'Delete cart in product success',
                statusCode: 200,
                metadata: await cart_service_1.default.removeCartItem(user.userId, {
                    ...req.body,
                }),
            }).send(res);
        };
        this.getCart = async (req, res, next) => {
            const { user } = req;
            new success_response_1.SuccessResponse({
                message: 'Get cart success!!',
                statusCode: 200,
                metadata: await cart_service_1.default.getCart(user.userId),
            }).send(res);
        };
    }
}
exports.default = new CartController();
//# sourceMappingURL=cart.controller.js.map