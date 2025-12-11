import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BoletimEscolarService } from './boletim_escolar.service';

// versão -> 2.0: Swagger decorators
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

// DTOs
import { CriarAlunoDto } from './dto/criar_aluno.dto';
import { AtualizarAlunoDto } from './dto/atualizar_aluno.dto';
import { AlunoResponseDto } from './dto/aluno_response.dto';

@ApiTags('Alunos')
@Controller('alunos')
export class BoletimEscolarController {

  constructor(
    private readonly boletimEscolarService: BoletimEscolarService
  ) {}

  // ----------------------- GET: LISTAR ALUNOS -----------------------
  @Get()
  @ApiOperation({ summary: 'Listar todos os alunos' })
  @ApiResponse({ status: 200, type: [AlunoResponseDto] })
  listarAlunos() {
    return this.boletimEscolarService.listarAlunos();
  }

  // BUSCA POR APROVADOS
  @Get('aprovados')
  @ApiOperation({ summary: 'Listar alunos aprovados' })
  @ApiResponse({ status: 200, type: [AlunoResponseDto] })
  listarAlunosAprovados() {
    return this.boletimEscolarService.listarAlunosAprovados();
  }

  // BUSCA POR RECUPERAÇÃO
  @Get('recuperacao')
  @ApiOperation({ summary: 'Listar alunos de recuperação' })
  @ApiResponse({ status: 200, type: [AlunoResponseDto] })
  listarAlunosRecuperacao() {
    return this.boletimEscolarService.listarAlunosRecuperacao();
  }

  // BUSCA POR REPROVADOS
  @Get('reprovados')
  @ApiOperation({ summary: 'Listar alunos reprovados' })
  @ApiResponse({ status: 200, type: [AlunoResponseDto] })
  listarAlunosReprovados() {
    return this.boletimEscolarService.listarAlunosReprovados();
  }

  // BUSCA PELO ID
  @Get('id/:id')
  @ApiOperation({ summary: 'Buscar aluno por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: AlunoResponseDto })
  @ApiResponse({ status: 404, description: 'Aluno não encontrado.' })
  buscarAlunoPorId(@Param('id') id: any) {
    return this.boletimEscolarService.buscarAlunoPorId(id);
  }

  // ----------------------- POST: CRIAR ALUNO -----------------------
  @Post()
  @ApiOperation({ summary: 'Criar um novo aluno' })
  @ApiResponse({ status: 201, type: AlunoResponseDto })
  criarAluno(@Body() body: CriarAlunoDto) {
    return this.boletimEscolarService.criarAluno(body.nome, body.notas);
  }

  // ----------------------- PUT: ATUALIZAR ALUNO -----------------------
  @Put('id/:id')
  @ApiOperation({ summary: 'Atualizar um aluno existente' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: AlunoResponseDto })
  atualizarAluno(
    @Param('id') id: any,
    @Body() body: AtualizarAlunoDto
  ) {
    return this.boletimEscolarService.atualizarAluno(id, body.nome, body.notas);
  }

  // ----------------------- DELETE: DELETAR ALUNO -----------------------
  @Delete('id/:id')
  @ApiOperation({ summary: 'Deletar aluno pelo ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Aluno deletado com sucesso.' })
  deletarAluno(@Param('id') id: any) {
    return this.boletimEscolarService.deletarAluno(id);
  }
}

