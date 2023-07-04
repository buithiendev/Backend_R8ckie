import { NextFunction, Request, Response } from 'express'
import { SuccessResponse } from '../core/success.response'
import cartService from '../services/cart.service'

class CartController {
    addToCart = async (req: Request, res: Response, next: NextFunction) => {
        const { user, product } = req

        new SuccessResponse({
            message: 'Add product to cart success',
            statusCode: 200,
            metadata: await cartService.addToCart(user.userId, {
                ...req.body,
            }, product),
        }).send(res)
    }

    updateCartItem = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { user } = req

        new SuccessResponse({
            message: 'Update quantity success',
            statusCode: 200,
            metadata: await cartService.updateCartItem(user.userId, {
                ...req.body,
            }),
        }).send(res)
    }

    removeCartItem = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { user } = req

        new SuccessResponse({
            message: 'Delete cart in product success',
            statusCode: 200,
            metadata: await cartService.removeCartItem(user.userId, {
                ...req.body,
            }),
        }).send(res)
    }

    getCart = async (req: Request, res: Response, next: NextFunction) => {
        const { user } = req

        new SuccessResponse({
            message: 'Get cart success!!',
            statusCode: 200,
            metadata: await cartService.getCart(user.userId),
        }).send(res)
    }
}

export default new CartController()
