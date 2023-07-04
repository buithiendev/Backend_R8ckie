import KeyToken from './api/models/interfaces/keytoken.interface'
import { Product } from './api/models/interfaces/product.interface'
import Variant from './api/models/interfaces/variant.interface'
import { PayloadToken } from './api/v1/interfaces'

declare global {
    namespace Express {
        interface Request {
            product: Product
            user: PayloadToken
            variant: Variant
            refreshToken: string
            keyStore: KeyToken
        }
    }
}
