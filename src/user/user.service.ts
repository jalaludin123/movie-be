import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-input-user';
import * as argon from "argon2";
import { RegisterUserInput } from 'src/auth/dto/register-input-user';
import { UpdateUserInput } from './dto/update-input-user';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async users(): Promise<User[]> {
    const users = this.userRepository.find({
      where: {
        active: 'y'
      }
    })
    return users;
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    createUserInput.password = await argon.hash(createUserInput.password)
    const user = this.userRepository.create(createUserInput);
    return this.userRepository.save(user)
  }

  async getEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async signupUser(registerUserInput: RegisterUserInput) {
    const user = this.userRepository.create(registerUserInput);
    return this.userRepository.save(user)
  }

  async deleteUser(id: number): Promise<any> {
    const user = this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException('account not found')
    }
    await this.userRepository.update(id, { active: 't' });
    return {
      message: "Deleted Success",
      user
    }
  }

  async getProfile(user: any): Promise<User> {
    const data = await this.userRepository.findOne({ where: { id: user } });
    return data;
  }

  async updateProfile(id: any, updateProfileInput: Partial<UpdateUserInput>): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new ForbiddenException('account not found');
    }
    if (updateProfileInput.password !== '') {
      updateProfileInput.password = await argon.hash(updateProfileInput.password);
    } else {
      updateProfileInput.password = user.password;
    }
    await this.userRepository.update(id, updateProfileInput);
    return {
      message: 'Updated Successfully',
      user
    }
  }

  async updateToken(access_token: string, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('account not found')
    }
    await this.userRepository.update(user.id, { access_token })
  }

  async logout(id: any) {
    const getUser = await this.userRepository.findOne({ where: { id } });
    if (!getUser) {
      throw new ForbiddenException();
    }
    await this.userRepository.update(id, { access_token: '' });
    return getUser;
  }
}
