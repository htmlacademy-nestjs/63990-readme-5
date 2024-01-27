import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';

import { RefreshTokenPayload, TokenPayload } from '@project/shared/types';
import { AuthService } from '../auth.service';
import { jwtConfig } from '@project/shared/config/users';
import { TokenNotExistsException } from '../exceptions/token-not-exists.exception';
import { RefreshTokenService } from '../../refresh-token/refresh-token.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.refreshTokenSecret,
    });
  }

  public async validate(payload: RefreshTokenPayload) {
    if (! await this.refreshTokenService.isExists(payload.tokenId)) {
      throw new TokenNotExistsException(payload.tokenId);
    }

    await this.refreshTokenService.deleteRefreshSession(payload.tokenId);
    await this.refreshTokenService.deleteExpiredRefreshTokens();

    return this.authService.getUser(payload.sub);
  }
}