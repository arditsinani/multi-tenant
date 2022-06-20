import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Project } from 'src/entities/project.entity'
import { BaseEntity } from 'src/entities/base.entity'
import { ApiProperty } from '@nestjs/swagger'

export enum TaskStatus {
    TODO = 'todo',
    IN_PROGRESS = 'in_progress',
    DONE = 'done',
}

/**
 * @entity
 * @description Task entity
 */
@Entity()
export class Task extends BaseEntity {
    @Column('varchar')
    @ApiProperty()
    description: string

    @ManyToOne(() => Project, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'projectId' })
    @ApiProperty()
    project: Project

    @Column('uuid')
    @ApiProperty()
    projectId: string

    @Column({
        type: 'enum',
        enum: TaskStatus,
        nullable: false,
    })
    @ApiProperty({
        enum: TaskStatus,
        enumName: 'TaskStatus',
    })
    status: TaskStatus
}

/**
 * @class
 * @description to be used for validating task creation
 */
export class CreateTaskBody {
    @ApiProperty()
    name: string

    @ApiProperty()
    description: string

    @ApiProperty()
    projectId: string
}

/**
 * @class
 * @description to be used for validating task editing
 */
export class UpdateTaskBody {
    @ApiProperty()
    name?: string

    @ApiProperty()
    description?: string

    @ApiProperty({
        enum: TaskStatus,
        enumName: 'TaskStatus',
    })
    status?: TaskStatus
}
