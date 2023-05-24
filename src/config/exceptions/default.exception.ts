import { ApiProperty } from '@nestjs/swagger';

export class DefaultException {
  @ApiProperty({
    description: 'HTTP Status Code',
  })
  readonly statusCode: number;

  @ApiProperty({
    description: 'successful or not',
  })
  readonly success: boolean;

  @ApiProperty({
    description: 'actual message',
  })
  readonly mesage: string;

  @ApiProperty({
    description: 'Error text description',
  })
  readonly error: string;

  @ApiProperty({
    description: 'Endpoint that caused the error',
  })
  readonly path: string;

  @ApiProperty({
    description: 'Endpoint type',
  })
  readonly method: string;

  @ApiProperty({
    description: 'TimeStamp when the error occurred.',
  })
  readonly timeStamp: string;
}