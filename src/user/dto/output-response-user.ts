import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class OutputResponseUser {
  @Field()
  message: string;

  @Field(() => User)
  user: User;
}
