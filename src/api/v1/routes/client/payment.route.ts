import Router from 'express'
import { authentication } from '../../auth/customer.auth'
import vnpayController from '../../controllers/payment/vnpay.controller'
import asyncHandler from '../../helpers/asyncHandler'
import { validateVNPayCreateURLInput } from '../../validations/payment.validation'
const router = Router()

router.get('/vnpay_return', asyncHandler(vnpayController.vnpayReturn))
router.get('/vnp_ipn', asyncHandler(vnpayController.vnpayIPN))

router.use(authentication)
router.post(
    '/create_vnpay_payment_url',
    validateVNPayCreateURLInput,
    asyncHandler(vnpayController.createPaymentVnpay),
)

export default router
