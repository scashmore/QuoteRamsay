import { ApiProperty } from '@nestjs/swagger';

export class CreateQuoteDTO {
  @ApiProperty({
    example: "It's raw!",
  })
  quote: string;

  @ApiProperty({
    example: 'someurl',
  })
  audioUrl: string;
}

export class UpdateQuoteDTO {
  @ApiProperty({
    example: "It's raw!",
  })
  quote?: string;

  @ApiProperty({
    example: 'someurl',
  })
  audioUrl?: string;
}
