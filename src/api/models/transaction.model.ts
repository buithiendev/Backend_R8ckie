import { model, Schema } from 'mongoose'
import { CURRENCY, GATEWAYCODE } from './interfaces/order.interface'
import Transaction, {
    TransactionType,
} from './interfaces/transaction/transaction.interface'
import {
    VNPAY_RESPONSE_CODE,
    VNPayPayment,
} from './interfaces/transaction/vnpay.interface'

const DOCUMENT_NAME = 'Transaction'
const COLLECTION_NAME = 'Transactions'

const transactionSchema = new Schema<Transaction>(
    {
        amount: { type: Number, required: true },
        code_gateway: {
            type: String,
            enum: Object.keys(GATEWAYCODE),
            default: 'COD',
        },
        currency: { type: String, enum: Object.keys(CURRENCY), default: 'VND' },
        order_id: { type: Number, required: true },
        trannsaction_type: {
            type: String,
            enum: Object.keys(TransactionType),
            required: true,
        },
        transaction_attributes: { type: Schema.Types.Mixed, required: true },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
)

const VNPaySchema = new Schema<VNPayPayment>(
    {
        transDate: { type: String, required: true },
        transType: { type: String, required: true },
        payment_status: {
            type: String,
            enum: Object.keys(VNPAY_RESPONSE_CODE),
            default: '07',
        },
        transactionNo: { type: String },
    },
    {
        collection: 'VNPAY',
    },
)

const schemas = {
    transaction: model<Transaction>(DOCUMENT_NAME, transactionSchema),
    vnpay: model<VNPayPayment>('VNPay', VNPaySchema),
}

export default schemas
