import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  public email: string;

  @ApiProperty({
    description: 'User full name',
    example: 'Ivan Ivanov',
  })
  public fullname: string;

  @ApiProperty({
    description: 'User avatar',
    example: 'avatar.png'
  })
  public avatarPath?: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  public password: string;
}