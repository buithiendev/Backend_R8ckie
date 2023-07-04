import { CURRENCY } from '../../../models/interfaces/order.interface'

export enum Locale {
    'en' = 'Tiếng Anh',
    'vn' = 'Tiếng Việt',
}

export enum BankCode {
    'VNPAYQR' = 'Quét mã QR Code trên các ứng dụng ngân hàng',
    'NCB' = 'Thanh toán bằng thẻ NH NCB',
}

type CreatePaymentURLPayload = {
    userId: string
    orderId: number
    locale?: keyof typeof Locale
    bankCode?: keyof typeof BankCode
}

type VNPayParams = {
    vnp_Version: '2.1.0'
    vnp_Command: 'pay'
    vnp_TmnCode: string
    vnp_Locale: keyof typeof Locale
    vnp_CurrCode: keyof typeof CURRENCY
    vnp_TxnRef: string
    vnp_OrderInfo: string
    vnp_OrderType: string
    vnp_Amount: number
    vnp_ReturnUrl: string
    vnp_CreateDate: string
    vnp_BankCode: keyof typeof BankCode
    vnp_SecureHash?: string
}

type ParamVNPayReturn = {
    vnp_Amount: number
    vnp_BankCode: string
    vnp_BankTranNo: string
    vnp_CardType: string
    vnp_OrderInfo: string
    vnp_PayDate: string
    vnp_ResponseCode: string
    vnp_TmnCode: string
    vnp_TransactionNo: string
    vnp_TransactionStatus: string
    vnp_TxnRef: number
    vnp_SecureHash?: string
}

interface IVNPayService {
    createPaymentUrl(payload: CreatePaymentURLPayload): Promise<string>
    vnpayReturn(payload: ParamVNPayReturn): Promise<any>
}

export { CreatePaymentURLPayload, IVNPayService, ParamVNPayReturn, VNPayParams }
