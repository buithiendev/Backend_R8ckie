"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_model_1 = __importDefault(require("../../models/cart.model"));
const cart_repo_1 = require("../../models/repositories/cart.repo");
const product_repo_1 = require("../../models/repositories/product.repo");
const error_response_1 = require("../core/error.response");
class CartService {
    async addToCart(userId, item, product) {
        const newItem = {
            ...item,
            price: product.product_variants[0].price,
            name: product.product_name,
        };
        const userCart = await (0, cart_repo_1.findCartByUserId)(userId);
        if (!userCart) {
            return await (0, cart_repo_1.createUserCart)(userId, newItem);
        }
        if (!userCart.cart_items.length) {
            userCart.cart_items = [newItem];
            return await userCart.save();
        }
        return await (0, cart_repo_1.updateItemInCart)(userId, newItem);
    }
    async updateCartItem(userId, product) {
        const existingProduct = await (0, product_repo_1.findProductByIdAndVariantId)(product.product_id, product.product_variant_id, ['product_name', 'product_variants']);
        if (existingProduct) {
            if (product.quantity === 0) {
                await this.removeCartItem(userId, product);
                return null;
            }
            const newItem = {
                ...product,
                quantity: product.quantity - product.old_quantity,
                price: existingProduct.product_variants[0].price,
                name: existingProduct.product_name,
            };
            return await (0, cart_repo_1.updateItemInCart)(userId, newItem);
        }
        throw new error_response_1.BadRequestError('Product can not found');
    }
    async removeCartItem(userId, { product_id, product_variant_id, }) {
        const query = { user_id: userId, cart_state: 'active' }, updateSet = {
            $pull: {
                cart_items: {
                    product_id,
                    product_variant_id,
                },
            },
        };
        const { modifiedCount } = await cart_model_1.default.updateOne(query, updateSet);
        return modifiedCount;
    }
    async getCart(userId) {
        return await cart_model_1.default
            .findOne({
            user_id: userId,
        })
            .lean();
    }
}
exports.default = new CartService();
//# sourceMappingURL=cart.service.js.map