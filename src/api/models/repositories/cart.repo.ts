import cartModel from '../cart.model'
import { Cart, CartProductItem } from '../interfaces/cart.interface'

const findCartByUserId = async (userId: string) => {
    return await cartModel.findOne({ user_id: userId })
}

const createUserCart = async (userId: string, product: CartProductItem) => {
    const filter: Pick<Cart, 'user_id' | 'cart_state'> = {
            user_id: userId,
            cart_state: 'active',
        },
        updateOrInsert = {
            user_id: userId,
            $addToSet: {
                cart_items: product,
            },
            $inc: {
                count_items: 1,
                total_price: product.price * product.quantity,
            },
        },
        options = {
            upsert: true,
            new: true,
        }
    return await cartModel.findOneAndUpdate(filter, updateOrInsert, options)
}

const updateItemInCart = async (userId: string, product: CartProductItem) => {
    const { product_id, product_variant_id, quantity } = product
    const existingItem = await cartModel.findOne({
        user_id: userId,
        'cart_items.product_id': product_id,
        'cart_items.product_variant_id': product_variant_id,
        cart_state: 'active',
    })

    if (existingItem) {
        const filter = {
                user_id: userId,
                'cart_items.product_id': product_id,
                'cart_items.product_variant_id': product_variant_id,
                cart_state: 'active',
            },
            updateSet = {
                $inc: {
                    'cart_items.$.quantity': quantity,
                    count_items: 1,
                    total_price: product.price * product.quantity,
                },
            },
            options = {
                new: true,
                upsert: true,
            }

        return cartModel.findOneAndUpdate(filter, updateSet, options)
    }

    return await createUserCart(userId, product)
}

export { createUserCart, findCartByUserId, updateItemInCart }
