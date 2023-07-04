import { Router } from 'express'
import customerRoute from './access.customer.route'
import addressRoute from './address.route'
import cartRoute from './cart.route'
import collectionRoute from './collection.route'
import discountRoute from './discount.route'
import orderRoute from './order.route'
import checkoutRoute from './payment.route'
import productRoute from './product.route'
import promotionRoute from './promotion.route'

const router = Router()

router.use('/api/customers', customerRoute)
router.use('/api/customers/address', addressRoute)
router.use('/api/products', productRoute)
router.use('/api/promotions', promotionRoute)
router.use('/api/discounts', discountRoute)
router.use('/api/orders', orderRoute)
router.use('/api/checkout', checkoutRoute)
router.use('/api/cart', cartRoute)
router.use('/api/collections', collectionRoute)

export default router
