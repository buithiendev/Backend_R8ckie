import { Request, Response } from 'express'
import { SuccessResponse } from '../../core/success.response'
import vnpayService from '../../services/payment/vnpay.service'
import { convertParamsVNPay } from '../../utils'

class VNPayController {
    createPaymentVnpay = async (req: Request, res: Response) => {
        const { user } = req

        const paymentURL = await vnpayService.createPaymentUrl({
            ...req.body,
            userId: user.userId,
        })
        new SuccessResponse({
            message: 'Create payment URL success',
            statusCode: 200,
            metadata: paymentURL,
        }).redirect(res, paymentURL)
    }

    vnpayReturn = async (req: Request, res: Response) => {
        const payload = convertParamsVNPay(req)

        new SuccessResponse({
            message: 'Return url payment success',
            statusCode: 200,
            metadata: await vnpayService.vnpayReturn(payload),
        }).redirect(res, process.env.URL_REDIRECT_PAYMENT)
    }

    vnpayIPN = async (req: Request, res: Response) => {
        const payload = convertParamsVNPay(req)

        new SuccessResponse({
            message: 'IPN URL',
            statusCode: 200,
            metadata: await vnpayService.vnpayIPN(payload),
        }).send(res)
    }

    refundVNPay = async (req: Request, res: Response) => {
        const { user } = req
        const ipAddress = req.socket.remoteAddress || '::1'
        const { id_transaction } = req.params
        const { transactionType, refundAmount } = req.body

        new SuccessResponse({
            message: 'Refund transaction success',
            statusCode: 200,
            metadata: await vnpayService.refundVNPay(
                id_transaction,
                transactionType,
                refundAmount,
                user.email,
                ipAddress,
            ),
        }).send(res)
    }
}

export default new VNPayController()
