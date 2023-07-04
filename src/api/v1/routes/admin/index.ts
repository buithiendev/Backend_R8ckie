import { Router } from 'express'
import adminRoute from './admin.route'
import collectionRoute from './collection.route'
import customerRoute from './customer.route'
import discountRoute from './discount.route'
import orderRoute from './order.route'
import paymentRoute from './payment.route'
import productRoute from './product.route'
import promotionRoute from './promotion.route'

const router = Router()

router.use('/api/customers', customerRoute)
router.use('/api/admin', adminRoute)
router.use('/api/products', productRoute)
router.use('/api/promotions', promotionRoute)
router.use('/api/discounts', discountRoute)
router.use('/api/orders', orderRoute)
router.use('/api/collections', collectionRoute)
router.use('/api/payment', paymentRoute)

export default router
