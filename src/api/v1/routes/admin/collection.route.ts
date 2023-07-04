import Router from 'express'
import { authentication } from '../../auth/admin.auth'
import collectionController from '../../controllers/collection.controller'
import asyncHandler from '../../helpers/asyncHandler'
import {
    validateCreationCollectionInput,
    validateUpadateCollectionInput,
} from '../../validations/collection.validation'

const router = Router()

router.use(authentication)

router.post(
    '/create',
    validateCreationCollectionInput,
    asyncHandler(collectionController.create),
)
router.post('/active/:collection_id', asyncHandler(collectionController.active))
router.post(
    '/inactive/:collection_id',
    asyncHandler(collectionController.inActive),
)
router.delete('/:collection_id', asyncHandler(collectionController.delete))
router.patch(
    '/:collection_id',
    validateUpadateCollectionInput,
    asyncHandler(collectionController.update),
)

export default router
