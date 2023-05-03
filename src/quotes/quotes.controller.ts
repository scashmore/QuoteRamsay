import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from './quote.entity';
import { QuotesService } from './quotes.services';
import { CreateQuoteDTO, UpdateQuoteDTO } from './quote.dto';

@Controller('quotes')
@ApiTags('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @ApiOkResponse({
    description: '',
  })
  @Post()
  create(@Body() quote: CreateQuoteDTO) {
    return this.quotesService.create(quote);
  }

  @ApiOkResponse({
    description: '',
  })
  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sort') sort: 'ASC' | 'DESC' = 'ASC',
  ) {
    return this.quotesService.findAll(page, limit, sort);
  }

  @ApiOkResponse({
    description: '',
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.quotesService.findOne(id);
  }

  @ApiOkResponse({
    description: '',
  })
  @ApiBody({ type: UpdateQuoteDTO })
  @Patch(':id')
  update(@Param('id') id: number, @Body() quote: Partial<UpdateQuoteDTO>) {
    return this.quotesService.update(id, quote);
  }
}
