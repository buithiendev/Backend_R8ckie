"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortObject = exports.removeUndefinedObject = exports.removeUndefinedArray = exports.removeSpacingString = exports.nestedObjectParser = exports.joinCharacterToManyString = exports.integerGreaterThanZeroValidator = exports.getUnSelectData = exports.getSelectData = exports.getPrototypeQuery = exports.getInfoData = exports.createToken = exports.createKeys = exports.convertParamsVNPay = void 0;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lodash_1 = __importDefault(require("lodash"));
const createKeys = () => {
    const publicKey = crypto_1.default.randomBytes(64).toString('hex');
    const privateKey = crypto_1.default.randomBytes(64).toString('hex');
    return {
        publicKey,
        privateKey,
    };
};
exports.createKeys = createKeys;
const getInfoData = ({ object, fields }) => {
    return lodash_1.default.pick(object, fields);
};
exports.getInfoData = getInfoData;
const getSelectData = (select) => {
    return Object.fromEntries(select.map((value) => [value, 1]));
};
exports.getSelectData = getSelectData;
const getUnSelectData = (unSelect) => {
    if (!unSelect)
        return [];
    return Object.fromEntries(unSelect.map((value) => [value, 0]));
};
exports.getUnSelectData = getUnSelectData;
const getPrototypeQuery = (req) => {
    const { limit, page, sort, fields, filter, unSelect, since_id, created_at_max, created_at_min, financial_status, fulfillment_status, status, ...rest } = req.query;
    const limitNumber = limit ? Number(limit) : undefined;
    const pageNumber = page ? Number(page) : undefined;
    const sortString = sort ? sort + '' : undefined;
    const fieldsArray = fields ? String(fields).split(',') : undefined;
    const unSelectArray = unSelect ? String(unSelect).split(',') : undefined;
    const sinceId = since_id ? Number.parseInt(since_id + '') : undefined;
    const createdAtMax = created_at_max ? created_at_max + '' : undefined;
    const createdAtMin = created_at_min ? created_at_min + '' : undefined;
    const financialStatus = 'pending';
    return {
        limit: limitNumber,
        page: pageNumber,
        sort: sortString,
        fields: fieldsArray,
        filter: rest,
        unSelect: unSelectArray,
        since_id: sinceId,
        created_at_max: createdAtMax,
        created_at_min: createdAtMin,
        financial_status: financialStatus,
        fulfillment_status: 'fulfilled',
        status: 'any',
    };
};
exports.getPrototypeQuery = getPrototypeQuery;
const removeUndefinedObject = (obj) => {
    Object.keys(obj).forEach((key) => {
        if (obj[key] === undefined || obj[key] === null)
            delete obj[key];
    });
    return obj;
};
exports.removeUndefinedObject = removeUndefinedObject;
const removeUndefinedArray = (array) => {
    const result = array.filter((value) => {
        return value !== undefined;
    });
    return result;
};
exports.removeUndefinedArray = removeUndefinedArray;
const joinCharacterToManyString = (arrayString, insertCharacter = '/') => {
    const arrayNoUndefined = removeUndefinedArray(arrayString);
    return arrayNoUndefined.join(insertCharacter);
};
exports.joinCharacterToManyString = joinCharacterToManyString;
const nestedObjectParser = (object) => {
    const final = {};
    Object.keys(object).forEach((key) => {
        if (typeof object[key] === 'object' &&
            !Array.isArray(object[key]) &&
            object[key] !== null) {
            const response = nestedObjectParser(object[key]);
            Object.keys(response).forEach((responseKey) => {
                final[`${key}.${responseKey}`] = response[responseKey];
            });
        }
        else {
            final[key] = object[key];
        }
    });
    return final;
};
exports.nestedObjectParser = nestedObjectParser;
const removeSpacingString = (array, separatorCharacter = ',') => {
    if (typeof array === 'object')
        return array.map((value) => value.trim()).toString();
    return array
        ?.split(separatorCharacter)
        .map((value) => value.trim())
        .toString();
};
exports.removeSpacingString = removeSpacingString;
const integerGreaterThanZeroValidator = (value) => {
    return Number.isInteger(value) && value >= 0;
};
exports.integerGreaterThanZeroValidator = integerGreaterThanZeroValidator;
const createToken = (payload, secret) => {
    const now = Date.now;
    return jsonwebtoken_1.default.sign({ ...payload, now }, secret);
};
exports.createToken = createToken;
function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
}
exports.sortObject = sortObject;
const convertParamsVNPay = (req) => {
    const { vnp_Amount, vnp_BankCode, vnp_BankTranNo, vnp_CardType, vnp_OrderInfo, vnp_PayDate, vnp_ResponseCode, vnp_TmnCode, vnp_TransactionNo, vnp_TransactionStatus, vnp_TxnRef, vnp_SecureHash, } = req.query;
    return {
        vnp_BankCode: vnp_BankCode,
        vnp_BankTranNo: vnp_BankTranNo,
        vnp_CardType: vnp_CardType,
        vnp_OrderInfo: vnp_OrderInfo,
        vnp_PayDate: vnp_PayDate,
        vnp_ResponseCode: vnp_ResponseCode,
        vnp_TmnCode: vnp_TmnCode,
        vnp_TransactionNo: vnp_TransactionNo,
        vnp_TransactionStatus: vnp_TransactionStatus,
        vnp_SecureHash: vnp_SecureHash,
        vnp_TxnRef: Number.parseInt(vnp_TxnRef),
        vnp_Amount: Number.parseInt(vnp_Amount),
    };
};
exports.convertParamsVNPay = convertParamsVNPay;
//# sourceMappingURL=index.js.map