import { BadRequestException, Body, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { BaseService } from 'src/services/base.service'

/**
 * @controller
 * @description base methods for all controllers
 * @NOTE Swagger doesn't have a generic use of the type
 * it needs a value for the request/response body
 * if it needs to be used separately,
 * the method should be overwritten in the extended class
 * by adding the decorator
 */
export class BaseController<T> {
    service!: BaseService<T>
    constructor(service: BaseService<T>) {
        this.service = service
    }

    /**
     * @function
     * @param {T} item
     * @returns {T}
     * @description create route for the entity
     */
    @Post()
    async create(@Body() item: T): Promise<T> {
        try {
            const res = await this.service.create(item)
            return res
        } catch (error: unknown) {
            this.errorHandler(error)
        }
    }

    /**
     * @function
     * @returns {Array<T>}
     * @description returns all entities
     */
    @Get()
    async findAll(): Promise<T[]> {
        try {
            const res = await this.service.findAll()
            return res
        } catch (error: unknown) {
            this.errorHandler(error)
        }
    }

    /**
     * @function
     * @param {Sting} id
     * @returns {T}
     * @description get entity by id
     */
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<T> {
        try {
            const res = await this.service.findById(id)
            return res
        } catch (error: unknown) {
            this.errorHandler(error)
        }
    }

    /**
     * @function
     * @param {String}
     * @param {T} item
     * @returns {T}
     * @description looks for an entity by id and updates it
     * fails if the entity doesn't exist
     */
    @Put(':id')
    async updateOne(@Param('id') id: string, @Body() item: T): Promise<Partial<T>> {
        try {
            const res = await this.service.update(id, item)
            return res
        } catch (error: unknown) {
            this.errorHandler(error)
        }
    }

    /**
     * @function
     * @param {String} id
     * @description delete route for the entity
     */
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        try {
            const res = await this.service.remove(id)
            return res
        } catch (error: unknown) {
            this.errorHandler(error)
        }
    }

    /**
     * @function
     * @param {Error} error
     * @description wrap error
     */
    errorHandler(error: unknown): Error {
        if (error['name'] === 'QueryFailedError') {
            if (/^duplicate key value violates unique constraint/.test(error['message'])) {
                throw new BadRequestException(error['detail'] || error['message'])
            } else if (/violates foreign key constraint/.test(error['message'])) {
                throw new BadRequestException(error['detail'] || error['message'])
            } else if (/invalid input/.test(error['message'])) {
                throw new BadRequestException(error['detail'] || error['message'])
            } else {
                throw error
            }
        } else if (String(error).includes('is not created yet')) {
            throw new BadRequestException(error['message'])
        } else {
            throw error
        }
    }
}
