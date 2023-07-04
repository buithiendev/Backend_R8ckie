import { QueryParams } from '..'
import Collection, {
    CollectionStatus,
} from '../../../models/interfaces/collection.interface'

export type CreateCollectionPayload = Pick<
    Collection,
    'cat_name' | 'cat_description' | 'cat_images' | 'status'
>

export type UpdateCollectionPayload = Pick<
    Collection,
    'cat_name' | 'cat_description'
>

export type StatusUpdate = {
    oldStatus: keyof typeof CollectionStatus
    newStatus: keyof typeof CollectionStatus
}

interface ICollectionService {
    getAll(query: QueryParams): Promise<Collection[]>
    findBySlug(slug: string): Promise<Collection | null>
    create(payload: CreateCollectionPayload): Promise<Collection>
    update(
        collectionId: string,
        payload: UpdateCollectionPayload,
    ): Promise<Collection | null>
    updateStatus(collctionId: string, status: StatusUpdate): Promise<Collection>
    delete(collectionId: string): Promise<number>
}

export default ICollectionService
