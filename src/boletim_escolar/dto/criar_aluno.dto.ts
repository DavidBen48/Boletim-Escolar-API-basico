import { ApiProperty } from '@nestjs/swagger';

export class CriarAlunoDto {
  @ApiProperty({ example: 'David Ben' })
  nome: string;

  @ApiProperty({ example: [8, 7.5, 9, 6] })
  notas: number[];
}
