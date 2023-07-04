import { Router } from 'express'
import { authentication } from '../../auth/customer.auth'
import cartController from '../../controllers/cart.controller'
import asyncHandler from '../../helpers/asyncHandler'
import { checkItemExists } from '../../middlewares/cart'
import {
    validateAddItemCart,
    validateDeleteItem,
    validateUpdateItemCart,
} from '../../validations/cart.validation'
const router = Router()

router.use(authentication)

router.get('/', asyncHandler(cartController.getCart))
router.post(
    '/',
    validateAddItemCart,
    checkItemExists,
    asyncHandler(cartController.addToCart),
)
router.post(
    '/update',
    validateUpdateItemCart,
    checkItemExists,
    asyncHandler(cartController.updateCartItem),
)
router.delete(
    '/',
    validateDeleteItem,
    checkItemExists,
    asyncHandler(cartController.removeCartItem),
)

export default router
