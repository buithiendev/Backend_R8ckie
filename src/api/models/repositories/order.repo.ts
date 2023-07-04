import orderModel from '../order.model'

const findOrderByIdAndUserId = async (orderId: number, userId: string) => {
    return await orderModel
        .findOne({ _id: orderId, customer_id: userId })
        .lean()
        .exec()
}

const findOrderById = async (orderId: number) => {
    return await orderModel.findById(orderId)
}

export { findOrderById, findOrderByIdAndUserId }
