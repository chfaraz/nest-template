import { ApiProperty } from '@nestjs/swagger';

export class CommonPaginationQueryRequestDto {
  @ApiProperty({
    description: 'Default limit is 10.',
    required: false,
  })
  readonly limit: number;

  @ApiProperty({
    description: 'Default offset is 0',
    required: false,
  })
  readonly offset: number;

  @ApiProperty({
    description: 'Search ',
    required: false,
  })
  readonly search: string;

}