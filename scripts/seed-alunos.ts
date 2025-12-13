import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const caminho = join(
  __dirname,
  '..',
  'src',
  'boletim_escolar',
  'alunos.json'
);

const alunos = JSON.parse(readFileSync(caminho, 'utf-8'));

const disciplinas = ['portugues', 'matematica', 'historia', 'geografia', 'ingles'];

function gerarNotas(media: number): number[] {
    return Array.from({ length: 4 }, () => {
    const variacao = Math.random() * 2 - 1; // -1 a +1
    return Math.min(10, Math.max(0, +(media + variacao).toFixed(1)));
  });
}

function aplicarStatus(
    aluno: any,
    tipo: 'aprovado' | 'dependencia' | 'recuperacao' | 'reprovado'
) {
  const materias = [...disciplinas].sort(() => Math.random() - 0.5);

  let qtdRec = 0;
  let qtdRep = 0;

  if (tipo === 'dependencia') qtdRec = Math.floor(Math.random() * 2) + 1;
  if (tipo === 'recuperacao') qtdRec = Math.floor(Math.random() * 2) + 3;
  if (tipo === 'reprovado') qtdRep = Math.floor(Math.random() * 3) + 1;
  
  materias.forEach((disciplina, index) => {
    if (qtdRep > 0 && index < qtdRep) {
      aluno.notas[disciplina] = gerarNotas(3.5);
    } else if (qtdRec > 0 && index < qtdRec + qtdRep) {
      aluno.notas[disciplina] = gerarNotas(6);
    } else {
        aluno.notas[disciplina] = gerarNotas(8);
    }
});
}

// mantém os 2 primeiros alunos intactos
const alunosEditaveis = alunos.slice(2);
alunosEditaveis.sort(() => Math.random() - 0.5);

const distribuicao = [
  ...Array(58).fill('aprovado'),
  ...Array(8).fill('dependencia'),
  ...Array(12).fill('recuperacao'),
  ...Array(20).fill('reprovado')
];

alunosEditaveis.forEach((aluno, index) => {
  aplicarStatus(aluno, distribuicao[index]);
});

let json = JSON.stringify(alunos, null, 2);

// compacta arrays numéricos para uma linha
json = json.replace(
  /\[\s*([0-9.,\s-]+)\s*\]/g,
  (match) => match.replace(/\s+/g, ' ')
);

writeFileSync(caminho, json, 'utf-8');


console.log('✅ Seed executada com sucesso!');
console.log('Aprovados: 58 | Dependência: 8 | Recuperação: 12 | Reprovados: 20');

