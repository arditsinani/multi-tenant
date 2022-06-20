import { ApiProperty } from '@nestjs/swagger'
import { Column, PrimaryGeneratedColumn } from 'typeorm'

export class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string

    @Column('varchar')
    @ApiProperty()
    name: string
}
