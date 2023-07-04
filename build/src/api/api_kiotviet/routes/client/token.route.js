"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const token_controller_1 = __importDefault(require("../../controllers/token.controller"));
const router = (0, express_1.Router)();
router.get('/', (0, asyncHandler_1.default)(token_controller_1.default.getToken));
exports.default = router;
//# sourceMappingURL=token.route.js.map