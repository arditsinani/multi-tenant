import { Module, OnModuleInit } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import configuration from 'src/config/configuration'
import databaseConfig from 'src/config/database.config'
import { TenantsModule } from 'src/controllers/tenant.module'
import { Tenant } from './entities/tenant.entity'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...databaseConfig(),
            synchronize: true, // <-- Not for production use. Migrations should be supported
        }),
        TenantsModule,
        ConfigModule.forRoot({
            load: [configuration],
        }),
    ],
})
export class AppModule implements OnModuleInit {
    constructor(private dataSource: DataSource) {}

    /**
     * @function
     * @description the following method generates a tenant if not exists
     * @NOTE this is an operation tha ADMIN only should do for the real app
     * but since this is a demo app, it is done for speed purpose
     */
    async onModuleInit() {
        const staticId = 'a857b3b8-321c-45a9-9dd3-196d7cf12826'
        try {
            const repository = this.dataSource.getRepository(Tenant)
            const hasTenant = await repository.findOne({ where: { id: staticId } })
            if (!hasTenant) {
                const newTenant = new Tenant()
                newTenant.name = 'Demo Tenant'
                newTenant.id = staticId
                const response = await repository.save(newTenant)
                console.log('Created a new Tenant with the following payload"')
                console.log(response)
            } else {
                console.log('The following Tenant is found:')
                console.log(hasTenant)
            }
        } catch (error) {
            throw error
        }
    }
}
