import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateProjectBody, Project, UpdateProjectBody } from 'src/entities/project.entity'
import { Tenant } from 'src/entities/tenant.entity'
import { BaseService } from 'src/services/base.service'
import { Repository } from 'typeorm'

/**
 * @service
 * @description represent ProjectsService
 */
@Injectable()
export class ProjectsService extends BaseService<Project> {
    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>,
        @InjectRepository(Tenant)
        private tenantsRepository: Repository<Tenant>
    ) {
        super(projectsRepository)
    }

    /**
     * @function
     * @param {CreateProjectBody} item
     * @returns {Project}
     * @description creates the entity
     */
    async create(item: CreateProjectBody): Promise<Project> {
        const tenant = await this.tenantsRepository.findOneBy({ id: item.tenantId })
        if (!tenant) {
            throw new Error(`Tenant with id "${item.tenantId}" is not created yet`)
        }
        return this.projectsRepository.save(item)
    }

    /**
     * @function
     * @param {String} id
     * @param {UpdateProjectBody} item
     * @returns {Project}
     * @description creates the entity
     */
    async update(id: string, item: UpdateProjectBody): Promise<Project> {
        await this.findByIdOrFail(id)
        return this.repository.save({ id, ...item })
    }
}
