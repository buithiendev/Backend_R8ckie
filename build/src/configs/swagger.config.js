"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDocSwagger = exports.providerSwaggerUI = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const PATH_SWAGGER_JSON = process.env.NODE_ENV === 'development'
    ? '../../swagger.json'
    : '../../../swagger.json';
const providerSwaggerUI = swagger_ui_express_1.default.serve;
exports.providerSwaggerUI = providerSwaggerUI;
const setupDocSwagger = swagger_ui_express_1.default.setup(require(PATH_SWAGGER_JSON), {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
});
exports.setupDocSwagger = setupDocSwagger;
//# sourceMappingURL=swagger.config.js.map