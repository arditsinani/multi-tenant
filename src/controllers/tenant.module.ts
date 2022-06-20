import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProjectsController } from 'src/controllers/projects.controller'
import { TasksController } from 'src/controllers/tasks.controller'
import { Project } from 'src/entities/project.entity'
import { Task } from 'src/entities/task.entity'
import { Tenant } from 'src/entities/tenant.entity'
import { ProjectsService } from 'src/services/projects.service'
import { TasksService } from 'src/services/tasks.service'

@Module({
    imports: [TypeOrmModule.forFeature([Tenant, Project, Task])],
    providers: [ProjectsService, TasksService],
    controllers: [ProjectsController, TasksController],
})
export class TenantsModule {}
