"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_plugin_autoinc_1 = require("mongoose-plugin-autoinc");
const order_interface_1 = require("./interfaces/order.interface");
const DOCUMENT_NAME = 'Order';
const COLLECTION_NAME = 'Orders';
const lineItemSchema = new mongoose_1.Schema({
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
    image: { type: mongoose_1.Types.ObjectId, ref: 'Image' },
    total_discount: { type: Number, default: 0 },
    product_id: String,
    variant_id: String,
    sku: String,
});
const orderSchema = new mongoose_1.Schema({
    shipping_address: { type: mongoose_1.Types.ObjectId, ref: 'Address' },
    cancel_reason: {
        type: String,
        enum: Object.keys(order_interface_1.CANCEL_REASON),
        default: 'null',
    },
    cancelled_at: { type: String, default: null },
    cart_token: { type: String, required: true, unique: true },
    checkout_token: { type: String, required: true, unique: true },
    closed_at: { type: String, default: null },
    currency: {
        type: String,
        enum: Object.keys(order_interface_1.CURRENCY),
        default: 'VND',
    },
    customer_id: { type: mongoose_1.Types.ObjectId, ref: 'Customer', default: null },
    discount_code: [{ type: String, default: null }],
    financial_status: {
        type: String,
        enum: Object.keys(order_interface_1.FINANCIAL_STATUS),
        default: 'pending',
    },
    fulfillment_status: {
        type: String,
        enum: Object.keys(order_interface_1.FULFILLMENT_STATUS),
        default: 'null',
    },
    tags: { type: String, default: null },
    gateway: { type: String, default: null },
    gateway_code: {
        type: String,
        enum: Object.keys(order_interface_1.GATEWAYCODE),
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
        enum: Object.keys(order_interface_1.CONFIRMED_STATUS),
        default: 'unconfirmed',
    },
    cancelled_status: {
        type: String,
        enum: Object.keys(order_interface_1.CANCELLED_STATUS),
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
}, {
    collection: COLLECTION_NAME,
    timestamps: true,
    strict: 'throw',
    _id: false,
});
orderSchema.plugin(mongoose_plugin_autoinc_1.autoIncrement, 'Order');
orderSchema.pre('save', function (next) {
    this.order_number = `#${this._id}`;
    this.gateway = order_interface_1.GATEWAYCODE[this.gateway_code];
    next();
});
exports.default = (0, mongoose_1.model)(DOCUMENT_NAME, orderSchema);
//# sourceMappingURL=order.model.js.map