"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vnpayConfig = void 0;
const vnpayConfig = {
    version: '2.1.0',
    tmnCode: 'OG2D056C',
    secretKey: 'AJNCNAUKVVGDBKTDXUEXHRRWFOCXFXBT',
    vnpUrl: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
    vnpApi: 'https://sandbox.vnpayment.vn/merchant_webapi/api/transaction',
    returnUrl: 'https://r8ckie-backend.vercel.app/v1/api/checkout/vnpay_return',
};
exports.vnpayConfig = vnpayConfig;
//# sourceMappingURL=vnpay.gateway.js.map