import { FindOneOptions, Repository } from 'typeorm'

/**
 * @service
 * @description represent base repository
 * the class is an extension of typeorm repository class to add custom methods
 * currently not in use because of the Dependency Injection issue
 */
export class BaseRepository<T> extends Repository<T> {
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
        return this.find({ skip, take: limit })
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
        return this.findOne(options)
    }

    /**
     * @function
     * @param {String} id
     * @returns the entity that matches the id, or null
     */
    async findByIdOrFail(id: string): Promise<T | null> {
        const options: FindOneOptions = {
            where: { id },
        }
        return this.findOneOrFail(options)
    }
}
