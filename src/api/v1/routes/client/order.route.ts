import { Router } from 'express'
import { customerOrderController as OrderController } from '../../controllers/order.controller'
import asyncHandler from '../../helpers/asyncHandler'
import { authentication } from '../../auth/customer.auth'
import { validateOrderCreationInput } from '../../validations/order.validation'

const router = Router()

router.use(authentication)

router.post('/', validateOrderCreationInput ,asyncHandler(OrderController.create))
router.get('/:order_id', asyncHandler(OrderController.getOrderById))
router.get('/', asyncHandler(OrderController.getAllOrder))

export default router
