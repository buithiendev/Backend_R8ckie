"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DOCUMENT_NAME = 'TokenKiotViet';
const COLLECTION_NAME = 'TokenKiotViets';
const productSchema = new mongoose_1.Schema({
    id: { type: Number, default: 1 },
    retailer: { type: String, required: true },
    token: { type: String, required: true },
    expires: { type: Number, required: true },
}, {
    collection: COLLECTION_NAME,
});
exports.default = (0, mongoose_1.model)(DOCUMENT_NAME, productSchema);
//# sourceMappingURL=token-kiotviet.model.js.map