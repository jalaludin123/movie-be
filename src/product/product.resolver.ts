import { Resolver, Query, Args, Mutation, ResolveField, Parent, Context } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateSewaFilm } from './dto/create-sewa-film';
import { User } from 'src/user/entities/user.entity';
import { Movie } from 'src/movies/entities/movies.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/role.decorator';
import Role from 'src/common/data_enum/role/roles';
import { OutputResponseProduct } from './dto/output-response-product';
import { Filter } from 'src/common/dto/page';
import { OutputResponseFilter } from './dto/output-response-filter';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Query(() => [Product])
  async getproducts(): Promise<Product[]> {
    return await this.productService.getProducts()
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Query(() => OutputResponseFilter)
  async products(@Args('filter') alias: Filter) {
    const builder = await this.productService.products(alias);
    return builder;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @Query(() => [Product])
  async product(
    @Context() context
  ): Promise<Product[]> {
    return await this.productService.product(context.req.user['sub'])
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @Mutation(() => Product)
  createProduct(
    @Context() context,
    @Args('SewaFilm') createProduct: CreateSewaFilm
  ): Promise<Product> {
    return this.productService.createProduct(context.req.user, createProduct);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @Mutation(() => OutputResponseProduct)
  updateProduct(
    @Context() context,
    @Args('id') id: number,
    @Args('SewaFilm') updateProduct: CreateSewaFilm
  ): Promise<any> {
    return this.productService.updateProduct(context.req.user, id, updateProduct);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Query(() => OutputResponseProduct)
  async deleteProduct(@Args('id') id: number): Promise<any> {
    return await this.productService.deleteProduct(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Mutation(() => OutputResponseProduct)
  async accSewaFilm(@Args('id') id: number): Promise<any> {
    return await this.productService.accSewaMovie(id);
  }

  @ResolveField(() => User)
  async user(@Parent() product: Product): Promise<User> {
    return await this.productService.getUser(product.userId)
  }

  @ResolveField(() => Movie)
  async movie(@Parent() product: Product): Promise<Movie> {
    return await this.productService.getMovie(product.movieId)
  }
}
