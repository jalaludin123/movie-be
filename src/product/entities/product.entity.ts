import { Entity, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { User } from "src/user/entities/user.entity";
import { Movie } from "src/movies/entities/movies.entity";
import StatusPemesanan from "src/common/data_enum/pemesanan/status-pemesanan";

@Entity()
@ObjectType()
export class Product {

  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field(type => Int)
  userId: number;

  @ManyToOne(() => User, (user) => user.sewaFilm)
  @Field(type => User)
  user: User;

  @Column()
  @Field(type => Int)
  movieId: number;

  @ManyToOne(() => Movie, (movie) => movie.film)
  @Field(type => Movie)
  movie: Movie;

  @Column({
    type: 'enum',
    enum: StatusPemesanan,
    default: StatusPemesanan.RENT
  })
  @Field()
  status_pemesanan: StatusPemesanan;

  @Column()
  @Field()
  total: number;

  @Column({ length: 1, default: 'y' })
  @Field()
  status: string;

  @Column()
  @Field()
  pembayaran: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Field()
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @Field()
  updatedAt!: Date;

}