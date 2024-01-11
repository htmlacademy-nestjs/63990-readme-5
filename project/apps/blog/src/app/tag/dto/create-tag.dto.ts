import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({
    description: 'Uniq tag name',
    example: 'js'
  })
  public title: string;
}