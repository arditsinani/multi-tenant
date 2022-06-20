import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiBody, ApiResponse } from '@nestjs/swagger'
import { BaseController } from 'src/controllers/base.controller'
import { CreateTaskBody, Task, UpdateTaskBody } from 'src/entities/task.entity'
import { TasksService } from 'src/services/tasks.service'

/**
 * @controller
 * @description represents Task controller
 */
@Controller('tasks')
export class TasksController extends BaseController<Task> {
    constructor(private readonly tasksService: TasksService) {
        super(tasksService)
    }

    @Post()
    @ApiBody({ type: CreateTaskBody })
    @ApiResponse({ type: Task })
    @ApiResponse({
        status: 400,
        description: 'Project with id "${item.projectId}" is not created yet',
    })
    async create(@Body() item: CreateTaskBody): Promise<Task> {
        try {
            const res = await this.tasksService.create(item)
            return res
        } catch (error: unknown) {
            this.errorHandler(error)
        }
    }

    @Get()
    @ApiResponse({ type: [Task] })
    async findAll(): Promise<Task[]> {
        try {
            const res = await this.tasksService.findAll()
            return res
        } catch (error: unknown) {
            this.errorHandler(error)
        }
    }

    @Get(':id')
    @ApiResponse({ type: Task })
    async findOne(@Param('id') id: string): Promise<Task> {
        try {
            const res = await this.tasksService.findById(id)
            return res
        } catch (error: unknown) {
            this.errorHandler(error)
        }
    }

    @Put(':id')
    @ApiBody({ type: UpdateTaskBody })
    @ApiResponse({ type: Task })
    async updateOne(@Param('id') id: string, @Body() item: UpdateTaskBody): Promise<Partial<Task>> {
        try {
            const res = await this.tasksService.update(id, item)
            return res
        } catch (error: unknown) {
            this.errorHandler(error)
        }
    }

    @Delete(':id')
    @ApiResponse({ type: null })
    async remove(@Param('id') id: string): Promise<void> {
        try {
            const res = await this.tasksService.remove(id)
            return res
        } catch (error: unknown) {
            this.errorHandler(error)
        }
    }
}
