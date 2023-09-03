import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';

@ObjectType()
export class OutputResponseFilter {
  @Field(() => [Product])
  data: Product;

  @Field()
  total: number;

  @Field()
  page: number;

  @Field({ nullable: true })
  last_page: number;
}
