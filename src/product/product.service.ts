import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateSewaFilm } from './dto/create-sewa-film';
import { UserService } from 'src/user/user.service';
import { MoviesService } from 'src/movies/movies.service';
import { User } from 'src/user/entities/user.entity';
import { Movie } from 'src/movies/entities/movies.entity';
import StatusPemesanan from 'src/common/data_enum/pemesanan/status-pemesanan';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product)
  private productRepository: Repository<Product>,
    private userService: UserService,
    private movieService: MoviesService
  ) { }

  async Products(): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: {
        status: 'y'
      }
    })
    return products;
  }

  async product(id: number): Promise<Product[]> {
    const product = await this.productRepository.find({ where: { userId: id } })
    if (!product) {
      throw new ForbiddenException('Tidak data product')
    }
    return product;
  }

  async createProduct(user: any, createProductInput: CreateSewaFilm): Promise<Product> {
    const harga = await this.movieService.movie(createProductInput.movieId);
    const subTotal = parseInt(harga.hargaMovie) * parseInt(createProductInput.batas_waktu);
    const product = this.productRepository.create({
      userId: user.sub,
      movieId: createProductInput.movieId,
      harga: harga.hargaMovie,
      total: subTotal,
      batas_waktu: createProductInput.batas_waktu,
      status_pembayaran: createProductInput.status_pembayaran
    });
    const data = this.productRepository.save(product);
    return data;
  }

  async updateProduct(user: any, id: number, updateProductInput: Partial<CreateSewaFilm>): Promise<any> {
    const product = await this.productRepository.findOne({
      where: {
        id,
        userId: user.sub,
        status_pemesanan: StatusPemesanan.RENT
      }
    });
    if (!product) {
      throw new ForbiddenException('Tidak data product')
    }
    const harga = await this.movieService.movie(updateProductInput.movieId);
    const subTotal = parseInt(harga.hargaMovie) * parseInt(updateProductInput.batas_waktu);
    await this.productRepository.update(id, {
      movieId: updateProductInput.movieId,
      harga: harga.hargaMovie,
      total: subTotal,
      batas_waktu: updateProductInput.batas_waktu,
      status_pembayaran: updateProductInput.status_pembayaran
    });
    return {
      message: "updated success",
      product
    };
  }

  async accSewaMovie(id: number): Promise<any> {
    const product = await this.productRepository.findOne({
      where: {
        id,
        status_pemesanan: StatusPemesanan.RENT,
      }
    });
    if (!product) {
      throw new ForbiddenException('product not found');
    }
    await this.productRepository.update(id, {
      status_pemesanan: StatusPemesanan.RETURN
    });
    return {
      message: "Success Movie sudah di kembalikan",
      product
    }
  }

  async deleteProduct(id: number): Promise<any> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new ForbiddenException('not found this product');
    }
    await this.productRepository.update(id, { status: 't' })
    return {
      message: "Deleted Success",
      product
    };
  }

  async getUser(id: any): Promise<User> {
    const user = await this.userService.getProfile(id);
    return user;
  }

  async getMovie(id: number): Promise<Movie> {
    const movie = await this.movieService.movie(id);
    return movie;
  }
}
