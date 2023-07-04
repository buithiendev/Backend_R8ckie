import Router from 'express'
import { authentication } from '../../auth/admin.auth'
import vnpayController from '../../controllers/payment/vnpay.controller'
import asyncHandler from '../../helpers/asyncHandler'
import { validateVNPayRefundInput } from '../../validations/payment.validation'
const router = Router()

router.use(authentication)

router.post(
    '/refund_vnp/:id_transaction',
    validateVNPayRefundInput,
    asyncHandler(vnpayController.refundVNPay),
)

export default router
