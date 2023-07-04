"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const success_response_1 = require("../core/success.response");
const token_service_1 = __importDefault(require("../services/token.service"));
class TokenController {
    async getToken(req, res, next) {
        new success_response_1.SuccessResponse({
            message: 'Get category success',
            statusCode: 200,
            metadata: await token_service_1.default.getToken(),
        }).send(res);
    }
}
exports.default = new TokenController();
//# sourceMappingURL=token.controller.js.map