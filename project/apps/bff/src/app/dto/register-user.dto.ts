import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  @IsEmail({}, { message: 'Email not valid' })
  public email: string;

  @ApiProperty({
    description: 'User full name',
    example: 'Ivan Ivanov',
  })
  @IsString()
  public fullname: string;

  @ApiProperty({
    description: 'User avatar',
    example: 'avatar.png'
  })
  @IsString()
  @IsOptional()
  public avatarPath?: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  public password: string;
}