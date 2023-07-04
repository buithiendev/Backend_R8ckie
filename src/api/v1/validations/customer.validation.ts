import Joi from 'joi'
import { validateData } from '.'

// const REGEX_CHECKEMAIL =
const REGEX_CHECKEMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const sharedMessages = {
    email: {
        'string.empty': '{{#label}} is not allowed to be empty',
        'string.regex': '{{#label}} must be a valid email',
        'any.required': '{{#label}} is required',
    },
    password: {
        'string.min':
            '{{#label}} length must be at least {#limit} characters long',
        'string.max':
            '{{#label}} length must be less than or equal to {#limit} characters long',
        'any.required': '{{#label}} is required',
    },
    firstName: {
        'string.empty': '{{#label}} is not allowed to be empty',
        'any.required': '{{#label}} is required',
    },
    lastName: {
        'string.empty': '{{#label}} is not allowed to be empty',
        'any.required': '{{#label}} is required',
    },
}

const validationLoginCustomer = validateData(
    Joi.object({
        email: Joi.string()
            .regex(REGEX_CHECKEMAIL)
            .required()
            .messages(sharedMessages.email),
        password: Joi.string()
            .min(6)
            .max(20)
            .required()
            .messages(sharedMessages.password),
    }),
)

const validationRegisterCustomer = validateData(
    Joi.object({
        first_name: Joi.string().required().messages(sharedMessages.firstName),
        last_name: Joi.string().required().messages(sharedMessages.lastName),
        email: Joi.string()
            .regex(REGEX_CHECKEMAIL)
            .min(9)
            .max(100)
            .required()
            .messages(sharedMessages.email),
        password: Joi.string()
            .min(6)
            .max(20)
            .required()
            .messages(sharedMessages.password),
        repeat_password: Joi.any()
            .valid(Joi.ref('password'))
            .required()
            .messages({
                'any.only': 'Repeat password must be password',
            }),
    }),
)

export { validationLoginCustomer, validationRegisterCustomer }
