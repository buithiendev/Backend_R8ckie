export * from './response.interface'

type PayloadToken = {
    userId: string
    email: string
    roles?: string[]
}

type QueryParams = {
    limit: number | undefined
    page: number | undefined
    sort: string | undefined
    fields: string[] | undefined
    filter: {} | undefined
    unSelect: string[] | undefined
    since_id: number | undefined
    created_at_min: string | undefined
    created_at_max: string | undefined
    financial_status:
        | 'pending'
        | 'paid'
        | 'partially_paid'
        | 'refunded'
        | 'voided'
        | 'partially_refunded'
        | undefined
    fulfillment_status: 'not_fulfilled' | 'fulfilled' | 'partial' | undefined
    status: 'open' | 'closed' | 'cancelled' | 'any' | undefined
}

type ITokens = {
    refreshToken: string
    accessToken: string
    expires: number
}

export { ITokens, PayloadToken, QueryParams }
