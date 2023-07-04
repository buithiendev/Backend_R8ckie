import { NextFunction, Request, Response } from "express"
import { SuccessResponse } from "../core/success.response"
import tokenService from "../services/token.service"

class TokenController {
    async getToken(req: Request, res: Response, next: NextFunction) {

        new SuccessResponse({
            message: 'Get category success',
            statusCode: 200,
            metadata: await tokenService.getToken(),
        }).send(res)
    }
}

export default new TokenController()
