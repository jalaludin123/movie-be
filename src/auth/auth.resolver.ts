import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterUserInput } from './dto/register-input-user';
import { User } from 'src/user/entities/user.entity';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-input-user';
import { LogOutUser } from './dto/logout-user';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';


@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) { }

  @Mutation(() => User)
  signupUser(@Args('signup') signupUserInput: RegisterUserInput): Promise<User> {
    return this.authService.signup(signupUserInput)
  }

  @Mutation(() => LoginResponse)
  signin(@Args('signin') signinUserInput: LoginUserInput) {
    return this.authService.signin(signinUserInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => LogOutUser)
  async logout(@Context() context) {
    return await this.authService.logout(context.req.user['sub'])
  }

}
