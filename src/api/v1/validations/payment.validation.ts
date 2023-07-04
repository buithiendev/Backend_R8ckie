import Joi from 'joi'
import { validateData } from '.'
import { TransactionType } from '../../models/interfaces/transaction/transaction.interface'
import { BankCode, Locale } from '../interfaces/payment/VNPayService.interface'

const validateVNPayCreateURLInput = validateData(
    Joi.object({
        orderId: Joi.number().required(),
        locale: Joi.string().valid(...Object.keys(Locale)),
        bankCode: Joi.string().valid(...Object.keys(BankCode)),
    }),
)

const validateVNPayRefundInput = validateData(
    Joi.object({
        transactionType: Joi.string()
            .valid(...Object.keys(TransactionType))
            .required(),
        refundAmount: Joi.number().positive().required(),
    }),
)

export { validateVNPayCreateURLInput, validateVNPayRefundInput }
