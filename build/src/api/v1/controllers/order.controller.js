"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerOrderController = exports.adminOrderController = void 0;
const success_response_1 = require("../core/success.response");
const order_service_1 = __importDefault(require("../services/order.service"));
const utils_1 = require("../utils");
class CustomerOrderController {
    constructor() {
        this.create = async (req, res) => {
            const { user } = req;
            new success_response_1.CREATED({
                message: 'Create order success',
                statusCode: 201,
                metadata: await order_service_1.default.create({ ...req.body }, user.userId),
            }).send(res);
        };
        this.getAllOrder = async (req, res) => {
            const { user } = req;
            const query = (0, utils_1.getPrototypeQuery)(req);
            new success_response_1.SuccessResponse({
                message: 'Get order for customer success',
                statusCode: 200,
                metadata: await order_service_1.default.getAllOrderOfCustomer(user.userId, query),
            }).send(res);
        };
        this.getOrderById = async (req, res) => {
            const { user } = req;
            const { order_id } = req.params;
            new success_response_1.SuccessResponse({
                message: 'Get order success',
                statusCode: 200,
                metadata: await order_service_1.default.getOrderById(user.userId, order_id),
            }).send(res);
        };
    }
}
CustomerOrderController.getInstance = () => {
    if (!CustomerOrderController.instance) {
        CustomerOrderController.instance = new CustomerOrderController();
    }
    return CustomerOrderController.instance;
};
class AdminOrderController {
    constructor() {
        this.confirmOrder = async (req, res) => {
            const { order_id } = req.params;
            new success_response_1.SuccessResponse({
                message: 'Create order success',
                statusCode: 200,
                metadata: await order_service_1.default.confirmOrder(order_id),
            }).send(res);
        };
        this.closeOrder = async (req, res) => {
            const { order_id } = req.params;
            new success_response_1.SuccessResponse({
                message: 'Create order success',
                statusCode: 200,
                metadata: await order_service_1.default.closeOrder(order_id),
            }).send(res);
        };
        this.openOrder = async (req, res) => {
            const { order_id } = req.params;
            new success_response_1.SuccessResponse({
                message: 'Create order success',
                statusCode: 200,
                metadata: await order_service_1.default.openOrder(order_id),
            }).send(res);
        };
        this.cancelOrder = async (req, res) => {
            const { order_id } = req.params;
            new success_response_1.SuccessResponse({
                message: 'Create order success',
                statusCode: 200,
                metadata: await order_service_1.default.cancelOrder(order_id),
            }).send(res);
        };
        this.getOrderById = async (req, res) => {
            const { order_id } = req.params;
            new success_response_1.SuccessResponse({
                message: 'Create order success',
                statusCode: 200,
                metadata: await order_service_1.default.getOrderIdForAdmin(order_id),
            }).send(res);
        };
        this.getAllOrder = async (req, res) => {
            new success_response_1.SuccessResponse({
                message: 'Create order success',
                statusCode: 200,
                metadata: await order_service_1.default.getAllOrderForAdmin(),
            }).send(res);
        };
        this.countOrder = async (req, res) => {
            new success_response_1.SuccessResponse({
                message: 'Create order success',
                statusCode: 200,
                metadata: await order_service_1.default.countOrder(),
            }).send(res);
        };
    }
}
AdminOrderController.getInstance = () => {
    if (!AdminOrderController.instance) {
        AdminOrderController.instance = new AdminOrderController();
    }
    return AdminOrderController.instance;
};
const customerOrderController = CustomerOrderController.getInstance();
exports.customerOrderController = customerOrderController;
const adminOrderController = AdminOrderController.getInstance();
exports.adminOrderController = adminOrderController;
//# sourceMappingURL=order.controller.js.map