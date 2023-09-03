import { Field, ObjectType } from '@nestjs/graphql';
import { Movie } from '../entities/movies.entity';

@ObjectType()
export class OutputResponseMovie {
  @Field(() => [Movie])
  data: Movie;

  @Field()
  total: number;

  @Field()
  page: number;

  @Field({ nullable: true })
  last_page: number;
}
