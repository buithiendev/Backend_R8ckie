"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_kiotviet_model_1 = __importDefault(require("../models/token-kiotviet.model"));
class TokenService {
    async getToken() {
        const token = await token_kiotviet_model_1.default
            .findOne({ id: 1 })
            .lean()
            .select('token retailer');
        return token;
    }
}
exports.default = new TokenService();
//# sourceMappingURL=token.service.js.map