"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItemInCart = exports.findCartByUserId = exports.createUserCart = void 0;
const cart_model_1 = __importDefault(require("../cart.model"));
const findCartByUserId = async (userId) => {
    return await cart_model_1.default.findOne({ user_id: userId });
};
exports.findCartByUserId = findCartByUserId;
const createUserCart = async (userId, product) => {
    const filter = {
        user_id: userId,
        cart_state: 'active',
    }, updateOrInsert = {
        user_id: userId,
        $addToSet: {
            cart_items: product,
        },
        $inc: {
            count_items: 1,
            total_price: product.price * product.quantity,
        },
    }, options = {
        upsert: true,
        new: true,
    };
    return await cart_model_1.default.findOneAndUpdate(filter, updateOrInsert, options);
};
exports.createUserCart = createUserCart;
const updateItemInCart = async (userId, product) => {
    const { product_id, product_variant_id, quantity } = product;
    const existingItem = await cart_model_1.default.findOne({
        user_id: userId,
        'cart_items.product_id': product_id,
        'cart_items.product_variant_id': product_variant_id,
        cart_state: 'active',
    });
    if (existingItem) {
        const filter = {
            user_id: userId,
            'cart_items.product_id': product_id,
            'cart_items.product_variant_id': product_variant_id,
            cart_state: 'active',
        }, updateSet = {
            $inc: {
                'cart_items.$.quantity': quantity,
                count_items: 1,
                total_price: product.price * product.quantity,
            },
        }, options = {
            new: true,
            upsert: true,
        };
        return cart_model_1.default.findOneAndUpdate(filter, updateSet, options);
    }
    return await createUserCart(userId, product);
};
exports.updateItemInCart = updateItemInCart;
//# sourceMappingURL=cart.repo.js.map