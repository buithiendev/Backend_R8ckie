import { Router } from 'express'
import categoryController from '../../controllers/category.controller'
import asyncHandler from '../../helpers/asyncHandler'
import tokenController from '../../controllers/token.controller'

const router = Router()

router.get('/', asyncHandler(tokenController.getToken))

export default router
