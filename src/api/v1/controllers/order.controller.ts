import { Request, Response } from 'express'
import { CREATED, SuccessResponse } from '../core/success.response'
import orderService from '../services/order.service'
import { getPrototypeQuery } from '../utils'

class CustomerOrderController {
    static instance: CustomerOrderController

    create = async (req: Request, res: Response) => {
        const { user } = req
        new CREATED({
            message: 'Create order success',
            statusCode: 201,
            metadata: await orderService.create({ ...req.body }, user.userId),
        }).send(res)
    }

    getAllOrder = async (req: Request, res: Response) => {
        const { user } = req
        const query = getPrototypeQuery(req)

        new SuccessResponse({
            message: 'Get order for customer success',
            statusCode: 200,
            metadata: await orderService.getAllOrderOfCustomer(
                user.userId,
                query,
            ),
        }).send(res)
    }

    getOrderById = async (req: Request, res: Response) => {
        const { user } = req
        const { order_id } = req.params

        new SuccessResponse({
            message: 'Get order success',
            statusCode: 200,
            metadata: await orderService.getOrderById(user.userId, order_id),
        }).send(res)
    }

    static getInstance = () => {
        if (!CustomerOrderController.instance) {
            CustomerOrderController.instance = new CustomerOrderController()
        }

        return CustomerOrderController.instance
    }
}

class AdminOrderController {
    static instance: AdminOrderController

    confirmOrder = async (req: Request, res: Response) => {
        const { order_id } = req.params

        new SuccessResponse({
            message: 'Create order success',
            statusCode: 200,
            metadata: await orderService.confirmOrder(order_id),
        }).send(res)
    }

    closeOrder = async (req: Request, res: Response) => {
        const { order_id } = req.params

        new SuccessResponse({
            message: 'Create order success',
            statusCode: 200,
            metadata: await orderService.closeOrder(order_id),
        }).send(res)
    }

    openOrder = async (req: Request, res: Response) => {
        const { order_id } = req.params

        new SuccessResponse({
            message: 'Create order success',
            statusCode: 200,
            metadata: await orderService.openOrder(order_id),
        }).send(res)
    }

    cancelOrder = async (req: Request, res: Response) => {
        const { order_id } = req.params

        new SuccessResponse({
            message: 'Create order success',
            statusCode: 200,
            metadata: await orderService.cancelOrder(order_id),
        }).send(res)
    }

    getOrderById = async (req: Request, res: Response) => {
        const { order_id } = req.params

        new SuccessResponse({
            message: 'Create order success',
            statusCode: 200,
            metadata: await orderService.getOrderIdForAdmin(order_id),
        }).send(res)
    }

    getAllOrder = async (req: Request, res: Response) => {
        new SuccessResponse({
            message: 'Create order success',
            statusCode: 200,
            metadata: await orderService.getAllOrderForAdmin(),
        }).send(res)
    }

    countOrder = async (req: Request, res: Response) => {
        new SuccessResponse({
            message: 'Create order success',
            statusCode: 200,
            metadata: await orderService.countOrder(),
        }).send(res)
    }

    static getInstance = () => {
        if (!AdminOrderController.instance) {
            AdminOrderController.instance = new AdminOrderController()
        }

        return AdminOrderController.instance
    }
}

const customerOrderController = CustomerOrderController.getInstance()
const adminOrderController = AdminOrderController.getInstance()

export { adminOrderController, customerOrderController }
