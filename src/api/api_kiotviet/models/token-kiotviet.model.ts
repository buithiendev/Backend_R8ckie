import { Schema, model } from 'mongoose'

const DOCUMENT_NAME = 'TokenKiotViet'
const COLLECTION_NAME = 'TokenKiotViets'

const productSchema = new Schema(
    {
        id: {type: Number, default: 1},
        retailer: { type: String, required: true },
        token: { type: String, required: true },
        expires: { type: Number, required: true },
    },
    {
        collection: COLLECTION_NAME,
    },
)

export default model(DOCUMENT_NAME, productSchema)
