import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ProjectsService } from 'src/services/projects.service'
import { BaseController } from 'src/controllers/base.controller'
import { CreateProjectBody, Project, UpdateProjectBody } from 'src/entities/project.entity'
import { ApiBody, ApiResponse } from '@nestjs/swagger'

/**
 * @controller
 * @description represents Project controller
 * @NOTE all description are in the BaseController
 */
@Controller('projects')
export class ProjectsController extends BaseController<Project> {
    constructor(private readonly projectsService: ProjectsService) {
        super(projectsService)
    }

    @Post()
    @ApiBody({ type: CreateProjectBody })
    @ApiResponse({ type: Project })
    @ApiResponse({
        status: 400,
        description: 'Tenant with id "${item.tenantId}" is not created yet',
    })
    async create(@Body() item: CreateProjectBody): Promise<Project> {
        try {
            const res = await this.projectsService.create(item)
            return res
        } catch (error: unknown) {
            this.errorHandler(error)
        }
    }

    @Get()
    @ApiResponse({ type: [Project] })
    async findAll(): Promise<Project[]> {
        try {
            const res = await this.projectsService.findAll()
            return res
        } catch (error: unknown) {
            this.errorHandler(error)
        }
    }

    @Get(':id')
    @ApiResponse({ type: Project })
    async findOne(@Param('id') id: string): Promise<Project> {
        try {
            const res = await this.projectsService.findById(id)
            return res
        } catch (error: unknown) {
            this.errorHandler(error)
        }
    }

    @Put(':id')
    @ApiBody({ type: UpdateProjectBody })
    @ApiResponse({ type: Project })
    async updateOne(
        @Param('id') id: string,
        @Body() item: UpdateProjectBody
    ): Promise<Partial<Project>> {
        try {
            const res = await this.projectsService.update(id, item)
            return res
        } catch (error: unknown) {
            this.errorHandler(error)
        }
    }

    @Delete(':id')
    @ApiResponse({ type: null })
    async remove(@Param('id') id: string): Promise<void> {
        try {
            const res = await this.projectsService.remove(id)
            return res
        } catch (error: unknown) {
            this.errorHandler(error)
        }
    }
}
