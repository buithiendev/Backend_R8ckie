"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const success_response_1 = require("../core/success.response");
const collection_service_1 = __importDefault(require("../services/collection.service"));
const utils_1 = require("../utils");
class CollectionController {
    constructor() {
        this.getAll = async (req, res, next) => {
            const query = (0, utils_1.getPrototypeQuery)(req);
            new success_response_1.SuccessResponse({
                message: 'Get collections success',
                statusCode: 200,
                metadata: await collection_service_1.default.getAll(query),
            }).send(res);
        };
        this.findBySlug = async (req, res, next) => {
            const { slug } = req.params;
            new success_response_1.SuccessResponse({
                message: 'Get collection success',
                statusCode: 200,
                metadata: await collection_service_1.default.findBySlug(slug),
            }).send(res);
        };
        this.create = async (req, res, next) => {
            new success_response_1.CREATED({
                message: 'Create collection success',
                statusCode: 201,
                metadata: await collection_service_1.default.create(req.body),
            }).send(res);
        };
        this.delete = async (req, res, next) => {
            const { collection_id } = req.params;
            new success_response_1.SuccessResponse({
                message: 'Delete collection success',
                statusCode: 200,
                metadata: await collection_service_1.default.delete(collection_id),
            }).send(res);
        };
        this.active = async (req, res, next) => {
            const { collection_id } = req.params;
            new success_response_1.SuccessResponse({
                message: 'Active collection success',
                statusCode: 200,
                metadata: await collection_service_1.default.updateStatus(collection_id, {
                    oldStatus: 'inactive',
                    newStatus: 'active',
                }),
            }).send(res);
        };
        this.inActive = async (req, res, next) => {
            const { collection_id } = req.params;
            new success_response_1.SuccessResponse({
                message: 'Inactive collection success',
                statusCode: 200,
                metadata: await collection_service_1.default.updateStatus(collection_id, {
                    oldStatus: 'active',
                    newStatus: 'inactive',
                }),
            }).send(res);
        };
        this.update = async (req, res, next) => {
            const { collection_id } = req.params;
            new success_response_1.SuccessResponse({
                message: 'Update collection success',
                statusCode: 200,
                metadata: await collection_service_1.default.update(collection_id, req.body),
            }).send(res);
        };
    }
}
exports.default = new CollectionController();
//# sourceMappingURL=collection.controller.js.map