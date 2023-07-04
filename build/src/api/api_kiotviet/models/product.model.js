"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DOCUMENT_NAME = 'Kio_Product';
const COLLECTION_NAME = 'Kio_Products';
const productSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    description: { type: String },
    discribles: [{ type: String }],
}, {
    collection: COLLECTION_NAME,
});
exports.default = (0, mongoose_1.model)(DOCUMENT_NAME, productSchema);
//# sourceMappingURL=product.model.js.map