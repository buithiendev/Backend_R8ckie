"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const collection_model_1 = __importDefault(require("../../models/collection.model"));
const collection_repo_1 = require("../../models/repositories/collection.repo");
const error_response_1 = require("../core/error.response");
const utils_1 = require("../utils");
class CollectionService {
    async getAll({ limit = 50, page = 1, sort = 'ctime', filter = {}, fields = ['cat_name', '_id', 'cat_images', 'slug'], }) {
        return await (0, collection_repo_1.findAllCollection)(limit, page, sort, filter, fields);
    }
    async findBySlug(slug) {
        return await (0, collection_repo_1.findCollectionBySlug)(slug);
    }
    async create(payload) {
        return await collection_model_1.default.create({ ...payload });
    }
    async delete(collectionId) {
        const { deletedCount } = await collection_model_1.default.deleteOne({
            _id: collectionId,
        });
        return deletedCount;
    }
    async updateStatus(collectionId, status) {
        const filter = {
            _id: collectionId,
            status: status.oldStatus,
        }, update = {
            status: status.newStatus,
        };
        const collection = await collection_model_1.default
            .findOneAndUpdate(filter, update, { new: true })
            .select('status _id');
        if (!collection)
            throw new error_response_1.BadRequestError('Collection not found');
        return collection;
    }
    async update(collectionId, payload) {
        const filter = { _id: collectionId };
        const collection = await collection_model_1.default.findOneAndUpdate(filter, (0, utils_1.removeUndefinedObject)(payload), {
            returnDocument: 'after',
        });
        return collection;
    }
}
exports.default = new CollectionService();
//# sourceMappingURL=collection.service.js.map