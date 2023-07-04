import tokenKiotvietModel from '../models/token-kiotviet.model'

class TokenService {
    async getToken() {
        const token = await tokenKiotvietModel
            .findOne({ id: 1 })
            .lean()
            .select('token retailer')

        return token
    }
}

export default new TokenService()
