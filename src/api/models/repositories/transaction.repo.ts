import schemas from '../transaction.model'

const findTransactionById = async (transactionId: string, filter?: {}) => {
    return await schemas.transaction
        .findOne({
            _id: transactionId,
            ...filter,
        })
        .populate('transaction_attributes')
        .lean()
        .exec()
}

export { findTransactionById }
