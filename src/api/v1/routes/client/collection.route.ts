import Router from 'express'
import collectionController from '../../controllers/collection.controller'
import asyncHandler from '../../helpers/asyncHandler'

const router = Router()

router.get('/:slug', asyncHandler(collectionController.findBySlug))
router.get('/', asyncHandler(collectionController.getAll))

export default router
