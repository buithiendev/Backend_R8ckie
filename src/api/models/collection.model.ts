import { Schema, Types, model } from 'mongoose'
import slugify from 'slugify'
import Category, { CollectionStatus } from './interfaces/collection.interface'

const DOCUMENT_NAME = 'Collection'
const COLLECTION_NAME = 'Collections'

const collectionSchema = new Schema<Category>(
    {
        cat_name: { type: String, required: true },
        cat_description: { type: String },
        cat_images: [{ type: String }],
        products: [{ type: Types.ObjectId, ref: 'Product' }],
        slug: { type: String, index: true },
        status: {
            type: String,
            enum: [...Object.keys(CollectionStatus)],
            default: 'active',
        },
    },
    {
        collection: COLLECTION_NAME,
        timestamps: true,
    },
)

collectionSchema.index({ slug: 1 })
collectionSchema.pre('save', function (next) {
    this.slug = slugify(this.cat_name, { lower: true })
    next()
})

export default model<Category>(DOCUMENT_NAME, collectionSchema)
