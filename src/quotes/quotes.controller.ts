import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from './quote.entity';
import { QuotesService } from './quotes.services';

@Controller('quotes')
@ApiTags('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}
  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sort') sort: 'ASC' | 'DESC' = 'ASC',
  ) {
    return this.quotesService.findAll(page, limit, sort);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.quotesService.findOne(id);
  }
}
