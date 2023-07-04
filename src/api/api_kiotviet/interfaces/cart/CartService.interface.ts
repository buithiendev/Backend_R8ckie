import {
    Cart,
    CartProductItem,
} from '../../../models/interfaces/cart.interface'
import { Product } from '../../../models/interfaces/product.interface'

interface ICartService {
    addToCart(
        userId: string,
        item: ItemInput,
        product: Product,
    ): Promise<Cart | null>
    removeCartItem(userId: string, product: CartProductItem): Promise<number>
    getCart(userId: string): Promise<Cart | null>
    updateCartItem(
        userId: string,
        product: UpdateItemInput,
    ): Promise<Cart | null>
}

type ItemInput = Pick<
    CartProductItem,
    'product_id' | 'product_variant_id' | 'quantity'
>

type UpdateItemInput = ItemInput & {
    old_quantity: number
}

export { ICartService, ItemInput, UpdateItemInput }
