import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movies.entity';
import { CreateMovieInput } from './dto/create-input-movie';

@Injectable()
export class MoviesService {
  constructor(@InjectRepository(Movie) private movieRepository: Repository<Movie>) { }

  async movies(): Promise<Movie[]> {
    const movies = await this.movieRepository.find({ where: { active: 'y' } });
    return movies;
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
