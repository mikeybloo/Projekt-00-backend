import { Exclude } from 'class-transformer'
import { Base } from './base.entity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Role } from './role.entity'

@Entity()
export class User extends Base {
  @Column({ unique: true })
  email: string

  @Column({ nullable: true })
  firstName: string

  @Column({ nullable: true })
  lastName: string

  @Column({ nullable: true })
  avatar: string

  @Column({ nullable: true })
  @Exclude()
  password: string

  @ManyToOne(() => Role, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'role_id' })
  role: Role | null
}
