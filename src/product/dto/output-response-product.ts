import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';

@ObjectType()
export class OutputResponseProduct {
  @Field()
  message: string;

  @Field(() => Product)
  product: Product;
}
