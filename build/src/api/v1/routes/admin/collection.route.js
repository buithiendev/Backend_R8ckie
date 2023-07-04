"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_auth_1 = require("../../auth/admin.auth");
const collection_controller_1 = __importDefault(require("../../controllers/collection.controller"));
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const collection_validation_1 = require("../../validations/collection.validation");
const router = (0, express_1.default)();
router.use(admin_auth_1.authentication);
router.post('/create', collection_validation_1.validateCreationCollectionInput, (0, asyncHandler_1.default)(collection_controller_1.default.create));
router.post('/active/:collection_id', (0, asyncHandler_1.default)(collection_controller_1.default.active));
router.post('/inactive/:collection_id', (0, asyncHandler_1.default)(collection_controller_1.default.inActive));
router.delete('/:collection_id', (0, asyncHandler_1.default)(collection_controller_1.default.delete));
router.patch('/:collection_id', collection_validation_1.validateUpadateCollectionInput, (0, asyncHandler_1.default)(collection_controller_1.default.update));
exports.default = router;
//# sourceMappingURL=collection.route.js.map