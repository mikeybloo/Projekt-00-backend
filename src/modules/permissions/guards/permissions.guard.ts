import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthService } from 'modules/auth/auth.service'
import { UsersService } from 'modules/users/users.service'
import { RolesService } from 'modules/roles/roles.service'
import { User } from 'entities/user.entity'
import { Role } from 'entities/role.entity'
import { Request } from 'express'

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
    private usersService: UsersService,
    private rolesService: RolesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const access = this.reflector.get('access', context.getHandler())
    if (!access) {
      return true
    }

    const request: Request = context.switchToHttp().getRequest()
    const user = await this.authService.user(request.cookies['access_token'] || '')
    if (!user.role) {
      return false
    }

    const role: Role = await this.rolesService.findById(user.role.id, ['permissions'])

    if (request.method === 'GET') {
      return role.permissions.some((p) => p.name === `view_${access}` || p.name === `edit_${access}`)
    }

    return role.permissions.some((p) => p.name === `edit_${access}`)
  }
}
