import { ApiProperty } from '@nestjs/swagger';

export class AlunoResponseDto {

  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'David Ben' })
  nome: string;

  @ApiProperty({
    example: {
      portugues: { notas: [9, 8, 9, 9.5], media: 8.88 },
      matematica: { notas: [10, 8.9, 7.1, 9.8], media: 8.95 },
      historia: { notas: [7.1, 8.6, 8.8, 10], media: 8.63 },
      geografia: { notas: [8.2, 9.1, 9.9, 10], media: 9.3 },
      ingles: { notas: [9.3, 7.8, 9, 7.5], media: 8.4 }
    }
  })
  notas: {
    portugues: { notas: number[]; media: number };
    matematica: { notas: number[]; media: number };
    historia: { notas: number[]; media: number };
    geografia: { notas: number[]; media: number };
    ingles: { notas: number[]; media: number };
  };

  @ApiProperty({ 
    example: 'Aprovado com Sucesso! Passou em todas as matérias.' 
  })
  status: string;
}
