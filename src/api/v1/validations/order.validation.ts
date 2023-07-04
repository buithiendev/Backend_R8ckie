import Joi from 'joi'
import { REGEX_ID, validateData } from '.'
import { CURRENCY, GATEWAYCODE } from '../../models/interfaces/order.interface'
import { validateCreateAddress } from './address.validation'

const lineItemSchema = Joi.object({
    product_id: Joi.string().regex(REGEX_ID).required(),
    variant_id: Joi.string().regex(REGEX_ID).required(),
    quantity: Joi.number().integer().positive().required(),
})

const validateOrderCreationInput = validateData(
    Joi.object({
        line_items: Joi.array().items(lineItemSchema).required(),
        // shipping_address: validateCreateAddress,
        shipping_address: Joi.object(),
        discount_code: Joi.array().items(
            Joi.object({
                discount_id: Joi.string().required(),
            }),
        ),
        customer_id: Joi.string().regex(REGEX_ID),
        currency: Joi.string().valid(...Object.keys(CURRENCY)),
        note: Joi.string(),
        gateway_code: Joi.string().valid(...Object.keys(GATEWAYCODE)),
    }),
)

export { validateOrderCreationInput }
