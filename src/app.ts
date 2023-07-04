import compression from 'compression'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Application, NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cron from 'node-cron'
import routerV2 from './api/api_kiotviet/routes'
import { getToken } from './api/api_kiotviet/utils/api'
import { ErrorResponse } from './api/v1/core/error.response'
import routerV1 from './api/v1/routes'
import { providerSwaggerUI, setupDocSwagger } from './configs/swagger.config'

const CRON_JOB_SCHEDULE = '25 16 * * *'

dotenv.config()
const app: Application = express()
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

// init middlewares
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(compression())
app.use(helmet())
app.use(express.json())

// init db
require('./databases/init.mongodb')

// init routes-

app.use('/v1', routerV1)
app.use('/v2', routerV2)
app.use('/', providerSwaggerUI, setupDocSwagger)

cron.schedule(CRON_JOB_SCHEDULE, getToken)

// handling error
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new ErrorResponse('Not found', 404)
    next(error)
})

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    // logEvents(
    //     `Id-Error:${uuid()}----[${req.method}]----${req.url}----${
    //         error.message
    //     }`,
    // )
    const statusCode: number = error.status || 500

    return res.status(statusCode).json({
        statusCode: statusCode,
        stack: error.stack,
        message: error.message || 'Internal server error',
        metadata: null,
    })
})

export default app
