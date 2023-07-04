import { CURRENCY, GATEWAYCODE } from '../order.interface'
import { VNPayPayment } from './vnpay.interface'

export enum TransactionType {
    '01' = 'Thanh toán',
    '02' = 'Hoàn tiền',
    '03' = 'Hoàn một phần',
}

interface Transaction {
    amount: number
    code_gateway: keyof typeof GATEWAYCODE
    order_id: number
    trannsaction_type: keyof typeof TransactionType
    transaction_attributes: VNPayPayment
    currency: keyof typeof CURRENCY
}

export default Transaction 
