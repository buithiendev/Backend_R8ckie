import Joi from 'joi'
import { validateData } from '.'

const validateCreateAddress = validateData(
    Joi.object({
        address1: Joi.string().required(),
        address2: Joi.string(),
        country_code: Joi.string(),
        country: Joi.string(),
        province_code: Joi.number().integer().positive().required(),
        province: Joi.string(),
        district_code: Joi.number().integer().positive().required(),
        district: Joi.string(),
        ward_code: Joi.number().integer().positive().required(),
        ward: Joi.string(),
        company: Joi.string(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        phone_number: Joi.string().min(6).max(15).required(),
        default: Joi.boolean(),
    }),
)

const validateUpdateAddress = validateData(
    Joi.object({
        address1: Joi.string(),
        address2: Joi.string(),
        country_code: Joi.string(),
        country: Joi.string(),
        province_code: Joi.number().integer().positive().required(),
        province: Joi.string(),
        district_code: Joi.number().integer().positive().required(),
        district: Joi.string(),
        ward_code: Joi.number().integer().positive().required(),
        ward: Joi.string(),
        company: Joi.string(),
        first_name: Joi.string(),
        last_name: Joi.string(),
        phone_number: Joi.string().min(6).max(15),
        default: Joi.boolean(),
    }),
)

export { validateCreateAddress, validateUpdateAddress }
