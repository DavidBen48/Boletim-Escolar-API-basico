import { ApiPropertyOptional } from '@nestjs/swagger';

export class AtualizarAlunoDto {
  @ApiPropertyOptional({ example: 'Novo Nome do Aluno' })
  nome?: string;

  @ApiPropertyOptional({
    example: {
      portugues: [9, 8, 6, 8.6],
      matematica: [6, 7.2, 9.8, 7],
      historia: [5.5, 9, 6, 5],
      geografia: [7.8, 6.7, 9, 6],
      ingles: [9, 8, 9, 9.8]
    }
  })
  notas?: {
    portugues?: number[];
    matematica?: number[];
    historia?: number[];
    geografia?: number[];
    ingles?: number[];
  };
}
