"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const collection_interface_1 = require("./interfaces/collection.interface");
const DOCUMENT_NAME = 'Collection';
const COLLECTION_NAME = 'Collections';
const collectionSchema = new mongoose_1.Schema({
    cat_name: { type: String, required: true },
    cat_description: { type: String },
    cat_images: [{ type: String }],
    products: [{ type: mongoose_1.Types.ObjectId, ref: 'Product' }],
    slug: { type: String, index: true },
    status: {
        type: String,
        enum: [...Object.keys(collection_interface_1.CollectionStatus)],
        default: 'active',
    },
}, {
    collection: COLLECTION_NAME,
    timestamps: true,
});
collectionSchema.index({ slug: 1 });
collectionSchema.pre('save', function (next) {
    this.slug = (0, slugify_1.default)(this.cat_name, { lower: true });
    next();
});
exports.default = (0, mongoose_1.model)(DOCUMENT_NAME, collectionSchema);
//# sourceMappingURL=collection.model.js.map