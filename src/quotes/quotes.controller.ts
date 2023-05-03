import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from './quote.entity';

@Controller('quotes')
@ApiTags('quotes')
export class QuotesController {
  constructor(
    @InjectRepository(Quote)
    private quotesRepository: Repository<Quote>,
  ) {}

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sort') sort: 'ASC' | 'DESC' = 'ASC',
  ): Promise<{ quotes: Quote[]; total: number; page: number; limit: number }> {
    const [quotes, total] = await this.quotesRepository.findAndCount({
      order: { quote: sort },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { quotes, total, page, limit };
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Quote> {
    return this.quotesRepository.findOne({ where: { id } });
  }
}
