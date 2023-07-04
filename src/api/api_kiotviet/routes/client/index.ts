import { Router } from 'express'
import productRoute from './product.route'
import categoriesRoute from './categories.route'
import tokenRoute from './token.route'

const router = Router()

router.use('/api/products', productRoute)
router.use('/api/categories', categoriesRoute)
router.use('/api/token',tokenRoute)

export default router
