import { getSelectData } from '../../v1/utils'
import collectionModel from '../collection.model'

const findAllCollection = async (
    limit: number,
    page: number,
    sort: string,
    filter: {},
    select: string[],
) => {
    const skip = (page - 1) * limit
    const sortBy: { [key: string]: any } =
        sort === 'ctime' ? { _id: -1 } : { _id: 1 }

    const isFieldsProducts = select.includes('products')

    let query = collectionModel.find({
        ...filter,
        status: 'active',
    })
    if (isFieldsProducts) {
        query = query.populate({
            path: 'products',
            select: getSelectData([
                'product_name',
                'product_description',
                'product_images',
                'product_ratings_averager',
            ]),
            options: {
                limit: 10,
                skip: 0,
                sort: { _id: -1 },
                populate: [
                    {
                        path: 'product_variants',
                        options: {
                            limit: 1,
                            skip: 0,
                        },
                        select: getSelectData(['price']),
                    },
                    {
                        path: 'product_images',
                        options: {
                            limit: 10,
                            skip: 0,
                        },
                        select: getSelectData(['image_url', 'image_file_name']),
                    },
                ],
            },
            match: {
                isPublished: true,
            },
        })
    }

    return query
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(getSelectData(select))
        .lean()
        .exec()
}

const findCollectionBySlug = async (slug: string) => {
    return await collectionModel
        .findOne({
            slug: slug,
        })
        .lean()
}

const findCollectionById = async (collectionId: string) => {
    return await collectionModel.findOne({ _id: collectionId }).lean()
}

const addProductToCollection = async (
    collectionId: string,
    productId: string,
) => {
    return await collectionModel.updateOne(
        {
            _id: collectionId,
        },
        {
            $addToSet: {
                products: productId,
            },
        },
    )
}

export {
    addProductToCollection,
    findAllCollection,
    findCollectionById,
    findCollectionBySlug,
}
