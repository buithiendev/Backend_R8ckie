"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DOCUMENT_NAME = 'Cart';
const COLLECTION_NAME = 'Carts';
const QUANTITY_DEFAULT = 1;
const cartProductItemSchema = new mongoose_1.Schema({
    product_id: { type: String, required: true },
    product_variant_id: { type: String, required: true },
    quantity: { type: Number, default: QUANTITY_DEFAULT },
    price: { type: Number, required: true },
    name: { type: String, required: true },
});
const cartSchema = new mongoose_1.Schema({
    cart_state: {
        type: String,
        enum: ['active', 'completed', 'failed', 'pending'],
        default: 'pending',
    },
    cart_items: [
        {
            type: cartProductItemSchema,
        },
    ],
    count_items: { type: Number, default: 0 },
    total_price: { type: Number, default: 0 },
    discount_code: { type: String, default: null },
    user_id: { type: String, required: true },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});
exports.default = (0, mongoose_1.model)(DOCUMENT_NAME, cartSchema);
//# sourceMappingURL=cart.model.js.map