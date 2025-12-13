import { ApiProperty } from '@nestjs/swagger';

export class CriarAlunoDto {
  @ApiProperty({ example: 'David Ben' })
  nome: string;

  @ApiProperty({
    example: {
      portugues: [9, 8, 9, 9.5],
      matematica: [10, 8.9, 7.1, 9.8],
      historia: [7.1, 8.6, 8.8, 10],
      geografia: [8.2, 9.1, 9.9, 10],
      ingles: [9.3, 7.8, 9, 7.5]
    }
  })
  notas: {
    portugues: number[];
    matematica: number[];
    historia: number[];
    geografia: number[];
    ingles: number[];
  };
}
