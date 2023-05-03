import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from './quote.entity';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private quotesRepository: Repository<Quote>,
  ) {}

  async findAll(
    page,
    limit,
    sort,
  ): Promise<{ quotes: Quote[]; total: number; page: number; limit: number }> {
    const [quotes, total] = await this.quotesRepository.findAndCount({
      order: { quote: sort },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { quotes, total, page, limit };
  }

  async findOne(id: number): Promise<Quote> {
    return this.quotesRepository.findOne({ where: { id } });
  }
}
