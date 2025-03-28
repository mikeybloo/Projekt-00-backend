import { Exclude } from 'class-transformer'
import { Base } from './base.entity'
import { Column, Entity } from 'typeorm'

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

  @Column({ nullable: true, default: null })
  @Exclude()
  refreshToken: string

  // role: Role | Null
}
