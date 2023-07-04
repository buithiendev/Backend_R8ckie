import Joi from 'joi'
import { REGEX_ID, validateData } from '.'

const validateAddItemCart = validateData(
    Joi.object({
        product_id: Joi.string().required(),
        product_variant_id: Joi.string().required(),
        quantity: Joi.number().integer().positive().required(),
    }),
)

const validateDeleteItem = validateData(
    Joi.object({
        product_id: Joi.string().regex(REGEX_ID).required(),
        product_variant_id: Joi.string().regex(REGEX_ID).required(),
    }),
)

const validateUpdateItemCart = validateData(
    Joi.object({
        product_id: Joi.string().regex(REGEX_ID).required(),
        product_variant_id: Joi.string().regex(REGEX_ID).required(),
        quantity: Joi.number().integer().positive().required(),
        old_quantity: Joi.number().integer().positive().required(),
    }),
)

export { validateAddItemCart, validateDeleteItem, validateUpdateItemCart }
