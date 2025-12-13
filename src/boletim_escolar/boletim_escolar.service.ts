import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

interface NotasDisciplinas {
  portugues: number[];
  matematica: number[];
  historia: number[];
  geografia: number[];
  ingles: number[];
}

interface AlunoRaw {
  id: number;
  nome: string;
  notas: NotasDisciplinas;
}

export interface NotasComMedia {
  portugues: { notas: number[]; media: number };
  matematica: { notas: number[]; media: number };
  historia: { notas: number[]; media: number };
  geografia: { notas: number[]; media: number };
  ingles: { notas: number[]; media: number };
}

export interface AlunoCompleto {
  id: number;
  nome: string;
  notas: NotasComMedia;
  status: string;
}

@Injectable()
export class BoletimEscolarService {

  // <-- puxando informações do arquivo JSON --> //
  private async carregarAlunos(): Promise<AlunoCompleto[]> {
    const alunosRaw = await this.lerArquivoAlunos();

    return alunosRaw.map(aluno => {
      const notasComMedia = this.calcularMediasPorDisciplina(aluno.notas);
      const status = this.calcularStatusCompleto(notasComMedia);

      return {
        ...aluno,
        notas: notasComMedia,
        status
      };
    });
  }
  //<-- fim do puxando informações do arquivo JSON --> //

// <-- funções para ler e escrever no arquivo JSON --> //
private getCaminhoArquivo(): string {
  return join(
    process.cwd(),
    'src',
    'boletim_escolar',
    'alunos.json'
  );
}

private async lerArquivoAlunos(): Promise<AlunoRaw[]> {
  const caminhoArquivo = this.getCaminhoArquivo();
  const conteudo = await fs.readFile(caminhoArquivo, 'utf-8');
  return JSON.parse(conteudo);
}

private async escreverArquivoAlunos(alunos: AlunoRaw[]): Promise<void> {
  const caminhoArquivo = this.getCaminhoArquivo();
  await fs.writeFile(caminhoArquivo, JSON.stringify(alunos, null, 2), 'utf-8');
}
// <-- fim das funções para ler e escrever no arquivo JSON --> //

// <-- funções de lógica -->
calcularMedia(notas: number[]): number {
  if (!notas || notas.length === 0) {
    return 0;
  }

  const soma = notas.reduce((acc, nota) => acc + nota, 0);
  return parseFloat((soma / notas.length).toFixed(2));
}

calcularMediasPorDisciplina(notas: NotasDisciplinas): NotasComMedia {
  return {
    portugues: { notas: notas.portugues, media: this.calcularMedia(notas.portugues) },
    matematica: { notas: notas.matematica, media: this.calcularMedia(notas.matematica) },
    historia: { notas: notas.historia, media: this.calcularMedia(notas.historia) },
    geografia: { notas: notas.geografia, media: this.calcularMedia(notas.geografia) },
    ingles: { notas: notas.ingles, media: this.calcularMedia(notas.ingles) }
  };
}

calcularStatusCompleto(notasComMedia: NotasComMedia): string {
  const disciplinas = ['portugues', 'matematica', 'historia', 'geografia', 'ingles'] as const;

  const disciplinasAprovadas: string[] = [];
  const disciplinasRecuperacao: string[] = [];
  const disciplinasReprovadas: string[] = [];

  disciplinas.forEach(disciplina => {
    const media = notasComMedia[disciplina].media;
    const nome = this.formatarNomeDisciplina(disciplina);

    if (media >= 7) {
      disciplinasAprovadas.push(nome);
    } else if (media >= 5) {
      disciplinasRecuperacao.push(nome);
    } else {
      disciplinasReprovadas.push(nome);
    }
  });

  // Regra fechada e determinística
  if (disciplinasReprovadas.length > 0) {
    return `Reprovado! Repetirá de Ano! Reprovou nas seguintes matérias: ${disciplinasReprovadas.join(', ')}`;
  
  } else if (disciplinasAprovadas.length === 5 && disciplinasRecuperacao.length === 0) {
    return 'Aprovado com Sucesso! Passou em todas as matérias.';
  
  } else if (disciplinasRecuperacao.length > 3) {
    return `Recuperação! Está de recuperação nas seguintes matérias: ${disciplinasRecuperacao.join(', ')}`;
  
  } else if (disciplinasRecuperacao.length >= 1 && disciplinasRecuperacao.length <= 3) {
    return `Passou, mas estará em dependência nas seguintes matérias: ${disciplinasRecuperacao.join(', ')}`;
  }
  // Caso todas as condições acima falhem, retorna uma mensagem genérica
  return 'Status indeterminado.';
}

private formatarNomeDisciplina(disciplina: string): string {
  const nomes: Record<string, string> = {
    portugues: 'Português',
    matematica: 'Matemática',
    historia: 'História',
    geografia: 'Geografia',
    ingles: 'Inglês'
  };

  return nomes[disciplina] || disciplina;
}

statusDeAprovacao(media: number): string {
  if (media >= 7) return 'Aprovado';
  if (media >= 5) return 'Recuperação';
  return 'Reprovado';
}
//<-- fim das funções lógicas --> //

// <-- funções usadas para o GET das rotas --> //
async listarAlunos() {
  return this.carregarAlunos();
}

async buscarAlunoPorId(id_recebido: any) {
  const id = parseInt(id_recebido, 10);
  if (isNaN(id)) {
    throw new BadRequestException('ID inválido. O parâmetro deve ser um número.');
  }

  const alunos = await this.carregarAlunos();
  const aluno = alunos.find(a => a.id === id);

  if (!aluno) {
    throw new NotFoundException('Aluno não encontrado.');
  }

  return aluno;
}

async listarAlunosAprovados() {
  const alunos = await this.carregarAlunos();
  return alunos.filter(a => a.status.includes('Aprovado com Sucesso'));
}

async listarAlunosDependentes() {
  const alunos = await this.carregarAlunos();
  return alunos.filter(a => a.status.includes('dependência'));
}

async listarAlunosRecuperacao() {
  const alunos = await this.carregarAlunos();
  return alunos.filter(a => a.status.includes('Recuperação!'));
}

async listarAlunosReprovados() {
  const alunos = await this.carregarAlunos();
  return alunos.filter(a => a.status.includes('Reprovado!'));
}
// <-- fim das funções usadas para o GET das rotas --> //

// <-- funções usadas para POST, PUT e DELETE --> //
// POST
async criarAluno(nome: string, notas: NotasDisciplinas): Promise<any> {
  if (!nome || nome.trim() === '') {
    throw new BadRequestException('Nome é obrigatório.');
  }

  this.validarNotas(notas);

  const alunos = await this.lerArquivoAlunos();
  const novoId = Math.max(...alunos.map(a => a.id), 0) + 1;

  const novoAluno: AlunoRaw = {
    id: novoId,
    nome: nome.trim(),
    notas
  };

  alunos.push(novoAluno);
  await this.escreverArquivoAlunos(alunos);

  const notasComMedia = this.calcularMediasPorDisciplina(notas);
  const status = this.calcularStatusCompleto(notasComMedia);

  return { ...novoAluno, notas: notasComMedia, status };
}

// PUT
async atualizarAluno(id: number, nome?: string, notas?: Partial<NotasDisciplinas>): Promise<any> {
  const idAluno = parseInt(String(id), 10);
  if (isNaN(idAluno)) {
    throw new BadRequestException('ID inválido.');
  }

  const alunos = await this.lerArquivoAlunos();
  const index = alunos.findIndex(a => a.id === idAluno);

  if (index === -1) {
    throw new NotFoundException('Aluno não encontrado.');
  }

  if (nome !== undefined) {
    if (!nome.trim()) throw new BadRequestException('Nome não pode ser vazio.');
    alunos[index].nome = nome.trim();
  }

  if (notas) {
    this.validarNotas({ ...alunos[index].notas, ...notas });
    alunos[index].notas = { ...alunos[index].notas, ...notas };
  }

  await this.escreverArquivoAlunos(alunos);

  const notasComMedia = this.calcularMediasPorDisciplina(alunos[index].notas);
  const status = this.calcularStatusCompleto(notasComMedia);

  return { ...alunos[index], notas: notasComMedia, status };
}

// DELETE
async deletarAluno(id: number): Promise<void> {
  const idAluno = parseInt(String(id), 10);
  if (isNaN(idAluno)) {
    throw new BadRequestException('ID inválido.');
  }

  const alunos = await this.lerArquivoAlunos();
  const index = alunos.findIndex(a => a.id === idAluno);

  if (index === -1) {
    throw new NotFoundException('Aluno não encontrado.');
  }

  alunos.splice(index, 1);
  await this.escreverArquivoAlunos(alunos);
}
// <-- fim das funções usadas para POST, PUT e DELETE --> //

// <-- validação reutilizável -->
private validarNotas(notas: NotasDisciplinas) {
  const disciplinas = ['portugues', 'matematica', 'historia', 'geografia', 'ingles'] as const;

  disciplinas.forEach(d => {
    const arr = notas[d];
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new BadRequestException(`Notas de ${d} são obrigatórias.`);
    }
    if (arr.some(n => typeof n !== 'number' || n < 0 || n > 10)) {
      throw new BadRequestException(`Notas de ${d} devem ser entre 0 e 10.`);
    }
  });
}
}
