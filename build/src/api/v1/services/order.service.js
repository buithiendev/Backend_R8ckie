"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const order_model_1 = __importDefault(require("../../models/order.model"));
const product_repo_1 = require("../../models/repositories/product.repo");
const error_response_1 = require("../core/error.response");
const utils_1 = require("../utils");
const address_service_1 = __importDefault(require("./address.service"));
class OrderService {
    async create({ line_items, discount_code, shipping_address, currency, note, gateway_code, }, userId) {
        const address = await address_service_1.default.create(userId, shipping_address);
        const items = await Promise.all(line_items.map(async (item, index) => {
            const product = await (0, product_repo_1.findProductByIdAndVariantId)(item.product_id, item.variant_id, []);
            console.log(product);
            if (!product)
                throw new error_response_1.BadRequestError('Product does not exists');
            return {
                product_name: product?.product_name,
                price: product?.product_variants[0].price,
                vendor: product?.product_vendor,
                collection: product?.product_collection,
                variant_title: product?.product_variants[0].variant_title,
                grams: product?.product_variants[0].grams,
                quantity: line_items[index].quantity,
                barcode: product?.product_variants[0].barcode,
                image: product?.product_images
                    ? product.product_images[0]
                    : '',
                total_discount: 0,
                product_id: product?._id,
                variant_id: product?.product_variants[0]._id,
                sku: product?.product_variants[0].sku,
            };
        }));
        let total_weight = 0;
        let subtotal_price = 0;
        items.forEach((item) => {
            const { grams, quantity, price } = item;
            total_weight += grams * quantity;
            subtotal_price += price * quantity;
        });
        const cart_token = (0, utils_1.createToken)(items, userId);
        const checkout_token = (0, utils_1.createToken)({ items, address, userId, discount_code }, userId);
        const item = {
            shipping_address: new mongoose_1.Types.ObjectId(address._id),
            line_items: items,
            customer_id: new mongoose_1.Types.ObjectId(userId),
            cart_token,
            checkout_token,
            currency: currency || 'VND',
            total_weight,
            subtotal_price,
            note,
            gateway_code: gateway_code || 'COD',
        };
        return await order_model_1.default.create(item);
    }
    async getAllOrderOfCustomer(userId, { limit = 50, page = 1, fields = [
        'order_number',
        'subtotal_price',
        'financial_status',
        'createdAt',
    ], sort = 'ctime', financial_status = 'pending', since_id = 1, }) {
        const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 };
        const skip = (page - 1) * limit;
        return await order_model_1.default
            .find({
            _id: { $gt: since_id },
            customer_id: userId,
            financial_status,
        })
            .sort(sortBy)
            .skip(skip)
            .limit(limit)
            .select((0, utils_1.getSelectData)(fields))
            .lean()
            .exec();
    }
    async getOrderById(userId, orderId) {
        return await order_model_1.default
            .findOne({ _id: orderId, customer_id: userId })
            .populate('shipping_address')
            .populate({
            path: 'line_items',
            select: 'product_name price quantity sku',
            populate: {
                path: 'image',
                select: 'image_url image_file_name',
            },
        })
            .select((0, utils_1.getSelectData)([
            'shipping_address',
            'line_items',
            'subtotal_price',
            'createdAt',
            'order_number',
            'financial_status',
        ]))
            .lean()
            .exec();
    }
    async confirmOrder(orderId) {
        const filter = {
            _id: orderId,
            confirmed_status: 'unconfirmed',
        }, update = {
            confirmed_status: 'confirmed',
        }, options = {
            new: true,
        };
        const order = await order_model_1.default.updateOne(filter, update, options);
        return order.modifiedCount;
    }
    async closeOrder(orderId) {
        const filter = {
            _id: orderId,
            closed_status: false,
        }, update = {
            closed_status: true,
        }, options = {
            new: true,
        };
        const order = await order_model_1.default.updateOne(filter, update, options);
        return order.modifiedCount;
    }
    async openOrder(orderId) {
        const filter = {
            _id: orderId,
            closed_status: true,
        }, update = {
            closed_status: false,
        }, options = {
            new: true,
        };
        const order = await order_model_1.default.updateOne(filter, update, options);
        return order.modifiedCount;
    }
    async cancelOrder(orderId) {
        const filter = {
            _id: orderId,
            cancelled_status: 'uncancelled',
        }, update = {
            cancelled_status: 'cancelled',
        }, options = {
            new: true,
        };
        const order = await order_model_1.default.updateOne(filter, update, options);
        return order.modifiedCount;
    }
    async getOrderIdForAdmin(orderId) {
        const order = await order_model_1.default.findById(orderId);
        if (!order)
            throw new error_response_1.BadRequestError('Order does not exists');
        return order;
    }
    async getAllOrderForAdmin() {
        return await order_model_1.default.find();
    }
    async countOrder() {
        return await order_model_1.default.countDocuments();
    }
}
exports.default = new OrderService();
//# sourceMappingURL=order.service.js.map