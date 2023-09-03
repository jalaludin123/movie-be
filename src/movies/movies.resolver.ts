import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movies.entity';
import { CreateMovieInput } from './dto/create-input-movie';
import { OutputResponse } from './dto/output-response';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import Role from 'src/common/data_enum/role/roles';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Filter } from 'src/common/dto/page';
import { OutputResponseMovie } from './dto/output-response-movie';

@Resolver()
export class MoviesResolver {
  constructor(private movieService: MoviesService) { }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Movie])
  async getMovies(): Promise<Movie[]> {
    return this.movieService.getMovies()
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => OutputResponseMovie)
  async movies(@Args('filter') alias: Filter) {
    const builder = await this.movieService.movies(alias);
    return builder;
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Movie)
  async movie(@Args('id') id: number): Promise<Movie> {
    return this.movieService.movie(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Mutation(() => Movie)
  createMovie(@Args('createMovie') createMovie: CreateMovieInput): Promise<Movie> {
    return this.movieService.createMovie(createMovie);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Mutation(() => OutputResponse)
  async updateMovie(
    @Args('id') id: number,
    @Args('updateMovie') updateMovie: CreateMovieInput
  ): Promise<any> {
    return await this.movieService.updateMovie(id, updateMovie);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Mutation(() => OutputResponse)
  async deleteMovie(@Args('id') id: number): Promise<any> {
    return await this.movieService.deleteMovie(id);
  }
}
