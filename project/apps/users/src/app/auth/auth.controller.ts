import { Body, Controller, Get, Param, Post, HttpStatus, UseGuards, Req, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillDto } from '@project/shared/helpers'
import { UserRdo } from './rdo/user.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { MongoIdValidationPipe } from '@project/shared/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { NotifyService } from '../notify/notify.service';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { RequestWithTokenPayload, RequestWithUser } from '@project/shared/types';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly notifyService: NotifyService,
  ) {}
  
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @Post('register')
  public async register(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    const { email, fullname } = newUser;
    await this.notifyService.registerSubscriber({ email, fullname });

    return fillDto(UserRdo, newUser.toPOJO());
  }

  @UseGuards(LocalAuthGuard)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public async getUser(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);
    return fillDto(UserRdo, existUser.toPOJO());
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }
}
