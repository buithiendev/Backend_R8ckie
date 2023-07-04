import { Router } from 'express'
import { authentication } from '../../auth/admin.auth'
import { adminOrderController as OrderController } from '../../controllers/order.controller'
import asyncHandler from '../../helpers/asyncHandler'
const router = Router()

router.use(authentication)

router.get('/count', asyncHandler(OrderController.countOrder))
router.post('/:order_id/confirm', asyncHandler(OrderController.confirmOrder))
router.post('/:order_id/close', asyncHandler(OrderController.closeOrder))
router.post('/:order_id/open', asyncHandler(OrderController.openOrder))
router.post('/:order_id/cancel', asyncHandler(OrderController.cancelOrder))
// router.patch('/:order_id', asyncHandler(OrderController.closeOrder))
// router.post('/:order_id/tags', asyncHandler(OrderController.closeOrder))
// router.delete('/:order_id/tags', asyncHandler(OrderController.closeOrder))
router.get('/:order_id', asyncHandler(OrderController.getOrderById))
router.get('/', asyncHandler(OrderController.getAllOrder))

export default router
