import { NextFunction, Request, Response } from 'express'
import { findProductByIdAndVariantId } from '../../models/repositories/product.repo'
import { BadRequestError } from '../core/error.response'
import asyncHandler from '../helpers/asyncHandler'

const checkItemExists = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { product_id, product_variant_id } = req.body
        const product = await findProductByIdAndVariantId(
            product_id,
            product_variant_id,
            [],
        )

        if (product) {
            req.product = product
            return next()
        }
        throw new BadRequestError('Product not found')
    },
)

export { checkItemExists }
