import { QueryParams } from '..'
import Address from '../../../models/interfaces/address.interface'
import {
    CURRENCY,
    GATEWAYCODE,
    Order,
} from '../../../models/interfaces/order.interface'

interface IOrderService {
    create(payload: CreateOrderPayload): Promise<Order>
    getOrderById(orderId: string): Promise<Order | null>
    getAllOrderOfCustomer(query: QueryOrderType): Promise<Order[]>
}

type QueryOrderType = Pick<
    QueryParams,
    | 'created_at_max'
    | 'created_at_min'
    | 'limit'
    | 'page'
    | 'sort'
    | 'since_id'
    | 'fields'
    | 'financial_status'
    | 'fulfillment_status'
>

type CreateOrderPayload = {
    line_items: {
        product_id: string
        variant_id: string
        quantity: number
    }[]
    shipping_address: Address
    discount_code?: []
    customer_id?: string
    currency?: keyof typeof CURRENCY
    note?: string
    gateway_code?: keyof typeof GATEWAYCODE
}

export { CreateOrderPayload, IOrderService, QueryOrderType }
