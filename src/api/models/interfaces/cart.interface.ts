import { Document } from 'mongoose'

interface Cart extends Document {
    cart_state: CartState
    cart_items: CartProductItem[]
    discount_code: string,
    total_price: number,
    count_items: number,
    user_id: string
}

type CartState = 'active' | 'completed' | 'failed' | 'pending'
type CartProductItem = {
    product_id: string
    product_variant_id: string
    quantity: number
    price: number
    name: string
}

export { Cart, CartProductItem, CartState }
