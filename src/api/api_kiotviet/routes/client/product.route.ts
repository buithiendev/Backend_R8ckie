import { Router } from 'express'
import productController from '../../controllers/product.controller'
import asyncHandler from '../../helpers/asyncHandler'

const router = Router()

router.get('/:id', asyncHandler(productController.getById))
router.get('/', asyncHandler(productController.getAll))
router.get(
    '/getBySlug/:slug',
    asyncHandler(productController.getProductByCateSlug),
)

export default router
