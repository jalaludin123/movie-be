import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MoviesModule } from './movies/movies.module';
import { ProductModule } from './product/product.module';
import TypeOrmMysql from './config/typeOrm.config';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql')
  }), ConfigModule.forRoot({
    isGlobal: true
  }), TypeOrmModule.forRoot(TypeOrmMysql), AuthModule, UserModule, MoviesModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
