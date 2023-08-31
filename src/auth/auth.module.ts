import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt-auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { RolesGuard } from './guard/roles.guard';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  imports: [PassportModule, UserModule, JwtModule.register({})],
  providers: [AuthService, AuthResolver, JwtStrategy, RolesGuard, GoogleStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
