import { Schema, model } from 'mongoose'

const DOCUMENT_NAME = 'Kio_Product'
const COLLECTION_NAME = 'Kio_Products'

const productSchema = new Schema(
    {
        id: { type: String, required: true },
        description: { type: String },
        discribles: [{ type: String }],
    },
    {
        collection: COLLECTION_NAME,
    },
)

export default model(DOCUMENT_NAME, productSchema)
