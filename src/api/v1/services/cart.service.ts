import cartModel from '../../models/cart.model'
import { Cart, CartProductItem } from '../../models/interfaces/cart.interface'
import { Product } from '../../models/interfaces/product.interface'
import {
    createUserCart,
    findCartByUserId,
    updateItemInCart,
} from '../../models/repositories/cart.repo'
import { findProductByIdAndVariantId } from '../../models/repositories/product.repo'
import { BadRequestError } from '../core/error.response'
import {
    ICartService,
    ItemInput,
    UpdateItemInput,
} from '../interfaces/cart/CartService.interface'

class CartService implements ICartService {
    async addToCart(
        userId: string,
        item: ItemInput,
        product: Product,
    ): Promise<Cart | null> {
        const newItem: CartProductItem = {
            ...item,
            price: product.product_variants[0].price,
            name: product.product_name,
        }
        const userCart = await findCartByUserId(userId)

        if (!userCart) {
            return await createUserCart(userId, newItem)
        }
        if (!userCart.cart_items.length) {
            userCart.cart_items = [newItem]
            return await userCart.save()
        }

        return await updateItemInCart(userId, newItem)
    }

    async updateCartItem(
        userId: string,
        product: UpdateItemInput,
    ): Promise<Cart | null> {
        const existingProduct = await findProductByIdAndVariantId(
            product.product_id,
            product.product_variant_id,
            ['product_name', 'product_variants'],
        )
        if (existingProduct) {
            if (product.quantity === 0) {
                await this.removeCartItem(userId, product)
                return null
            }

            const newItem: CartProductItem = {
                ...product,
                quantity: product.quantity - product.old_quantity,
                price: existingProduct.product_variants[0].price,
                name: existingProduct.product_name,
            }

            return await updateItemInCart(userId, newItem)
        }
        throw new BadRequestError('Product can not found')
    }

    async removeCartItem(
        userId: string,
        {
            product_id,
            product_variant_id,
        }: Pick<CartProductItem, 'product_id' | 'product_variant_id'>,
    ): Promise<number> {
        const query = { user_id: userId, cart_state: 'active' },
            updateSet = {
                $pull: {
                    cart_items: {
                        product_id,
                        product_variant_id,
                    },
                },
            }

        const { modifiedCount } = await cartModel.updateOne(query, updateSet)

        return modifiedCount
    }

    async getCart(userId: string): Promise<Cart | null> {
        return await cartModel
            .findOne({
                user_id: userId,
            })
            .lean()
    }
}

export default new CartService()
