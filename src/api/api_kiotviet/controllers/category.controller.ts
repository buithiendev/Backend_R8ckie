import { NextFunction, Request, Response } from 'express'
import { SuccessResponse } from '../core/success.response'
import categoryService from '../services/category.service'
import { getPrototypeQuery } from '../utils'

class CategoryController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        const { limit } = getPrototypeQuery(req)

        new SuccessResponse({
            message: 'Get category success',
            statusCode: 200,
            metadata: await categoryService.getAll(limit || 20),
        }).send(res)
    }

    async getIdBySlug(req: Request, res: Response, next: NextFunction) {
        const {slug} = req.params

        new SuccessResponse({
            message: 'Get id success',
            statusCode: 200,
            metadata: await categoryService.getObjectId(slug)
        }).send(res)
    }
}

export default new CategoryController()
