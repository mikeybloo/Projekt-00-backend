import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Expose } from 'class-transformer'
import { IsUUID } from 'class-validator'

export class Base {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @Expose()
  id: string

  @CreateDateColumn()
  @Expose()
  createdAt: Date

  @UpdateDateColumn()
  @Expose()
  updatedAt: Date
}
