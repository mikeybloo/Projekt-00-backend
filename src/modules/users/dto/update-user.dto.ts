import { IsEmail, IsOptional, Matches, ValidateIf } from 'class-validator'
import { Match } from 'decorators/match.decorator'

export class UpdateUserDto {
  @IsOptional()
  firstName?: string

  @IsOptional()
  lastName?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  refreshToken?: string

  @IsOptional()
  roleId?: string

  @IsOptional()
  avatar?: string

  @ValidateIf((o) => typeof o.password === 'string' && o.password.length > 0)
  @IsOptional()
  @Matches(/^(?=.*\d)[A-Za-z.\s_-]+[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{6,}/, {
    message:
      'Password must have at least one number, lower or upper case letter and it has to be longer than 5 characters.',
  })
  password?: string

  @ValidateIf((o) => typeof o.confirmPassword === 'string' && o.confirmPassword.length > 0)
  @IsOptional()
  @Match(UpdateUserDto, (field) => field.password, { message: 'Passwords do not match.' })
  confirmPassword?: string
}
