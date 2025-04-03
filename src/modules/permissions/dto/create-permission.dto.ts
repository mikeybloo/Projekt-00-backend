import { IsNotEmpty, isNotEmpty } from 'class-validator'

export class CreatePermissionDto {
  @IsNotEmpty()
  name: string
}
