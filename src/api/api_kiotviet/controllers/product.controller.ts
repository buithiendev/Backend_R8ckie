import { NextFunction, Request, Response } from 'express'
import { SuccessResponse } from '../core/success.response'
import productService from '../services/product.service'
import { convertParamToString, getPrototypeQuery } from '../utils'

class ProductController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        const { filter } = getPrototypeQuery(req)

        console.log('first')
        new SuccessResponse({
            message: 'Get product success',
            statusCode: 200,
            metadata: await productService.getAll(
                convertParamToString(filter || {}),
            ),
        }).send(res)
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        const { filter } = getPrototypeQuery(req)
        const { id } = req.params

        new SuccessResponse({
            message: 'Get product success',
            statusCode: 200,
            metadata: await productService.getById(
                id,
                convertParamToString(filter || {}),
            ),
        }).send(res)
    }

    async getProductByCateSlug(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        const { filter } = getPrototypeQuery(req)
        const { slug } = req.params

        new SuccessResponse({
            message: 'Get products success',
            statusCode: 200,
            metadata: await productService.getProductByCateSlug(
                slug,
                convertParamToString(filter || {}),
            ),
        }).send(res)
    }
}

export default new ProductController()
