import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMovieInput {
  @Field()
  nameMovie: string;

  @Field()
  hargaMovie: string;

  @Field()
  description: string;

}
