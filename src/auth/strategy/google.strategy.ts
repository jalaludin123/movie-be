import { Inject, forwardRef } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { AuthService } from "../auth.service";


export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(forwardRef(() => AuthService)) private authService: AuthService) {
    super({
      clientID: "997376232327-uktfvs82ii2882v3hvgh0bun0m08fkhq.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/api/auth/google/redirect",
      scope: ['profile', 'email']
    });
  }

  async validate(access_token: string, refreshToken: string, profile: Profile) {
    const user = await this.authService.validateuserGoogle({ email: profile.emails[0].value, name: profile.displayName, password: refreshToken });
    return user || null;
  }
}