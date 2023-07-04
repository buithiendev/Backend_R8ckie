"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const node_cron_1 = __importDefault(require("node-cron"));
const routes_1 = __importDefault(require("./api/api_kiotviet/routes"));
const api_1 = require("./api/api_kiotviet/utils/api");
const error_response_1 = require("./api/v1/core/error.response");
const routes_2 = __importDefault(require("./api/v1/routes"));
const swagger_config_1 = require("./configs/swagger.config");
const CRON_JOB_SCHEDULE = '25 16 * * *';
dotenv_1.default.config();
const app = (0, express_1.default)();
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};
// init middlewares
app.use((0, cors_1.default)(corsOptions));
app.use((0, morgan_1.default)('dev'));
app.use((0, compression_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
// init db
require('./databases/init.mongodb');
// init routes-
app.use('/v1', routes_2.default);
app.use('/v2', routes_1.default);
app.use('/', swagger_config_1.providerSwaggerUI, swagger_config_1.setupDocSwagger);
node_cron_1.default.schedule(CRON_JOB_SCHEDULE, api_1.getToken);
// handling error
app.use((req, res, next) => {
    const error = new error_response_1.ErrorResponse('Not found', 404);
    next(error);
});
app.use((error, req, res, next) => {
    // logEvents(
    //     `Id-Error:${uuid()}----[${req.method}]----${req.url}----${
    //         error.message
    //     }`,
    // )
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        statusCode: statusCode,
        stack: error.stack,
        message: error.message || 'Internal server error',
        metadata: null,
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map