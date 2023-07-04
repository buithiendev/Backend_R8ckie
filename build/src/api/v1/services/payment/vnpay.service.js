"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const date_fns_1 = require("date-fns");
const qs_1 = __importDefault(require("qs"));
const vnpay_gateway_1 = require("../../../../configs/PaymentGateways/vnpay.gateway");
const order_repo_1 = require("../../../models/repositories/order.repo");
const error_response_1 = require("../../core/error.response");
const utils_1 = require("../../utils");
const transaction_service_1 = __importDefault(require("../transaction.service"));
const DE_DECIMAL = 100;
const HashDataVnpayParams = (object, secretKey) => {
    const sortedParams = (0, utils_1.sortObject)(object);
    const signData = qs_1.default.stringify(sortedParams, { encode: false });
    const hmac = crypto_1.default.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    return signed;
};
class VNPAYFacade {
    constructor(vnpayConfig) {
        this.vnpayConfig = vnpayConfig;
    }
    async createPaymentUrl({ userId, orderId, bankCode, locale, }) {
        const order = await (0, order_repo_1.findOrderByIdAndUserId)(orderId, userId);
        if (!order)
            throw new error_response_1.BadRequestError('Order does not exists');
        const { tmnCode, secretKey, vnpUrl, returnUrl } = this.vnpayConfig;
        const createDate = (0, date_fns_1.format)(new Date(), 'yyyyMMddHHmmss');
        const vnpayParams = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: tmnCode,
            vnp_Locale: locale || 'vn',
            vnp_CurrCode: order.currency || 'VND',
            vnp_TxnRef: order._id,
            vnp_OrderInfo: `Thanh toan don hang ${order._id}`,
            vnp_OrderType: 'other',
            vnp_Amount: order.subtotal_price * DE_DECIMAL,
            vnp_ReturnUrl: returnUrl,
            vnp_CreateDate: createDate,
            vnp_BankCode: bankCode || 'NCB',
        };
        const signed = HashDataVnpayParams(vnpayParams, secretKey);
        vnpayParams['vnp_SecureHash'] = signed;
        const querystring = qs_1.default.stringify(vnpayParams, {
            encode: false,
        });
        const paymentUrl = `${vnpUrl}?${querystring}`;
        console.log('🚀 ~ file: vnpay.service.ts:66 ~ VNPAYService ~ paymentUrl:', paymentUrl);
        return paymentUrl;
    }
    // async vnpayReturn(payload: ParamVNPayReturn): Promise<any> {
    //     const { vnp_SecureHash, vnp_TxnRef, vnp_ResponseCode, vnp_Amount } =
    //         payload
    //     const { secretKey } = this.vnpayConfig
    //     delete payload.vnp_SecureHash
    //     const signed = HashDataVnpayParams(payload, secretKey)
    //     if (vnp_SecureHash === signed) {
    //         if (vnp_ResponseCode === '00') {
    //             return `?vnp_ResponseCode=00&order_id=${vnp_TxnRef}`
    //         } else {
    //             return `?vnp_ResponseCode=${vnp_ResponseCode}`
    //         }
    //     }
    //     return `?vnp_ResponseCode=404`
    // }
    async vnpayReturn(payload) {
        const { vnp_SecureHash, vnp_TxnRef, vnp_ResponseCode, vnp_Amount, vnp_PayDate, vnp_TransactionNo, vnp_BankCode, } = payload;
        const { secretKey } = vnpay_gateway_1.vnpayConfig;
        delete payload.vnp_SecureHash;
        const signed = HashDataVnpayParams(payload, secretKey);
        if (vnp_SecureHash === signed) {
            const order = await (0, order_repo_1.findOrderById)(vnp_TxnRef);
            if (!order)
                throw new error_response_1.BadRequestError('Order does not exists');
            const transaction = await transaction_service_1.default.createTransaction('VNPAY', {
                amount: vnp_Amount,
                order_id: vnp_TxnRef,
                code_gateway: 'VNPAY',
                currency: order.currency,
                trannsaction_type: '01',
                transaction_attributes: {
                    transDate: vnp_PayDate,
                    transType: vnp_BankCode,
                    payment_status: vnp_ResponseCode,
                    transactionNo: vnp_TransactionNo,
                },
            });
            const checkAmount = order?.subtotal_price === vnp_Amount / 100;
            if (order) {
                if (checkAmount) {
                    if (order.financial_status !== 'paid') {
                        if (vnp_ResponseCode == '00') {
                            await order.updateOne({
                                $addToSet: {
                                    transaction: transaction._id,
                                },
                                financial_status: 'paid',
                            });
                            return {
                                RspCode: '00',
                                Message: 'Success',
                            };
                        }
                        else {
                            await order.updateOne({
                                $addToSet: {
                                    transaction: transaction._id,
                                },
                                financial_status: 'failed',
                            });
                            return {
                                RspCode: '00',
                                Message: 'Success',
                            };
                        }
                    }
                    else {
                        return {
                            RspCode: '02',
                            Message: 'This order has been updated to the payment status',
                        };
                    }
                }
                else {
                    return {
                        RspCode: '04',
                        Message: 'Amount invalid',
                    };
                }
            }
            else {
                return {
                    RspCode: '01',
                    Message: 'Order not found',
                };
            }
        }
    }
    async vnpayIPN(payload) {
        const { vnp_SecureHash, vnp_TxnRef, vnp_ResponseCode, vnp_Amount, vnp_PayDate, vnp_TransactionNo, vnp_BankCode, } = payload;
        const { secretKey } = vnpay_gateway_1.vnpayConfig;
        delete payload.vnp_SecureHash;
        const signed = HashDataVnpayParams(payload, secretKey);
        if (vnp_SecureHash === signed) {
            const order = await (0, order_repo_1.findOrderById)(vnp_TxnRef);
            if (!order)
                throw new error_response_1.BadRequestError('Order does not exists');
            const transaction = await transaction_service_1.default.createTransaction('VNPAY', {
                amount: vnp_Amount,
                order_id: vnp_TxnRef,
                code_gateway: 'VNPAY',
                currency: order.currency,
                trannsaction_type: '01',
                transaction_attributes: {
                    transDate: vnp_PayDate,
                    transType: vnp_BankCode,
                    payment_status: vnp_ResponseCode,
                    transactionNo: vnp_TransactionNo,
                },
            });
            const checkAmount = order?.subtotal_price === vnp_Amount / 100;
            if (order) {
                if (checkAmount) {
                    if (order.financial_status !== 'paid') {
                        if (vnp_ResponseCode == '00') {
                            await order.updateOne({
                                $addToSet: {
                                    transaction: transaction._id,
                                },
                                financial_status: 'paid',
                            });
                            return {
                                RspCode: '00',
                                Message: 'Success',
                            };
                        }
                        else {
                            await order.updateOne({
                                $addToSet: {
                                    transaction: transaction._id,
                                },
                                financial_status: 'failed',
                            });
                            return {
                                RspCode: '00',
                                Message: 'Success',
                            };
                        }
                    }
                    else {
                        return {
                            RspCode: '02',
                            Message: 'This order has been updated to the payment status',
                        };
                    }
                }
                else {
                    return {
                        RspCode: '04',
                        Message: 'Amount invalid',
                    };
                }
            }
            else {
                return {
                    RspCode: '01',
                    Message: 'Order not found',
                };
            }
        }
    }
    async refundVNPay(transactionId, transactionType, refundAmount, performer, ipAddress) {
        const vnp_Command = 'refund';
        const { tmnCode, secretKey, vnpApi, returnUrl, version } = this.vnpayConfig;
        const transaction = await transaction_service_1.default.findTransactionById(transactionId);
        if (!transaction)
            throw new error_response_1.BadRequestError('Transaction does not exists or transaction payment failed');
        if (transaction.trannsaction_type !== '01') {
            throw new error_response_1.BadRequestError('Refund only for paid invoices');
        }
        if (transaction.transaction_attributes.payment_status !== '00') {
            throw new error_response_1.BadRequestError('Refunds only for successfully paid invoices');
        }
        const { order_id, amount, transaction_attributes, currency } = transaction;
        if (refundAmount <= 0 || refundAmount > amount) {
            throw new error_response_1.BadRequestError('The refund amount should be greater than 0 and less than the transaction amount');
        }
        const vnp_RequestId = (0, date_fns_1.format)(new Date(), 'yyyyMMddHHmmss');
        const vnpRefundAmount = transactionType === '03' ? refundAmount : amount;
        const vnpOrderInfo = `Hoàn tiền ${refundAmount} ${currency} cho đơn hàng ${order_id}`;
        const data = [
            vnp_RequestId,
            version,
            vnp_Command,
            tmnCode,
            transactionType,
            order_id,
            vnpRefundAmount,
            transaction_attributes.transactionNo,
            transaction_attributes.transDate,
            performer,
            vnp_RequestId,
            ipAddress,
            vnpOrderInfo,
        ];
        let hmac = crypto_1.default.createHmac('sha512', secretKey);
        let vnp_SecureHash = hmac
            .update(Buffer.from(data.join('|'), 'utf-8'))
            .digest('hex');
        const dataObject = {
            vnp_RequestId,
            vnp_Version: version,
            vnp_Command,
            vnp_TmnCode: tmnCode,
            vnp_TransactionType: transactionType,
            vnp_TxnRef: order_id,
            vnp_amount: vnpRefundAmount,
            vnp_TransactionNo: transaction_attributes.transactionNo,
            vnp_TransactionDate: transaction_attributes.transDate,
            vnp_CreateBy: performer,
            vnp_CreateDate: vnp_RequestId,
            vnp_IpAddr: ipAddress,
            vnp_OrderInfo: vnpOrderInfo,
            vnp_SecureHash,
        };
        const result = fetch(vnpApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataObject),
        })
            .then((res) => {
            return res.json();
        })
            .then(async (res) => {
            const { vnp_ResponseId, vnp_Command, vnp_ResponseCode, vnp_Message, vnp_TmnCode, vnp_TxnRef, vnp_Amount, vnp_OrderInfo, vnp_BankCode, vnp_PayDate, vnp_TransactionNo, vnp_TransactionType, vnp_TransactionStatus, vnp_SecureHash, } = res;
            const transaction = await transaction_service_1.default.createTransaction('VNPAY', {
                amount: vnp_Amount,
                order_id: vnp_TxnRef,
                code_gateway: 'VNPAY',
                currency: currency,
                trannsaction_type: transactionType,
                transaction_attributes: {
                    transDate: vnp_PayDate,
                    transType: vnp_BankCode,
                    payment_status: vnp_ResponseCode,
                    transactionNo: vnp_TransactionNo,
                },
            });
            return transaction;
        })
            .catch((error) => {
            throw new error_response_1.BadRequestError('An error occurred during the refund process. Please try again');
        });
        return result;
    }
}
exports.default = new VNPAYFacade(vnpay_gateway_1.vnpayConfig);
//# sourceMappingURL=vnpay.service.js.map