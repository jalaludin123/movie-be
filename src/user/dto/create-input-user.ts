import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import Role from 'src/common/data_enum/role/roles';

@InputType()
export class CreateUserInput {

  @IsNotEmpty()
  @Field()
  email: string;

  @IsNotEmpty()
  @Field()
  name: string;

  @IsNotEmpty()
  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  role: Role;
}
