import { NextFunction, Request, Response } from 'express'
import { CREATED, SuccessResponse } from '../core/success.response'
import collectionService from '../services/collection.service'
import { getPrototypeQuery } from '../utils'

class CollectionController {
    getAll = async (req: Request, res: Response, next: NextFunction) => {
        const query = getPrototypeQuery(req)

        new SuccessResponse({
            message: 'Get collections success',
            statusCode: 200,
            metadata: await collectionService.getAll(query),
        }).send(res)
    }

    findBySlug = async (req: Request, res: Response, next: NextFunction) => {
        const { slug } = req.params

        new SuccessResponse({
            message: 'Get collection success',
            statusCode: 200,
            metadata: await collectionService.findBySlug(slug),
        }).send(res)
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        new CREATED({
            message: 'Create collection success',
            statusCode: 201,
            metadata: await collectionService.create(req.body),
        }).send(res)
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        const { collection_id } = req.params

        new SuccessResponse({
            message: 'Delete collection success',
            statusCode: 200,
            metadata: await collectionService.delete(collection_id),
        }).send(res)
    }

    active = async (req: Request, res: Response, next: NextFunction) => {
        const { collection_id } = req.params

        new SuccessResponse({
            message: 'Active collection success',
            statusCode: 200,
            metadata: await collectionService.updateStatus(collection_id, {
                oldStatus: 'inactive',
                newStatus: 'active',
            }),
        }).send(res)
    }

    inActive = async (req: Request, res: Response, next: NextFunction) => {
        const { collection_id } = req.params

        new SuccessResponse({
            message: 'Inactive collection success',
            statusCode: 200,
            metadata: await collectionService.updateStatus(collection_id, {
                oldStatus: 'active',
                newStatus: 'inactive',
            }),
        }).send(res)
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        const { collection_id } = req.params

        new SuccessResponse({
            message: 'Update collection success',
            statusCode: 200,
            metadata: await collectionService.update(collection_id, req.body),
        }).send(res)
    }
}

export default new CollectionController()
