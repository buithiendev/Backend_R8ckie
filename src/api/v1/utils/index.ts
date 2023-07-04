import crypto from 'crypto'
import { Request } from 'express'
import JWT from 'jsonwebtoken'
import _ from 'lodash'
import { QueryParams } from '../interfaces'
import { ParamVNPayReturn } from '../interfaces/payment/VNPayService.interface'

interface IObjectAny {
    [key: string]: any
}

const createKeys = () => {
    const publicKey = crypto.randomBytes(64).toString('hex')
    const privateKey = crypto.randomBytes(64).toString('hex')

    return {
        publicKey,
        privateKey,
    }
}

const getInfoData = ({ object, fields }: { object: {}; fields: string[] }) => {
    return _.pick(object, fields)
}

const getSelectData = (select: string[]) => {
    return Object.fromEntries(select.map((value) => [value, 1]))
}

const getUnSelectData = (unSelect: string[] | undefined) => {
    if (!unSelect) return []
    return Object.fromEntries(unSelect.map((value) => [value, 0]))
}

const getPrototypeQuery = (req: Request): QueryParams => {
    const {
        limit,
        page,
        sort,
        fields,
        filter,
        unSelect,
        since_id,
        created_at_max,
        created_at_min,
        financial_status,
        fulfillment_status,
        status,
        ...rest
    } = req.query

    const limitNumber = limit ? Number(limit) : undefined
    const pageNumber = page ? Number(page) : undefined
    const sortString = sort ? sort + '' : undefined
    const fieldsArray = fields ? String(fields).split(',') : undefined
    const unSelectArray = unSelect ? String(unSelect).split(',') : undefined
    const sinceId = since_id ? Number.parseInt(since_id + '') : undefined
    const createdAtMax = created_at_max ? created_at_max + '' : undefined
    const createdAtMin = created_at_min ? created_at_min + '' : undefined
    const financialStatus = 'pending'

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
    }
}

const removeUndefinedObject = (obj: any) => {
    Object.keys(obj).forEach((key) => {
        if (obj[key] === undefined || obj[key] === null) delete obj[key]
    })
    return obj
}

const removeUndefinedArray = (array: (string | undefined)[]) => {
    const result = array.filter((value) => {
        return value !== undefined
    })
    return result
}

const joinCharacterToManyString = (
    arrayString: (string | undefined)[],
    insertCharacter = '/',
) => {
    const arrayNoUndefined = removeUndefinedArray(arrayString)
    return arrayNoUndefined.join(insertCharacter)
}

const nestedObjectParser = (object: IObjectAny) => {
    const final: IObjectAny = {}
    Object.keys(object).forEach((key) => {
        if (
            typeof object[key] === 'object' &&
            !Array.isArray(object[key]) &&
            object[key] !== null
        ) {
            const response: IObjectAny = nestedObjectParser(object[key])
            Object.keys(response).forEach((responseKey) => {
                final[`${key}.${responseKey}`] = response[responseKey]
            })
        } else {
            final[key] = object[key]
        }
    })
    return final
}

const removeSpacingString = (
    array: string[] | string | undefined,
    separatorCharacter = ',',
) => {
    if (typeof array === 'object')
        return array.map((value) => value.trim()).toString()

    return array
        ?.split(separatorCharacter)
        .map((value) => value.trim())
        .toString()
}

const integerGreaterThanZeroValidator = (value: number): boolean => {
    return Number.isInteger(value) && value >= 0
}

const createToken = (payload: any, secret: string) => {
    const now = Date.now
    return JWT.sign({ ...payload, now }, secret)
}

interface VnpParams {
    [key: string]: string | number
}

function sortObject(obj: { [key: string]: any }): { [key: string]: string } {
    let sorted: { [key: string]: string } = {}
    let str: string[] = []
    let key: any
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key))
        }
    }
    str.sort()
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(
            /%20/g,
            '+',
        )
    }
    return sorted
}

const convertParamsVNPay = (req: Request): ParamVNPayReturn => {
    const {
        vnp_Amount,
        vnp_BankCode,
        vnp_BankTranNo,
        vnp_CardType,
        vnp_OrderInfo,
        vnp_PayDate,
        vnp_ResponseCode,
        vnp_TmnCode,
        vnp_TransactionNo,
        vnp_TransactionStatus,
        vnp_TxnRef,
        vnp_SecureHash,
    } = req.query

    return {
        vnp_BankCode: vnp_BankCode as string,
        vnp_BankTranNo: vnp_BankTranNo as string,
        vnp_CardType: vnp_CardType as string,
        vnp_OrderInfo: vnp_OrderInfo as string,
        vnp_PayDate: vnp_PayDate as string,
        vnp_ResponseCode: vnp_ResponseCode as string,
        vnp_TmnCode: vnp_TmnCode as string,
        vnp_TransactionNo: vnp_TransactionNo as string,
        vnp_TransactionStatus: vnp_TransactionStatus as string,
        vnp_SecureHash: vnp_SecureHash as string,
        vnp_TxnRef: Number.parseInt(vnp_TxnRef as string),
        vnp_Amount: Number.parseInt(vnp_Amount as string),
    }
}

export {
    convertParamsVNPay,
    createKeys,
    createToken,
    getInfoData,
    getPrototypeQuery,
    getSelectData,
    getUnSelectData,
    integerGreaterThanZeroValidator,
    joinCharacterToManyString,
    nestedObjectParser,
    removeSpacingString,
    removeUndefinedArray,
    removeUndefinedObject,
    sortObject,
}
