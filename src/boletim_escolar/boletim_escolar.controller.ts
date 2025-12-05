import { Controller, Get, Param } from '@nestjs/common';
import { BoletimEscolarService } from './boletim_escolar.service';

@Controller('alunos')
export class BoletimEscolarController {

  constructor(
    private readonly boletimEscolarService: BoletimEscolarService
  ) {}

  @Get('geral') 
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

}