import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from 'src/product/entities/product.entity';
import Role from 'src/common/data_enum/role/roles';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, OneToMany } from 'typeorm';

@Entity()
@Unique(['email'])
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CUSTOMER,
  })
  @Field()
  role: Role;

  @Column({ default: 'y' })
  @Field()
  active: string;

  @Column({ length: 700 })
  @Field()
  access_token: string;

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

  @OneToMany(() => Product, product => product.user)
  @Field(() => [Product], { nullable: true })
  sewaFilm?: Product[];

}
