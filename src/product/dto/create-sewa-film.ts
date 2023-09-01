import { InputType, Field, Int } from '@nestjs/graphql';
import Payment from 'src/common/data_enum/payment/payment';

@InputType()
export class CreateSewaFilm {
  @Field(type => Int)
  movieId: number;

  @Field({ nullable: true, defaultValue: '1 JAM' })
  batas_waktu: string;

  @Field()
  status_pembayaran: Payment;

}
