import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import alunosData from './alunos.json';

@Injectable()
export class BoletimEscolarService {
  // <-- puxando informações do arquivo JSON --> //
  private carregarAlunos() {
    const alunosRaw = alunosData as { id: number; nome: string; notas: number[] }[];
    
    return alunosRaw.map((aluno) => ({
      ...aluno,
      media: this.gerarMedia(aluno.notas),
      status: this.statusDeAprovacao(this.gerarMedia(aluno.notas))
    }));
  }
  //<-- fim do puxando informações do arquivo JSON --> //

  // <-- funcionamento das funções usadas para o GET das rotas --> //
  gerarMedia(notas: number[]): number {
    const soma = notas.reduce((acc, nota) => acc + nota, 0);

    if (soma > 40 || soma < 0) {
      throw new Error('A soma das notas não pode ser maior que 40 ou menor que 0. Corrija as notas e tente novamente.');
    }
    
    const media = soma / notas.length; 
    
    return parseFloat(media.toFixed(2));
  }

  statusDeAprovacao(media: number): string {
    switch (true) {
      case media >= 7:
        return 'Aprovado';
      case media >= 5:
        return 'Recuperação';
      case media < 5:
        return 'Reprovado';
      default:
        return 'Erro Desconhecido';
    }
  }
  //<-- fim do funcionamento das funções usadas para o GET das rotas --> //

  // <-- funções usadas para o GET das rotas --> //
  listarAlunos() {
    return this.carregarAlunos();
  }

  buscarAlunoPorId(id_recebido: any) {
    const id_aluno = parseInt(id_recebido, 10);
  
    if (isNaN(id_aluno)) {
      throw new BadRequestException('endpoint 1 -> ID inválido. O parâmetro deve ser um número.');
    }

    const alunos = this.carregarAlunos();
    const aluno_encontrado = alunos.find(aluno => aluno.id === id_aluno);
  
    if (!aluno_encontrado) {
      throw new NotFoundException('endpoint 2 -> Aluno não encontrado.');
    }
  
    return aluno_encontrado;
  }

  listarAlunosAprovados() {
    try {
      const alunos = this.carregarAlunos();
      return alunos.filter(aluno => aluno.status === 'Aprovado');
    }
    catch (error) {
      throw new NotFoundException('endpoint 1 -> Alunos aprovados não encontrados.');
    }
  }

  listarAlunosRecuperacao() {
    try {
      const alunos = this.carregarAlunos();
      return alunos.filter(aluno => aluno.status === 'Recuperação');
    }
    catch (error) {
      throw new NotFoundException('endpoint 1 -> Alunos de recuperação não encontrados.');
    }
  }

  listarAlunosReprovados() {
    try {
      const alunos = this.carregarAlunos();
      return alunos.filter(aluno => aluno.status === 'Reprovado');
    }
    catch (error) {
      throw new NotFoundException('endpoint 1 -> Alunos reprovados não encontrados.');
    }
  }
  // <-- fim das funções usadas para o GET das rotas --> //

}
