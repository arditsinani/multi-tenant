import { Injectable } from '@nestjs/common'
import { FindOneOptions, Repository } from 'typeorm'

/**
 * @class
 * @description all the generic service methods in one place
 * needs a repository to make all database calls
 */
@Injectable()
export class BaseService<T> {
    repository!: Repository<T>
    constructor(repository: Repository<T>) {
        this.repository = repository
    }

    /**
     * @function
     * @param {T} item
     * @returns {T}
     * @description creates the entity
     */
    async create(item: T): Promise<T> {
        return this.repository.save(item)
    }

    /**
     * @function
     * @param {Number} skip
     * @param {Number} limit
     * @returns the full response, or paginated
     * @NOTE this is a offset pagination, which is not performant
     * for large amount of data. A cursor pagination is needed for
     * better performance
     */
    async findAll(skip?: number, limit?: number): Promise<T[]> {
        return this.repository.find({ skip, take: limit })
    }

    /**
     * @function
     * @param {String} id
     * @returns the entity that matches the id, or null
     */
    async findById(id: string): Promise<T | null> {
        const options: FindOneOptions = {
            where: { id },
        }
        return this.repository.findOne(options)
    }

    /**
     * @function
     * @param {String} id
     * @returns the entity that matches the id, or fails
     */
    async findByIdOrFail(id: string): Promise<T> {
        const options: FindOneOptions = {
            where: { id },
        }
        return this.repository.findOneOrFail(options)
    }

    /**
     * @function
     * @param {T} id
     * @param {T} item
     * @returns {T}
     * @description updates the entity
     */
    async update(id: string, item: T): Promise<T> {
        await this.findByIdOrFail(id)
        return this.repository.save(item)
    }

    /**
     * @function
     * @param {String} id
     * @description removes an item by id if exists
     */
    async remove(id: string): Promise<void> {
        await this.repository.delete(id)
    }
}
