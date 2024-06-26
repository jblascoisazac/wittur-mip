import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return await this.productsRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOneBy({ id });

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto
  ): Promise<Product> {
    const product = await this.findOne(id);
    const updatedProduct = this.productsRepository.merge(
      product,
      updateProductDto
    );

    return await this.productsRepository.save(updatedProduct);
  }

  async remove(id: number) {
    const result = await this.productsRepository.delete(id);

    if (result.affected > 0) return;

    throw new NotFoundException(`Product with id ${id} not found`);
  }
}
