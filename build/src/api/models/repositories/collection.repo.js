"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCollectionBySlug = exports.findCollectionById = exports.findAllCollection = exports.addProductToCollection = void 0;
const utils_1 = require("../../v1/utils");
const collection_model_1 = __importDefault(require("../collection.model"));
const findAllCollection = async (limit, page, sort, filter, select) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 };
    const isFieldsProducts = select.includes('products');
    let query = collection_model_1.default.find({
        ...filter,
        status: 'active',
    });
    if (isFieldsProducts) {
        query = query.populate({
            path: 'products',
            select: (0, utils_1.getSelectData)([
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
                        select: (0, utils_1.getSelectData)(['price']),
                    },
                    {
                        path: 'product_images',
                        options: {
                            limit: 10,
                            skip: 0,
                        },
                        select: (0, utils_1.getSelectData)(['image_url', 'image_file_name']),
                    },
                ],
            },
            match: {
                isPublished: true,
            },
        });
    }
    return query
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select((0, utils_1.getSelectData)(select))
        .lean()
        .exec();
};
exports.findAllCollection = findAllCollection;
const findCollectionBySlug = async (slug) => {
    return await collection_model_1.default
        .findOne({
        slug: slug,
    })
        .lean();
};
exports.findCollectionBySlug = findCollectionBySlug;
const findCollectionById = async (collectionId) => {
    return await collection_model_1.default.findOne({ _id: collectionId }).lean();
};
exports.findCollectionById = findCollectionById;
const addProductToCollection = async (collectionId, productId) => {
    return await collection_model_1.default.updateOne({
        _id: collectionId,
    }, {
        $addToSet: {
            products: productId,
        },
    });
};
exports.addProductToCollection = addProductToCollection;
//# sourceMappingURL=collection.repo.js.map