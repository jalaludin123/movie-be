import { Field, ObjectType } from '@nestjs/graphql';
import { Movie } from '../entities/movies.entity';

@ObjectType()
export class OutputResponse {
  @Field()
  message: string;

  @Field(() => Movie)
  movie: Movie;
}
