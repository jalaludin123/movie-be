import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateMovieInput {

  @IsNotEmpty()
  @Field()
  nameMovie: string;

  @IsNotEmpty()
  @Field()
  hargaMovie: string;

  @Field()
  description: string;

}
