import { ApiProperty } from '@nestjs/swagger';

export class UpdateTagDto {
  @ApiProperty({
    description: 'Uniq tag name',
    example: 'js'
  })
  public title: string;
}