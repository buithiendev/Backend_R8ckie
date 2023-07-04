import { model, Schema } from 'mongoose'
import { Cart, CartProductItem } from './interfaces/cart.interface'

const DOCUMENT_NAME = 'Cart'
const COLLECTION_NAME = 'Carts'
const QUANTITY_DEFAULT = 1

const cartProductItemSchema = new Schema<CartProductItem>({
    product_id: { type: String, required: true },
    product_variant_id: { type: String, required: true },
    quantity: { type: Number, default: QUANTITY_DEFAULT },
    price: { type: Number, required: true },
    name: { type: String, required: true },
})

const cartSchema = new Schema<Cart>(
    {
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
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
)


export default model<Cart>(DOCUMENT_NAME, cartSchema)
