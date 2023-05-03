import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from './quote.entity';
import { CreateQuoteDTO, UpdateQuoteDTO } from './quote.dto';

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

  async create(newQuote: CreateQuoteDTO): Promise<Quote> {
    const quote = await this.quotesRepository.create(newQuote);
    await this.quotesRepository.insert(quote);
    return quote[0];
  }

  async update(id: number, update: Partial<UpdateQuoteDTO>): Promise<Quote> {
    const quote = await this.quotesRepository.findOne({ where: { id } });
    if (quote) {
      if (update.audioUrl && update.audioUrl !== quote.audioUrl) {
        quote.audioUrl = update.audioUrl;
      }

      if (update.quote && update.quote !== quote.quote) {
        quote.quote = update.quote;
      }

      await this.quotesRepository.save(quote);

      return quote;
    } else return Promise.reject('Invalid id');
  }
}
