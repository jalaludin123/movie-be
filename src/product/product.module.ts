import { Module } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from "@nestjs/typeorm"
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { UserModule } from 'src/user/user.module';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), UserModule, MoviesModule],
  providers: [ProductService, ProductResolver]
})
export class ProductModule { }
