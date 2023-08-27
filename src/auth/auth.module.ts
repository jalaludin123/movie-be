import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt-auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { RolesGuard } from './guard/roles.guard';

@Module({
  imports: [PassportModule, UserModule, JwtModule.register({})],
  providers: [AuthService, AuthResolver, JwtStrategy, RolesGuard],
  exports: [AuthService]
})
export class AuthModule { }
