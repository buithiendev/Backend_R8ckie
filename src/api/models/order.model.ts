import { model, Schema, Types } from 'mongoose'
import { autoIncrement } from 'mongoose-plugin-autoinc'
import {
    CANCEL_REASON,
    CANCELLED_STATUS,
    CONFIRMED_STATUS,
    CURRENCY,
    FINANCIAL_STATUS,
    FULFILLMENT_STATUS,
    GATEWAYCODE,
    LineItem,
    Order,
} from './interfaces/order.interface'

const DOCUMENT_NAME = 'Order'
const COLLECTION_NAME = 'Orders'

const lineItemSchema = new Schema<LineItem>({
    product_name: String,
    price: Number,
    price_original: { type: Number, default: 0.0 },
    price_promotion: { type: Number, default: 0.0 },
    vendor: String,
    type: String,
    variant_title: String,
    grams: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
    barcode: String,
    image: { type: Types.ObjectId, ref: 'Image' },
    total_discount: { type: Number, default: 0 },
    product_id: String,
    variant_id: String,
    sku: String,
})

const orderSchema = new Schema<Order>(
    {
        shipping_address: { type: Types.ObjectId, ref: 'Address' },
        cancel_reason: {
            type: String,
            enum: Object.keys(CANCEL_REASON),
            default: 'null',
        },
        cancelled_at: { type: String, default: null },
        cart_token: { type: String, required: true, unique: true },
        checkout_token: { type: String, required: true, unique: true },
        closed_at: { type: String, default: null },
        currency: {
            type: String,
            enum: Object.keys(CURRENCY),
            default: 'VND',
        },
        customer_id: { type: Types.ObjectId, ref: 'Customer', default: null },
        discount_code: [{ type: String, default: null }],
        financial_status: {
            type: String,
            enum: Object.keys(FINANCIAL_STATUS),
            default: 'pending',
        },
        fulfillment_status: {
            type: String,
            enum: Object.keys(FULFILLMENT_STATUS),
            default: 'null',
        },
        tags: { type: String, default: null },
        gateway: { type: String, default: null },
        gateway_code: {
            type: String,
            enum: Object.keys(GATEWAYCODE),
            default: 'COD',
        },
        line_items: [{ type: lineItemSchema }],
        note: { type: String, default: null },
        order_number: { type: String },
        total_weight: { type: Number, default: 0.0 },
        subtotal_price: { type: Number, default: 0.0 },
        confirmed_at: { type: String, default: null },
        closed_status: { type: Boolean, default: false },
        confirmed_status: {
            type: String,
            enum: Object.keys(CONFIRMED_STATUS),
            default: 'unconfirmed',
        },
        cancelled_status: {
            type: String,
            enum: Object.keys(CANCELLED_STATUS),
            default: 'uncancelled',
        },
        location_id: { type: String, default: null },
        contact_email: { type: String, default: null },
        transaction: {
            type: Array,
            default: [],
            ref: 'Transaction',
            select: false,
        },
    },
    {
        collection: COLLECTION_NAME,
        timestamps: true,
        strict: 'throw',
        _id: false,
    },
)

orderSchema.plugin(autoIncrement, 'Order')
orderSchema.pre('save', function (next) {
    this.order_number = `#${this._id}`
    this.gateway = GATEWAYCODE[this.gateway_code]
    next()
})

export default model<Order>(DOCUMENT_NAME, orderSchema)
