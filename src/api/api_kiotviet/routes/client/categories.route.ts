import { Router } from 'express'
import categoryController from '../../controllers/category.controller'
import asyncHandler from '../../helpers/asyncHandler'

const router = Router()

router.get('/', asyncHandler(categoryController.getAll))
router.get('/getIdBySlug/:slug', asyncHandler(categoryController.getIdBySlug))

export default router
