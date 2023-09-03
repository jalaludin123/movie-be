import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class OutputResponseFilterUser {
  @Field(() => [User])
  data: User;

  @Field()
  total: number;

  @Field()
  page: number;

  @Field({ nullable: true })
  last_page: number;
}
