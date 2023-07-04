import Joi from 'joi'
import { validateData } from '.'
import { CollectionStatus } from '../../models/interfaces/collection.interface'

const validateCreationCollectionInput = validateData(
    Joi.object({
        cat_name: Joi.string().required(),
        cat_description: Joi.string(),
        cat_images: Joi.array().items(Joi.string()),
        status: Joi.string().valid(...Object.keys(CollectionStatus)),
    }),
)

const validateUpadateCollectionInput = validateData(
    Joi.object({
        cat_name: Joi.string(),
        cat_description: Joi.string(),
    }),
)

export { validateCreationCollectionInput, validateUpadateCollectionInput }
