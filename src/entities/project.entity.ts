import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { BaseEntity } from 'src/entities/base.entity'
import { ApiProperty } from '@nestjs/swagger'
import { Tenant } from 'src/entities/tenant.entity'

/**
 * @entity
 * @description project entity
 */
@Entity()
export class Project extends BaseEntity {
    @Column('varchar')
    @ApiProperty()
    description: string

    @ManyToOne(() => Tenant, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'tenantId' })
    @ApiProperty()
    tenant: Tenant

    @Column('uuid')
    @ApiProperty()
    tenantId: string
}

/**
 * @class
 * @description to be used for validating project creation
 */
export class CreateProjectBody {
    @ApiProperty()
    name: string

    @ApiProperty()
    description: string

    @ApiProperty()
    tenantId: string
}

/**
 * @class
 * @description to be used for validating project editing
 */
export class UpdateProjectBody {
    @ApiProperty()
    name?: string

    @ApiProperty()
    description?: string
}
