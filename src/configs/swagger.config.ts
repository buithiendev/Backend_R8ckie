import swaggerUi from 'swagger-ui-express'

const PATH_SWAGGER_JSON =
    process.env.NODE_ENV === 'development'
        ? '../../swagger.json'
        : '../../../swagger.json'

const providerSwaggerUI = swaggerUi.serve
const setupDocSwagger = swaggerUi.setup(require(PATH_SWAGGER_JSON), {
    customCssUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
})

export { providerSwaggerUI, setupDocSwagger }
