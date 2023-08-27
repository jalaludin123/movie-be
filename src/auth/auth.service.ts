import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as argon from "argon2";
import { LoginUserInput } from './dto/login-input-user';
import { RegisterUserInput } from './dto/register-input-user';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { UserDetail } from './types';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
    private config: ConfigService,
  ) { }

  async validateUser(email: string): Promise<any> {
    const user = await this.userService.getEmail(email);

    if (user.access_token) {
      return user.access_token;
    }
    return null;
  }

  async validateuserGoogle(userDetail: UserDetail) {
    const user = await this.userService.getEmail(userDetail.email);
    if (user) return user;
    const newUser = this.userService.signupUser(userDetail);
    return newUser;
  }

  async loginGoogle(req: any): Promise<any> {
    const { access_token } = await this.createToken(req.id, req.email, req.role);
    await this.userService.updateToken(access_token, req.id)
    return { access_token: access_token, user: req };
  }

  async signin(loginInputUser: LoginUserInput) {
    const user = await this.userService.getEmail(loginInputUser.email);
    if (!user) {
      throw new ForbiddenException('Akun anda belum terdaftar')
    }
    const cekPas = await argon.verify(user.password, loginInputUser.password)
    if (!cekPas) {
      throw new ForbiddenException('Password yang anda masukan salah')
    }
    const { password, ...result } = user;
    const { access_token } = await this.createToken(result.id, result.email, result.role);
    await this.userService.updateToken(access_token, user.id)
    return { access_token, user: result };
  }

  async createToken(userId: number, email: string, role: string) {
    const access_token = this.jwt.sign({
      email: email,
      sub: userId,
      role
    }, {
      expiresIn: '10m',
      secret: this.config.get('JWT_SECRET')
    });

    return { access_token }
  }

  async signup(signupInputUser: RegisterUserInput) {
    const user = await this.userService.getEmail(signupInputUser.email);
    if (user) {
      throw new ForbiddenException('Akun sudah digunakan')
    }
    signupInputUser.password = await argon.hash(signupInputUser.password);
    const newUser = this.userService.signupUser(signupInputUser);
    return newUser;
  }

  async logout(id: User) {

    const getUser = await this.userService.logout(id);
    if (!getUser) {
      throw new ForbiddenException();
    }

    return { Message: 'Logout Success' }
  }
}