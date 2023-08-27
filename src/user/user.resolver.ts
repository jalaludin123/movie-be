import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-input-user';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import Role from 'src/data_enum/role/roles';
import { Roles } from 'src/auth/decorators/role.decorator';
import { OutputResponseUser } from './dto/output-response-user';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await this.userService.users();
  }

  // @Query(() => User)
  // async getEmail(@Args('email') email: string): Promise<User> {
  //   return await this.userService.getEmail(email);
  // }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Mutation(() => User)
  createUser(@Args('createUser') createUserInput: CreateUserInput): Promise<User> {
    return this.userService.createUser(createUserInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  async getProfile(@Context() context): Promise<User> {
    return await this.userService.getProfile(context.req.user['sub']);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Mutation(() => OutputResponseUser)
  async deleteUser(@Args('id') id: number): Promise<any> {
    return await this.userService.deleteUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => OutputResponseUser)
  async updateUser(
    @Context() context,
    @Args('updateUser') updateUserInput: CreateUserInput
  ): Promise<any> {
    return await this.userService.updateProfile(context.req.user['sub'], updateUserInput);
  }

}
