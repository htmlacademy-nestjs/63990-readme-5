import { BadGatewayException, ConflictException, HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './auth.constant';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { Token, TokenPayload, User } from '@project/shared/types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService
  ) {}

  public async register(dto: CreateUserDto) {
    const { email, avatarPath, password, fullname } = dto;

    const blogUser = {
      email,
      avatarPath,
      passwordHash: '',
      fullname
    }

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS)
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);

    return this.blogUserRepository.save(userEntity);
  }

  public async getUser(id: string) {
    const existUser = await this.blogUserRepository.findById(id);

    if (! existUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return existUser;
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND)
    }

    const isCorrectPassword = await existUser.comparePassword(password);

    if (!isCorrectPassword) {
      throw new ConflictException(AUTH_USER_PASSWORD_WRONG)
    }

    return existUser;
  }

  public async createUserToken(user: User): Promise<Token> {
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      fullname: user.fullname
    }

    try {
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken }
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
