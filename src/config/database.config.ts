import { registerAs } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import configuration from 'src/config/configuration'

const databaseConfig = configuration().database

/**
 * @config
 * @description typeorm config for the database connection
 */
export default registerAs('database', (): TypeOrmModuleOptions => {
    const config: TypeOrmModuleOptions = {
        type: databaseConfig.type,
        host: databaseConfig.host,
        port: databaseConfig.port,
        username: databaseConfig.username,
        password: databaseConfig.password,
        database: databaseConfig.default,
        autoLoadEntities: true,
    }
    return config
})
