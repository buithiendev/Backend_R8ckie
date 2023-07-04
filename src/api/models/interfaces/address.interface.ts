import { Document } from 'mongoose'

interface Address extends Document {
    customer_id: string
    address1: string
    address2?: string
    country_code?: string
    country?: string
    province_code: number
    province?: string
    district_code: number
    district?: string
    ward_code: number
    ward?: string
    company?: string
    first_name: string
    last_name: string
    phone_number: string
    default?: boolean
}

export default Address
