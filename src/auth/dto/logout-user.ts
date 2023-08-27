import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LogOutUser {
  @Field()
  Message: string;
}