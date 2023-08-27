import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { Inject, forwardRef, ForbiddenException } from "@nestjs/common";


export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(forwardRef(() => AuthService)) private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    })
  }

  async validate(payload: any) {
    const user = await this.authService.validateUser(payload.email)
    if (!user) {
      throw new ForbiddenException('Kamu tidak mempunyai akses token');
    }
    return payload;
  }
}