import { Types } from 'mongoose'
import { Order } from '../../models/interfaces/order.interface'
import orderModel from '../../models/order.model'
import { findProductByIdAndVariantId } from '../../models/repositories/product.repo'
import { BadRequestError } from '../core/error.response'
import {
    CreateOrderPayload,
    QueryOrderType,
} from '../interfaces/checkout/OrderService.interface'
import { createToken, getSelectData } from '../utils'
import addressService from './address.service'

class OrderService {
    async create(
        {
            line_items,
            discount_code,
            shipping_address,
            currency,
            note,
            gateway_code,
        }: CreateOrderPayload,
        userId: string,
    ): Promise<Order> {
        const address = await addressService.create(userId, shipping_address)

        const items = await Promise.all(
            line_items.map(async (item, index) => {
                const product = await findProductByIdAndVariantId(
                    item.product_id,
                    item.variant_id,
                    [],
                )
                console.log(product)

                if (!product)
                    throw new BadRequestError('Product does not exists')

                return {
                    product_name: product?.product_name,
                    price: product?.product_variants[0].price,
                    vendor: product?.product_vendor,
                    collection: product?.product_collection,
                    variant_title: product?.product_variants[0].variant_title,
                    grams: product?.product_variants[0].grams,
                    quantity: line_items[index].quantity,
                    barcode: product?.product_variants[0].barcode,
                    image: product?.product_images
                        ? product.product_images[0]
                        : '',
                    total_discount: 0,
                    product_id: product?._id,
                    variant_id: product?.product_variants[0]._id,
                    sku: product?.product_variants[0].sku,
                }
            }),
        )

        let total_weight = 0
        let subtotal_price = 0

        items.forEach((item) => {
            const { grams, quantity, price } = item
            total_weight += grams * quantity
            subtotal_price += price * quantity
        })

        const cart_token = createToken(items, userId)
        const checkout_token = createToken(
            { items, address, userId, discount_code },
            userId,
        )

        const item = {
            shipping_address: new Types.ObjectId(address._id),
            line_items: items,
            customer_id: new Types.ObjectId(userId),
            cart_token,
            checkout_token,
            currency: currency || 'VND',
            total_weight,
            subtotal_price,
            note,
            gateway_code: gateway_code || 'COD',
        }
        return await orderModel.create(item)
    }

    async getAllOrderOfCustomer(
        userId: string,
        {
            limit = 50,
            page = 1,
            fields = [
                'order_number',
                'subtotal_price',
                'financial_status',
                'createdAt',
            ],
            sort = 'ctime',
            financial_status = 'pending',
            since_id = 1,
        }: QueryOrderType,
    ): Promise<Order[]> {
        const sortBy: { [key: string]: any } =
            sort === 'ctime' ? { _id: -1 } : { _id: 1 }
        const skip = (page - 1) * limit

        return await orderModel
            .find({
                _id: { $gt: since_id },
                customer_id: userId,
                financial_status,
            })
            .sort(sortBy)
            .skip(skip)
            .limit(limit)
            .select(getSelectData(fields))
            .lean()
            .exec()
    }

    async getOrderById(userId: string, orderId: string): Promise<Order | null> {
        return await orderModel
            .findOne({ _id: orderId, customer_id: userId })
            .populate('shipping_address')
            .populate({
                path: 'line_items',
                select: 'product_name price quantity sku',
                populate: {
                    path: 'image',
                    select: 'image_url image_file_name',
                },
            })
            .select(
                getSelectData([
                    'shipping_address',
                    'line_items',
                    'subtotal_price',
                    'createdAt',
                    'order_number',
                    'financial_status',
                ]),
            )
            .lean()
            .exec()
    }

    async confirmOrder(orderId: string): Promise<number> {
        const filter = {
                _id: orderId,
                confirmed_status: 'unconfirmed',
            },
            update = {
                confirmed_status: 'confirmed',
            },
            options = {
                new: true,
            }

        const order = await orderModel.updateOne(filter, update, options)
        return order.modifiedCount
    }

    async closeOrder(orderId: string): Promise<number> {
        const filter = {
                _id: orderId,
                closed_status: false,
            },
            update = {
                closed_status: true,
            },
            options = {
                new: true,
            }

        const order = await orderModel.updateOne(filter, update, options)
        return order.modifiedCount
    }

    async openOrder(orderId: string): Promise<number> {
        const filter = {
                _id: orderId,
                closed_status: true,
            },
            update = {
                closed_status: false,
            },
            options = {
                new: true,
            }

        const order = await orderModel.updateOne(filter, update, options)
        return order.modifiedCount
    }

    async cancelOrder(orderId: string): Promise<number> {
        const filter = {
                _id: orderId,
                cancelled_status: 'uncancelled',
            },
            update = {
                cancelled_status: 'cancelled',
            },
            options = {
                new: true,
            }

        const order = await orderModel.updateOne(filter, update, options)
        return order.modifiedCount
    }

    async getOrderIdForAdmin(orderId: string): Promise<Order | null> {
        const order = await orderModel.findById(orderId)
        if (!order) throw new BadRequestError('Order does not exists')
        return order
    }

    async getAllOrderForAdmin(): Promise<Order[]> {
        return await orderModel.find()
    }

    async countOrder(): Promise<number> {
        return await orderModel.countDocuments()
    }
}

export default new OrderService()
