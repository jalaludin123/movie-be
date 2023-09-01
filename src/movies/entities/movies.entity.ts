import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, OneToMany } from 'typeorm';

@Entity()
@Unique(['nameMovie'])
@ObjectType()
export class Movie {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  nameMovie: string;

  @Column()
  @Field()
  hargaMovie: string;

  @Column()
  @Field()
  description: string;

  @Column({ default: 'y' })
  @Field()
  active: string;

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

  @OneToMany(() => Product, product => product.movie)
  @Field(() => [Product], { nullable: true })
  film?: Product[];
}
