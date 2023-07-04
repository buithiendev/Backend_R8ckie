"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpadateCollectionInput = exports.validateCreationCollectionInput = void 0;
const joi_1 = __importDefault(require("joi"));
const _1 = require(".");
const collection_interface_1 = require("../../models/interfaces/collection.interface");
const validateCreationCollectionInput = (0, _1.validateData)(joi_1.default.object({
    cat_name: joi_1.default.string().required(),
    cat_description: joi_1.default.string(),
    cat_images: joi_1.default.array().items(joi_1.default.string()),
    status: joi_1.default.string().valid(...Object.keys(collection_interface_1.CollectionStatus)),
}));
exports.validateCreationCollectionInput = validateCreationCollectionInput;
const validateUpadateCollectionInput = (0, _1.validateData)(joi_1.default.object({
    cat_name: joi_1.default.string(),
    cat_description: joi_1.default.string(),
}));
exports.validateUpadateCollectionInput = validateUpadateCollectionInput;
//# sourceMappingURL=collection.validation.js.map