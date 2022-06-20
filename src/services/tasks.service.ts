import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Project } from 'src/entities/project.entity'
import { CreateTaskBody, Task, TaskStatus, UpdateTaskBody } from 'src/entities/task.entity'
import { Repository } from 'typeorm'
import { BaseService } from './base.service'

/**
 * @service
 * @description represent TasksService
 */
@Injectable()
export class TasksService extends BaseService<Task> {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>
    ) {
        super(tasksRepository)
    }

    /**
     * @function
     * @param {CreateTaskBody} item
     * @returns {Task}
     * @description creates the entity
     */
    async create(item: CreateTaskBody): Promise<Task> {
        const project = await this.projectsRepository.findOneBy({ id: item.projectId })
        if (!project) {
            throw new Error(`Project with id "${item.projectId}" is not created yet`)
        }
        const toSave: Partial<Task> = {
            ...item,
            status: TaskStatus.TODO,
        }
        return this.tasksRepository.save(toSave)
    }

    /**
     * @function
     * @param {String} id
     * @param {UpdateTaskBody} item
     * @returns {Project}
     * @description creates the entity
     */
    async update(id: string, item: UpdateTaskBody): Promise<Task> {
        await this.findByIdOrFail(id)
        return this.repository.save({ id, ...item })
    }
}
