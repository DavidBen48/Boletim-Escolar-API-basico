import { ApiPropertyOptional } from '@nestjs/swagger';

export class AtualizarAlunoDto {
  @ApiPropertyOptional({ example: 'Novo Nome do Aluno' })
  nome?: string;

  @ApiPropertyOptional({ example: [9, 7.5, 9, 6] })
  notas?: number[];
}
