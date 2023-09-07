import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import Payment from 'src/common/data_enum/payment/payment';

@InputType()
export class CreateSewaFilm {

  @IsNotEmpty()
  @Field(type => Int)
  movieId: number;

  @IsNotEmpty()
  @Field()
  pembayaran: Payment;

}
