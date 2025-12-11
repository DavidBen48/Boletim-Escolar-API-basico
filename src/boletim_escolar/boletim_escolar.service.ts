import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
// import alunosData from './alunos.json';

@Injectable()
export class BoletimEscolarService {
  // <-- puxando informações do arquivo JSON --> //
  private async carregarAlunos() {
    const alunosRaw = await this.lerArquivoAlunos();
  
    return alunosRaw.map((aluno) => ({
      ...aluno,
      media: this.gerarMedia(aluno.notas),
      status: this.statusDeAprovacao(this.gerarMedia(aluno.notas))
    }));
  }
  
  //<-- fim do puxando informações do arquivo JSON --> //

  // <-- funções para ler e escrever no arquivo JSON --> //
  private async lerArquivoAlunos(): Promise<{ id: number; nome: string; notas: number[] }[]> {
    const caminhoArquivo = join(__dirname, 'alunos.json');
    const conteudo = await fs.readFile(caminhoArquivo, 'utf-8');
    return JSON.parse(conteudo);
  }

  private async escreverArquivoAlunos(alunos: { id: number; nome: string; notas: number[] }[]): Promise<void> {
    const caminhoArquivo = join(__dirname, 'alunos.json');
    await fs.writeFile(caminhoArquivo, JSON.stringify(alunos, null, 2), 'utf-8');
  }
  // <-- fim das funções para ler e escrever no arquivo JSON --> //

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
  async listarAlunos() {
    return this.carregarAlunos();
  }

  async buscarAlunoPorId(id_recebido: any) {
    const id_aluno = parseInt(id_recebido, 10);
  
    if (isNaN(id_aluno)) {
      throw new BadRequestException('ID inválido. O parâmetro deve ser um número.');
    }

    const alunos = await this.carregarAlunos();
    const aluno_encontrado = alunos.find(aluno => aluno.id === id_aluno);
  
    if (!aluno_encontrado) {
      throw new NotFoundException('Aluno não encontrado.');
    }
  
    return aluno_encontrado;
  }

  async listarAlunosAprovados() {
    try {
      const alunos = await this.carregarAlunos();
      return alunos.filter(aluno => aluno.status === 'Aprovado');
    }
    catch (error) {
      throw new NotFoundException('endpoint 1 -> Alunos aprovados não encontrados.');
    }
  }

  async listarAlunosRecuperacao() {
    try {
      const alunos = await this.carregarAlunos();
      return alunos.filter(aluno => aluno.status === 'Recuperação');
    }
    catch (error) {
      throw new NotFoundException('endpoint 1 -> Alunos de recuperação não encontrados.');
    }
  }

  async listarAlunosReprovados() {
    try {
      const alunos = await this.carregarAlunos();
      return alunos.filter(aluno => aluno.status === 'Reprovado');
    }
    catch (error) {
      throw new NotFoundException('endpoint 1 -> Alunos reprovados não encontrados.');
    }
  }
  // <-- fim das funções usadas para o GET das rotas --> //

  // <-- funções usadas para POST, PUT e DELETE --> //
  // POST
  async criarAluno(nome: string, notas: number[]): Promise<any> {
    if (!nome || nome.trim() === '') {
      throw new BadRequestException('Nome é obrigatório.');
    }

    if (!notas || !Array.isArray(notas) || notas.length === 0) {
      throw new BadRequestException('Notas são obrigatórias e devem ser um array com pelo menos uma nota.');
    }

    if (notas.some(nota => typeof nota !== 'number' || nota < 0 || nota > 10)) {
      throw new BadRequestException('Todas as notas devem ser números entre 0 e 10.');
    }

    const alunos = await this.lerArquivoAlunos();
    const novoId = Math.max(...alunos.map(a => a.id), 0) + 1;

    const novoAluno = {
      id: novoId,
      nome: nome.trim(),
      notas: notas
    };

    alunos.push(novoAluno);
    await this.escreverArquivoAlunos(alunos);

    return {
      ...novoAluno,
      media: this.gerarMedia(novoAluno.notas),
      status: this.statusDeAprovacao(this.gerarMedia(novoAluno.notas))
    };
  }

  // PUT
  async atualizarAluno(id: number, nome?: string, notas?: number[]): Promise<any> {
    const id_aluno = parseInt(String(id), 10);

    if (isNaN(id_aluno)) {
      throw new BadRequestException('ID inválido. O parâmetro deve ser um número.');
    }

    const alunos = await this.lerArquivoAlunos();
    const indiceAluno = alunos.findIndex(aluno => aluno.id === id_aluno);

    if (indiceAluno === -1) {
      throw new NotFoundException('Aluno não encontrado.');
    }

    if (nome !== undefined) {
      if (!nome || nome.trim() === '') {
        throw new BadRequestException('Nome não pode ser vazio.');
      }
      alunos[indiceAluno].nome = nome.trim();
    }

    if (notas !== undefined) {
      if (!Array.isArray(notas) || notas.length === 0) {
        throw new BadRequestException('Notas devem ser um array com pelo menos uma nota.');
      }

      if (notas.some(nota => typeof nota !== 'number' || nota < 0 || nota > 10)) {
        throw new BadRequestException('Todas as notas devem ser números entre 0 e 10.');
      }

      alunos[indiceAluno].notas = notas;
    }

    await this.escreverArquivoAlunos(alunos);

    return {
      ...alunos[indiceAluno],
      media: this.gerarMedia(alunos[indiceAluno].notas),
      status: this.statusDeAprovacao(this.gerarMedia(alunos[indiceAluno].notas))
    };
  }

  // DELETE
  async deletarAluno(id: number): Promise<void> {
    const id_aluno = parseInt(String(id), 10);

    if (isNaN(id_aluno)) {
      throw new BadRequestException('ID inválido. O parâmetro deve ser um número.');
    }

    const alunos = await this.lerArquivoAlunos();
    const indiceAluno = alunos.findIndex(aluno => aluno.id === id_aluno);

    if (indiceAluno === -1) {
      throw new NotFoundException('Aluno não encontrado.');
    }

    alunos.splice(indiceAluno, 1);
    await this.escreverArquivoAlunos(alunos);
  }
  // <-- fim das funções usadas para POST, PUT e DELETE --> //
}