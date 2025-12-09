import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BoletimEscolarService } from './boletim_escolar.service';

@Controller('alunos')
export class BoletimEscolarController {

  constructor(
    private readonly boletimEscolarService: BoletimEscolarService
  ) {}

  @Get() 
  listarAlunos() {
    return this.boletimEscolarService.listarAlunos();
  }

  @Get('aprovados')
    listarAlunosAprovados() {
      return this.boletimEscolarService.listarAlunosAprovados();
  }

  @Get('recuperacao')
    listarAlunosRecuperacao() {
      return this.boletimEscolarService.listarAlunosRecuperacao();
    }

  @Get('reprovados')
    listarAlunosReprovados() {
      return this.boletimEscolarService.listarAlunosReprovados();
    }

  @Get('id/:id')
  buscarAlunoPorId(@Param('id') id: any) {
    return this.boletimEscolarService.buscarAlunoPorId(id);
  }

  @Post()
  async criarAluno(@Body() body: { nome: string; notas: number[] }) {
    return this.boletimEscolarService.criarAluno(body.nome, body.notas);
  }

  @Put('id/:id')
  async atualizarAluno(@Param('id') id: any, @Body() body: { nome?: string; notas?: number[] }) {
    return this.boletimEscolarService.atualizarAluno(id, body.nome, body.notas);
  }

  @Delete('id/:id')
  async deletarAluno(@Param('id') id: any) {
    await this.boletimEscolarService.deletarAluno(id);
    return { message: 'Aluno deletado com sucesso.' };
  }

}