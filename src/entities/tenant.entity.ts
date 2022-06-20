import { Entity } from 'typeorm'
import { BaseEntity } from 'src/entities/base.entity'

@Entity()
export class Tenant extends BaseEntity {}
