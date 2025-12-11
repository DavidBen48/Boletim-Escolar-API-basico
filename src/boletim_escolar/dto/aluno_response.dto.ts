import { ApiProperty } from '@nestjs/swagger';

export class AlunoResponseDto {

  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'David' })
  nome: string;

  @ApiProperty({ example: [8, 7.5, 9, 6] })
  notas: number[];

  @ApiProperty({ example: 8.75 })
  media: number;

  @ApiProperty({ example: 'Aprovado' })
  status: string;
}
