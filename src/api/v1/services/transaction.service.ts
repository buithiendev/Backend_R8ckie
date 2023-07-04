import { CURRENCY, GATEWAYCODE } from '../../models/interfaces/order.interface'
import ITransaction, {
    TransactionType as TransactionTypes,
} from '../../models/interfaces/transaction/transaction.interface'
import { findTransactionById } from '../../models/repositories/transaction.repo'
import schemas from '../../models/transaction.model'
import { BadRequestError } from '../core/error.response'

type IPaymentMethodRegistry<T> = {
    [key: string]: new (payload: ITransaction) => T
}

type TransactionType = VNPAY

class TransactionFactory {
    static paymentMethodRegistry: IPaymentMethodRegistry<TransactionType> = {}

    static registerPaymentMethod(
        type: keyof typeof GATEWAYCODE,
        classRef: any,
    ) {
        TransactionFactory.paymentMethodRegistry[type] = classRef
    }

    static async createTransaction(
        type: keyof typeof GATEWAYCODE,
        payload: ITransaction,
    ) {
        const classTransaction = TransactionFactory.paymentMethodRegistry[type]

        if (!classTransaction) {
            throw new BadRequestError(`Invalid gateway type ${type}`)
        }
        return new classTransaction(payload).createTransaction()
    }

    static async findTransactionById(transactionId: string) {
        return await findTransactionById(transactionId)
    }
}

class Transaction implements ITransaction {
    amount: number
    code_gateway: keyof typeof GATEWAYCODE
    order_id: number
    currency: keyof typeof CURRENCY
    trannsaction_type: keyof typeof TransactionTypes
    transaction_attributes: any

    constructor({
        amount,
        code_gateway,
        order_id,
        currency,
        transaction_attributes,
        trannsaction_type,
    }: ITransaction) {
        this.amount = amount
        this.code_gateway = code_gateway
        this.order_id = order_id
        this.currency = currency
        this.trannsaction_type = trannsaction_type
        this.transaction_attributes = transaction_attributes
    }

    async createTransaction(transactionId: string) {
        const newTransaction = await schemas.transaction.create({
            ...this,
            _id: transactionId,
        })
        return newTransaction
    }
}

class VNPAY extends Transaction {
    constructor(transaction: ITransaction) {
        super(transaction)
    }

    async createTransaction() {
        const transactionVNPay = await schemas.vnpay.create({
            ...this.transaction_attributes,
        })

        if (!transactionVNPay) {
            throw new BadRequestError('Create transaction for VNPay Error')
        }
        const newTransaction = await super.createTransaction(
            transactionVNPay._id.toString(),
        )

        if (!newTransaction) {
            throw new BadRequestError('Create new transaction error')
        }

        return newTransaction
    }
}

//Register payment method
TransactionFactory.registerPaymentMethod('VNPAY', VNPAY)

export default TransactionFactory
