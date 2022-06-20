import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from 'src/app.module'
import configuration from 'src/config/configuration'

/**
 * @function
 * @description application main
 */
async function bootstrap() {
    const config = configuration()
    const app = await NestFactory.create(AppModule)

    // set the API prefix by config value
    app.setGlobalPrefix(config.apiPrefix)

    const swaggerConfig = new DocumentBuilder()
        .setTitle(config.appTitle)
        .setDescription(config.appDescription)
        .setVersion(config.version)
        .build()
    const document = SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup(config.apiPrefix, app, document)

    await app.listen(3000)
}
bootstrap()
