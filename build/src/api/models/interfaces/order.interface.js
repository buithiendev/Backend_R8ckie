"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GATEWAYCODE = exports.FULFILLMENT_STATUS = exports.FINANCIAL_STATUS = exports.CURRENCY = exports.CONFIRMED_STATUS = exports.CANCEL_REASON = exports.CANCELLED_STATUS = void 0;
var GATEWAYCODE;
(function (GATEWAYCODE) {
    GATEWAYCODE["COD"] = "Thanh to\u00E1n khi giao h\u00E0ng (COD)";
    GATEWAYCODE["BANK"] = "Chuy\u1EC3n kho\u1EA3n qua ng\u00E2n h\u00E0ng";
    GATEWAYCODE["MOMO"] = "V\u00ED Momo";
    GATEWAYCODE["VNPAY"] = "V\u00ED VNPay b\u1EB1ng QRCode";
    GATEWAYCODE["CREDIT_CARD"] = "Thanh to\u00E1n b\u1EB1ng Credit Card";
    GATEWAYCODE["PAYPAL"] = "Thanh to\u00E1n qua Paypal/Master Card";
})(GATEWAYCODE || (GATEWAYCODE = {}));
exports.GATEWAYCODE = GATEWAYCODE;
var CURRENCY;
(function (CURRENCY) {
    CURRENCY["VND"] = "VietNamDong";
    CURRENCY["USD"] = "Dollars";
})(CURRENCY || (CURRENCY = {}));
exports.CURRENCY = CURRENCY;
var FULFILLMENT_STATUS;
(function (FULFILLMENT_STATUS) {
    FULFILLMENT_STATUS["fulfilled"] = "Ho\u00E0n th\u00E0nh";
    FULFILLMENT_STATUS["null"] = "L\u1ED7i";
    FULFILLMENT_STATUS["partial"] = "Thanh to\u00E1n m\u1ED9t ph\u1EA7n";
    FULFILLMENT_STATUS["restoked"] = "...unk";
})(FULFILLMENT_STATUS || (FULFILLMENT_STATUS = {}));
exports.FULFILLMENT_STATUS = FULFILLMENT_STATUS;
var CONFIRMED_STATUS;
(function (CONFIRMED_STATUS) {
    CONFIRMED_STATUS["confirmed"] = "X\u00E1c nh\u1EADn";
    CONFIRMED_STATUS["unconfirmed"] = "Ch\u01B0a x\u00E1c nh\u1EADn";
})(CONFIRMED_STATUS || (CONFIRMED_STATUS = {}));
exports.CONFIRMED_STATUS = CONFIRMED_STATUS;
var CANCELLED_STATUS;
(function (CANCELLED_STATUS) {
    CANCELLED_STATUS["cancelled"] = "\u0110\u00E3 b\u1ECB hu\u1EF7";
    CANCELLED_STATUS["uncancelled"] = "Ch\u01B0a hu\u1EF7";
})(CANCELLED_STATUS || (CANCELLED_STATUS = {}));
exports.CANCELLED_STATUS = CANCELLED_STATUS;
var FINANCIAL_STATUS;
(function (FINANCIAL_STATUS) {
    FINANCIAL_STATUS["pending"] = "\u0110ang ch\u1EDD";
    FINANCIAL_STATUS["authorized"] = "U\u1EF7 quy\u1EC1n";
    FINANCIAL_STATUS["partially_paid"] = "Thanh to\u00E1n m\u1ED9t ph\u1EA7n";
    FINANCIAL_STATUS["paid"] = "\u0110\u00E3 thanh to\u00E1n";
    FINANCIAL_STATUS["partially_refunded"] = "Ho\u00E0n tr\u1EA3 m\u1ED9t ph\u1EA7n";
    FINANCIAL_STATUS["refunded"] = "Ho\u00E0n tr\u1EA3";
    FINANCIAL_STATUS["voided"] = "V\u00F4 hi\u1EC7u";
    FINANCIAL_STATUS["failed"] = "Th\u1EA5t b\u1EA1i";
})(FINANCIAL_STATUS || (FINANCIAL_STATUS = {}));
exports.FINANCIAL_STATUS = FINANCIAL_STATUS;
var CANCEL_REASON;
(function (CANCEL_REASON) {
    CANCEL_REASON["null"] = "Kh\u00F4ng c\u00F3 v\u1EA5n \u0111\u1EC1 ph\u00E1t sinh";
    CANCEL_REASON["customer"] = "T\u1EEB ph\u00EDa kh\u00E1ch h\u00E0ng";
    CANCEL_REASON["fraud"] = "Gian l\u1EADn";
    CANCEL_REASON["inventory"] = "H\u1EBFt h\u00E0ng";
    CANCEL_REASON["declined"] = "Kho\u1EA3n thanh to\u00E1n b\u1ECB t\u1EEB ch\u1ED1i";
    CANCEL_REASON["orther"] = "Kh\u00E1c";
})(CANCEL_REASON || (CANCEL_REASON = {}));
exports.CANCEL_REASON = CANCEL_REASON;
//# sourceMappingURL=order.interface.js.map