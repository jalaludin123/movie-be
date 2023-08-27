import { InputType, Field, Int } from '@nestjs/graphql';
import StatusPemesanan from 'src/data_enum/pemesanan/status-pemesanan';

@InputType()
export class CreateSewaFilm {
  @Field(type => Int)
  movieId: number;

  @Field(type => Int)
  jumlahPesan: number;

}
