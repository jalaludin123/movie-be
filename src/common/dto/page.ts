import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class Filter {
  @Field({ nullable: true })
  filter: string;

  @Field({ nullable: true })
  next: string;

}