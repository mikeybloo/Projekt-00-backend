import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from 'entities/user.entity'
import Logging from 'library/Logging'
import { UsersService } from 'modules/users/users.service'
import { compareHash, hash } from 'utils/bcrypt'
import { RegisterUserDTO } from './dto/register-user.dto'
import { Request } from 'express'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    Logging.info('Validating user...')
    const user = await this.usersService.findBy({ email: email })
    if (!user) {
      throw new BadRequestException('Invalid credentials')
    }

    if (!(await compareHash(password, user.password))) {
      throw new BadRequestException('Invalid credentials')
    }

    Logging.info('User is valid')
    return user
  }

  async register(registerUserDTO: RegisterUserDTO): Promise<User> {
    const hashedPassword = await hash(registerUserDTO.password)
    return this.usersService.create({
      role_id: null,
      ...registerUserDTO,
      password: hashedPassword,
    })
  }

  async generateJwt(user: User): Promise<string> {
    return this.jwtService.signAsync({ sub: user.id, username: user.email })
  }

  async user(cookie: string): Promise<User> {
    const data = await this.jwtService.verifyAsync(cookie, { secret: this.configService.get('JWT_SECRET') })
    return this.usersService.findById(data['sub'], ['role'])
  }

  async getUserId(request: Request): Promise<string> {
    const user = request.user as User
    return user.id
  }
}
