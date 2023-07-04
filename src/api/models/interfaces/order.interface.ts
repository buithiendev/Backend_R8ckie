import { Document } from 'mongoose'
import Address from './address.interface'
import Customer from './customer.interface'
import Image from './image.interface'
import Transaction from './transaction/transaction.interface'

enum GATEWAYCODE {
    COD = 'Thanh toán khi giao hàng (COD)',
    BANK = 'Chuyển khoản qua ngân hàng',
    MOMO = 'Ví Momo',
    VNPAY = 'Ví VNPay bằng QRCode',
    CREDIT_CARD = 'Thanh toán bằng Credit Card',
    PAYPAL = 'Thanh toán qua Paypal/Master Card',
}

enum CURRENCY {
    VND = 'VietNamDong',
    USD = 'Dollars',
}

enum FULFILLMENT_STATUS {
    fulfilled = 'Hoàn thành',
    null = 'Lỗi',
    partial = 'Thanh toán một phần',
    restoked = '...unk',
}

enum CONFIRMED_STATUS {
    confirmed = 'Xác nhận',
    unconfirmed = 'Chưa xác nhận',
}

enum CANCELLED_STATUS {
    cancelled = 'Đã bị huỷ',
    uncancelled = 'Chưa huỷ',
}

enum FINANCIAL_STATUS {
    pending = 'Đang chờ',
    authorized = 'Uỷ quyền',
    partially_paid = 'Thanh toán một phần',
    paid = 'Đã thanh toán',
    partially_refunded = 'Hoàn trả một phần',
    refunded = 'Hoàn trả',
    voided = 'Vô hiệu',
    failed = 'Thất bại',
}

enum CANCEL_REASON {
    null = 'Không có vấn đề phát sinh',
    customer = 'Từ phía khách hàng',
    fraud = 'Gian lận',
    inventory = 'Hết hàng',
    declined = 'Khoản thanh toán bị từ chối',
    orther = 'Khác',
}

interface Order extends Document {
    shipping_address: Address
    cancel_reason?: keyof typeof CANCEL_REASON
    cancelled_at?: string | null
    cart_token: string
    checkout_token: string
    closed_at?: string | null
    currency: keyof typeof CURRENCY
    customer_id?: Customer | null
    discount_code?: string[] | null
    financial_status?: keyof typeof FINANCIAL_STATUS
    fulfillment_status?: keyof typeof FULFILLMENT_STATUS
    tags?: string | null
    gateway?: string | null
    gateway_code: keyof typeof GATEWAYCODE
    line_items: LineItem[]
    note?: string | null
    order_number?: string
    total_weight: number
    subtotal_price: number
    confirmed_at?: string | null
    closed_status?: boolean
    confirmed_status?: keyof typeof CONFIRMED_STATUS
    cancelled_status?: keyof typeof CANCELLED_STATUS
    location_id?: string | null
    contact_email?: string | null
    transaction?: Transaction[]
}

interface LineItem extends Document {
    product_name: string
    price: number
    price_original?: number | null
    price_promotion?: number | null
    vendor: string
    type: string
    variant_title: string
    grams?: number
    quantity?: number
    barcode: string
    image: Image
    total_discount?: number
    product_id: string
    variant_id: string
    sku: string
}

export {
    CANCELLED_STATUS,
    CANCEL_REASON,
    CONFIRMED_STATUS,
    CURRENCY,
    FINANCIAL_STATUS,
    FULFILLMENT_STATUS,
    GATEWAYCODE,
    LineItem,
    Order,
}
