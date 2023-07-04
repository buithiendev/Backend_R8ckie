type VNPayConfig = {
    version: string
    tmnCode: string
    secretKey: string
    vnpApi: string
    vnpUrl: string
    returnUrl: string
}

const vnpayConfig: VNPayConfig = {
    version: '2.1.0',
    tmnCode: 'OG2D056C',
    secretKey: 'AJNCNAUKVVGDBKTDXUEXHRRWFOCXFXBT',
    vnpUrl: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
    vnpApi: 'https://sandbox.vnpayment.vn/merchant_webapi/api/transaction',
    returnUrl: 'https://r8ckie-backend.vercel.app/v1/api/checkout/vnpay_return',
}

export { VNPayConfig, vnpayConfig }
