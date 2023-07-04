import collectionModel from '../../models/collection.model'
import Collection from '../../models/interfaces/collection.interface'
import {
    findAllCollection,
    findCollectionBySlug,
} from '../../models/repositories/collection.repo'
import { BadRequestError } from '../core/error.response'
import { QueryParams } from '../interfaces'
import ICollectionService, {
    CreateCollectionPayload,
    StatusUpdate,
    UpdateCollectionPayload,
} from '../interfaces/collection/Collection.interface'
import { removeUndefinedObject } from '../utils'

class CollectionService implements ICollectionService {
    async getAll({
        limit = 50,
        page = 1,
        sort = 'ctime',
        filter = {},
        fields = ['cat_name', '_id', 'cat_images', 'slug'],
    }: Partial<QueryParams>) {
        return await findAllCollection(limit, page, sort, filter, fields)
    }

    async findBySlug(slug: string) {
        return await findCollectionBySlug(slug)
    }

    async create(payload: CreateCollectionPayload): Promise<Collection> {
        return await collectionModel.create({ ...payload })
    }

    async delete(collectionId: string): Promise<number> {
        const { deletedCount } = await collectionModel.deleteOne({
            _id: collectionId,
        })
        return deletedCount
    }

    async updateStatus(
        collectionId: string,
        status: StatusUpdate,
    ): Promise<Collection> {
        const filter = {
                _id: collectionId,
                status: status.oldStatus,
            },
            update = {
                status: status.newStatus,
            }
        const collection = await collectionModel
            .findOneAndUpdate(filter, update, { new: true })
            .select('status _id')
        if (!collection) throw new BadRequestError('Collection not found')
        return collection
    }

    async update(
        collectionId: string,
        payload: UpdateCollectionPayload,
    ): Promise<Collection | null> {
        const filter = { _id: collectionId }
        const collection = await collectionModel.findOneAndUpdate(
            filter,
            removeUndefinedObject(payload),
            {
                returnDocument: 'after',
            },
        )

        return collection
    }
}

export default new CollectionService()
