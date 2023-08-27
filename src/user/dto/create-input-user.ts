import { InputType, Field } from '@nestjs/graphql';
import Role from 'src/data_enum/role/roles';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  role: Role;
}
