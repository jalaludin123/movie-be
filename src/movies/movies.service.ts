import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movies.entity';
import { CreateMovieInput } from './dto/create-input-movie';
import { Filter } from 'src/common/dto/page';

@Injectable()
export class MoviesService {
  constructor(@InjectRepository(Movie) private movieRepository: Repository<Movie>) { }

  async getMovies(): Promise<Movie[]> {
    const movies = await this.movieRepository.find({ where: { active: 'y' } });
    return movies;
  }

  async movies(alias: Filter) {
    const builder = this.movieRepository.createQueryBuilder('movie');
    builder.where('movie.active = :active', { active: 'y' })
    if (alias.filter) {
      builder.where("movie.nameMovie LIKE :s", { s: `%${alias.filter}%` })
    }
    const page: number = parseInt(alias.next as any) || 1;
    const perPage = 9;
    const total = await builder.getCount();
    builder.offset((page - 1) * perPage).limit(perPage);
    return {
      data: await builder.getMany(),
      total,
      page,
      last_page: Math.ceil(total / perPage)
    };

  }

  async movie(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    return movie;
  }

  async createMovie(createMovieInput: CreateMovieInput): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { nameMovie: createMovieInput.nameMovie } });
    if (movie) {
      throw new UnauthorizedException('Movie Sudah Ada')
    }
    const newMovie = this.movieRepository.create(createMovieInput);
    return this.movieRepository.save(newMovie);
  }

  async updateMovie(id: number, updateMovieInput: Partial<CreateMovieInput>): Promise<any> {
    const movie = this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new UnauthorizedException('Movie Tidak Ada')
    }
    await this.movieRepository.update(id, updateMovieInput);
    return {
      message: 'Updated Success',
      movie
    };
  }

  async deleteMovie(id: number): Promise<any> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new UnauthorizedException('Movie Tidak Ada')
    }
    await this.movieRepository.update(id, { active: 't' });
    return {
      message: 'Deleted Success',
      movie
    };
  }
}
